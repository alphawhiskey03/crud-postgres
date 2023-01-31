import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { ORDERS_ROUTE } from "../../constants";
import axios from "axios";
import {
  OrdersContainer,
  Header,
  SearchBox,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Title,
  Button,
  Actions,
} from "./OrderStyles";

const formatDate = (stamp) => {
  const data = new Date(stamp);
  return data.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
const Orders = ({ onEdit, currentOrders, onSearch, searchValue }) => {
  const [searchText, setSearchText] = useState("");
  const findSubstring = (substr, str) => String(str).includes(substr);
  const [orderList, setOrderList] = useState(currentOrders);
  useEffect(() => {
    if (searchText) {
      const temp = orderList.filter((orderList) => {
        return (
          findSubstring(orderList.orderdescription, searchText) ||
          findSubstring(orderList.id, searchText)
        );
      });
      setOrderList(temp);
    }
  }, [searchText]);

  const onDelete = async (id) => {
    try {
      const { status } = await axios({
        url: `${ORDERS_ROUTE}/${id}`,
        method: "DELETE",
      });
      if (status !== 200) {
        throw new Error("Error");
      }
      alert(`deleted order of id:${id}`);
    } catch (err) {
      console.log(err);
      alert("something wen't wrong!");
    }
  };
  return (
    <OrdersContainer>
      <Header>
        <Title>Order Management</Title>
        <SearchBox
          type="text"
          placeholder="Search by description or id"
          onChange={onSearch}
          value={searchValue}
        />
      </Header>
      <Table>
        <Thead>
          <Tr>
            <Td>Order Id</Td>
            <Td>Order Description</Td>
            <Td>Count of Products</Td>
            <Td>Create Date</Td>
            <Td></Td>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrders.map(
            ({ id, orderdescription, productcount, createat }) => (
              <Tr>
                <Td>{id}</Td>
                <Td>{orderdescription}</Td>
                <Td>{productcount}</Td>
                <Td>{formatDate(createat)}</Td>
                <Td>
                  <Actions>
                    <Button onClick={() => onEdit(id)}>
                      <AiFillEdit />
                    </Button>
                    <Button onClick={() => onDelete(id)}>
                      <AiOutlineDelete />
                    </Button>
                  </Actions>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </OrdersContainer>
  );
};

export default Orders;
