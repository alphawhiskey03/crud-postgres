import styled from "styled-components";

export const ModalContainer = styled.div`
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 60vh;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
`;
export const ModalHeader = styled.p`
  font-weight: 900;
  font-size: 18px;
  text-align: left;
`;
export const ModalBody = styled.div``;
export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;
export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const ProductItem = styled.li`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  border: 1px solid black;
  align-items: center;
  width: 30vw;
  padding: 20px;
`;
export const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
