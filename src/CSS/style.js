import styled from "styled-components";

export const ProductsArea = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-itemns: center;

  div {
    heigth: 320px;
    width: 230px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
`;
