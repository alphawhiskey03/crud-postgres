const db = require("../../db");

module.exports.getAllOrders = async (_, res) => {
  try {
    const { rows } = await db.query(
      "SELECT orders.* ,COUNT(orderproductmap.id) AS productCount FROM orders JOIN orderproductmap ON orders.id=orderproductmap.orderid GROUP BY orders.id ORDER BY orders.id"
    );
    res.status(200).json({ message: "fetched orders", resultData: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wen't wrong" });
  }
};
module.exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await db.query(
      "select orders.orderdescription, array(select orderproductmap.productid from orderproductmap join orders on orderproductmap.orderid =orders.id where orderproductmap.orderid=$1) as orderedProducts from orders where orders.id=$1",
      [id]
    );
    if (rows.length == 0) {
      res.status(404).json({ message: "No orders with the given id found!" });
      return;
    }
    const row = rows[0];

    const orderedproducts = row.orderedproducts.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    res.status(200).json({
      message: "fetched order successfully!",
      resultData: { ...row, orderedproducts },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something wen't wrong" });
  }
};
module.exports.saveOrder = async (req, res) => {
  try {
    const { orderdescription, orderedproducts } = req.body;
    const { rows } = await db.query(
      `INSERT INTO orders(orderdescription) VALUES($1) RETURNING *;`,
      [orderdescription]
    );
    const orderId = rows[0].id;
    let query = "INSERT INTO orderproductmap(orderid,productid) VALUES";
    let temp = Object.entries(orderedproducts);

    temp.forEach(([key, value], i) => {
      if (value) {
        query += `${i === 0 ? "" : ","}(${orderId},${key})`;
      }
    });
    await db.query(query, []);
    res.json({ message: "Order saved successfully!", resultData: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something wen't wrong" });
  }
};
module.exports.updateOrder = async (req, res) => {
  try {
    const { orderedproducts, orderdescription, orderId } = req.body;
    const { rows: updatedOrder } = await db.query(
      "UPDATE orders SET orderdescription=$2 WHERE id=$1 RETURNING *",
      [orderId, orderdescription]
    );
    let mapDeleteQuery = `DELETE FROM orderproductmap WHERE id IN (SELECT id FROM orderproductmap WHERE orderid=${orderId} AND productid NOT IN (`;
    let mapAddQuery = `insert into orderproductmap (orderid,productid) select * from (values`;
    const temp = Object.entries(orderedproducts);
    let prevVal = false;
    temp.forEach(([key, value], i) => {
      console.log(
        `previos value:${prevVal},currentValue:${value},iteration:${i}`
      );
      mapDeleteQuery += `${prevVal ? "," : ""}${key}`;
      mapAddQuery += `${prevVal ? "," : ""}(${orderId},${key})`;
      if (temp.length - 1 === i) {
        mapDeleteQuery += ")) returning *";
        mapAddQuery += `) AS new_rows(orderid,productid) where not exists (select 1 from orderproductmap where orderproductmap.productid=new_rows.productid and orderproductmap.orderid=new_rows.orderid)`;
      }
      prevVal = value;
    });

    const { rows: removedProducts } = await db.query(mapDeleteQuery);
    const { rows: addedProducts } = await db.query(mapAddQuery);
    res.status(200).json({
      message: "updated orders successfully!",
      resultData: { removedProducts, updatedOrder, addedProducts },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something wen't wrong!" });
  }
};
module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Order id is missing!" });
      return;
    }
    const deletedOrders = db.query(
      "DELETE FROM orders WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({ message: "delete orders", resultData: deletedOrders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something wen't wrong!" });
  }
};
