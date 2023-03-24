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
`;

export const ContainerButtonsForm = styled.div`
  display: flex;
  margin-top: 130px;
  gap: 54px;

  .position-form {
    display: flex;
    justify-content: center;
    width: 80%;
  }
`;

export const LabelForm = styled.label`
  font-size: 24px;
  font-weight: 600;
  color: #1C3333;
  margin-bottom: 24px;
`;

export const RowForm = styled.div`
  display: flex;
  gap: 146px;

  .column {
    display: flex;
    flex-direction: column;
  }
`;

export const SpecialRowForm = styled.div`
  display: flex;
  gap: 20px;

  .column {
    display: flex;
    flex-direction: column;
  }

  .cep {
    width: 232px;
  }

  .number {
    width: 106px;
  }

  .address {
    width: 483px;
  }

  .state {
    width: 232px;
  }

  .city {
    width: 232px;
  }
`;

export const Input = styled.input`
  width: 358px;
  height: 56px;
  border-radius: 10px;
  margin-bottom: 32px;
  border: none;
  background-color: #D9D9D9;
  padding: 12px 20px;
`;

export const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 228px;
  height: 39px;
  background-color: #619885;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

export const PositionButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;