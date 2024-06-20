import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  transform: translate(calc(-50% - 20px));
  transition: 0.3s;
`;
