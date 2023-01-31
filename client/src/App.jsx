import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Orders from "./components/Orders/Orders";
import Modal from "./components/Modal/Modal";
import { ORDERS_ROUTE } from "./constants";
import { MainLayout, Button } from "./components/Common";

function App() {
  const modalInitialState = {
    isOpen: false,
    mode: "add",
    orderId: null,
  };
  const [openModal, setOpenModal] = useState(modalInitialState);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const search = () => {
    return currentOrders.filter(
      (item) =>
        String(item.id).includes(searchValue) ||
        item.orderdescription.includes(searchValue)
    );
  };

  const editOrder = (id) => {
    setOpenModal({
      isOpen: true,
      mode: "edit",
      orderId: id,
    });
  };
  const addOrder = () => {
    setOpenModal({
      isOpen: true,
      mode: "add",
    });
  };
  const onClose = () => {
    setOpenModal({
      isOpen: false,
    });
  };
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          url: ORDERS_ROUTE,
          method: "GET",
        });
        if (res.status !== 200) {
          alert("Something wen't wrong");
          return;
        }
        const {
          data: { resultData },
        } = res;
        setCurrentOrders(resultData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <MainLayout>
        <Orders
          onEdit={editOrder}
          currentOrders={search(currentOrders)}
          onSearch={onSearch}
          searchValue={searchValue}
        />
        <Button onClick={addOrder}>New order</Button>
      </MainLayout>

      {openModal.isOpen && (
        <Modal
          onClose={onClose}
          mode={openModal.mode}
          orderId={openModal.orderId}
        />
      )}
    </div>
  );
}

export default App;
