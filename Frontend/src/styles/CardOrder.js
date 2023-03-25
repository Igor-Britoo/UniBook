import styled from "styled-components";

export const Card = styled.div`
  background-color: white;
  padding: 16px 90px 22px 38px;
  border-radius: 10px;
  width: 80%;
`;

export const RowOrderStatus = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #1C3333;
`;

export const RowBook = styled.div`
  display: flex;
  gap: 28px;
  margin-top: 13px;

  .img {
    height: 174px;
    width: 115px;
  }
`;

export const Author = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #1C3333;
  margin-top: 16px;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #1C3333;
  margin-top: 8px;
`;

