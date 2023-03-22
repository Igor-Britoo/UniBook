import styled from "styled-components";

export const ContainerAccount = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextBack = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #619885;
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  align-items: flex-start;
  /* margin-top: 130px; */
`;

export const PersonalButton = styled.button`
  font-size: 28px;
  font-weight: 600;
  color: #1C3333;
  padding-left: 30px;
  border: transparent;
  background-color: transparent;
  margin-left: 80px;

  :hover {
    cursor: pointer;
    border-left: 6px solid #619885;

  }
`;

export const OrdersButton = styled.button`
  font-size: 28px;
  font-weight: 600;
  color: #1C3333;
  padding-left: 30px;
  border: transparent;
  background-color: transparent;
  margin-left: 80px;

  :hover {
    cursor: pointer;
    border-left: 6px solid #619885;

  }
`;

export const ContainerForm = styled.div`
  background-color: white;
  padding: 52px 20px 21px 20px;
  border-radius: 10px;
  /* width: 902px;
  height: 716px; */
`;

export const ContainerButtonsForm = styled.div`
  display: flex;
  margin-top: 130px;
  gap: 54px;
`;

export const LabelForm = styled.label`
  font-size: 24px;
  font-weight: 600;
  color: #1C3333;
`;

export const RowForm = styled.div`
  display: flex;
  gap: 146px;

  .column {
    display: flex;
    flex-direction: column;
  }
`;

export const Input = styled.input`
  width: 358px;
  height: 56px;
  border-radius: 10px;
  margin-top: 24px;
`;