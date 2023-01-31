import styled from "styled-components";
export const MainLayout = styled.div`
  background-color: white;
  width: 60vw;
  height: 80vh;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
`;
export const InputText = styled.input`
  width: 80%;
  padding: 5px;
`;

export const CheckBox = styled.input`
  &[type="checkbox"] {
  }
`;
export const Button = styled.button`
  padding: 5px;
  margin: 5px;
  width: 10vw;
`;
