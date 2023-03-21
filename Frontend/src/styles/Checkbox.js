import styled from "styled-components";

export const ContainerCheckbox = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
    margin-bottom: 8px;
`;

export const Check = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #1C3333;
`;
