import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ORDERS_ROUTE, PRODUCTS_ROUTE } from "../../constants";
import {
  ModalContainer,
  ModalHeader,
  ModalFooter,
  ProductItem,
  ProductList,
  ProductTitle,
} from "./ModalStyles";
import { Button, InputText, CheckBox } from "../Common";

const ProductDescription = styled.div``;

const Modal = ({ onClose, mode, orderId }) => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    orderdescription: "",
    orderedproducts: {},
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          url: PRODUCTS_ROUTE,
          method: "GET",
        });
        const {
          data: { resultData },
        } = res;
        setProducts(resultData);
      } catch (err) {
        console.log(err);
        alert("something wen't wrong!");
      }
    })();
  }, []);
  useEffect(() => {
    if (orderId) {
      (async () => {
        try {
          const resp = await axios({
            url: `${ORDERS_ROUTE}/${orderId}`,
            method: "GET",
          });
          const {
            status,
            data: { resultData },
          } = resp;
          if (status !== 200) {
            throw new Error("Incorrect order id");
          }

          setOrder(resultData);
        } catch (err) {
          console.log(err);
          alert("something wen't wrong!");
        }
      })();
    }
  }, [orderId]);

  const onChange = (e) => {
    if (e.target.type == "checkbox") {
      setOrder((currentValues) => ({
        ...currentValues,
        orderedproducts: {
          ...currentValues.orderedproducts,
          [e.target.name]: e.target.checked,
        },
      }));
    } else {
      setOrder((currentValues) => ({
        ...currentValues,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const isEdit = mode == "edit";
  const saveOrder = async () => {
    try {
      const resp = await axios({
        url: ORDERS_ROUTE,
        method: "POST",
        data: order,
      });
      if (resp.status !== 200) {
        throw new Error("Something wrong with the data passed");
      }
      alert("Order saved!");
      onClose();
    } catch (err) {
      console.log(err);
      alert("something wen't wrong!");
    }
  };

  const updateOrder = async () => {
    try {
      const resp = await axios({
        url: ORDERS_ROUTE,
        method: "PUT",
        data: { ...order, orderId },
      });
      if (resp.status !== 200) {
        throw new Error("Something wrong with the data passed!");
      }
      alert(`successfully edited order of id: ${orderId}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("something wen't wrong!");
    }
  };
  const onSubmit = async () => {
    const hasProducts = Object.values(order.orderedproducts).some(
      (value) => value
    );
    if (!hasProducts) {
      alert("Should atleast select one product");
      return;
    }
    if (isEdit) {
      await updateOrder();
    } else {
      await saveOrder();
    }
  };

  return (
    <ModalContainer>
      <ModalHeader>{isEdit ? "Edit Order" : "New Order"} </ModalHeader>
      <InputText
        type="text"
        name="orderdescription"
        placeholder="Search by description or id"
        onChange={onChange}
        value={order.orderdescription}
        required={true}
      />
      <ProductList>
        {products.map(({ id, productname, productdescription }) => (
          <ProductItem key={id}>
            <CheckBox
              name={id}
              type="checkbox"
              onChange={onChange}
              checked={order.orderedproducts[id]}
            />
            <div>
              <ProductTitle>{productname}</ProductTitle>
              <ProductDescription>{productdescription}</ProductDescription>
            </div>
          </ProductItem>
        ))}
      </ProductList>
      <ModalFooter>
        <Button onClick={onSubmit}>Submit</Button>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export default Modal;
