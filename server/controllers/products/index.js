const db = require("../../db");
module.exports.getAllProducts = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM products");
    res
      .status(200)
      .json({ message: "Products fetched successfully", resultData: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wen't wrong!" });
  }
};
