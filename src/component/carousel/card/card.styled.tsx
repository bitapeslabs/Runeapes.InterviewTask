import styled from "styled-components";

export const CardContainer = styled.div`
  position: absolute;
  display: flex;
  padding: 20px;
  transform-style: preserve-3d;
  transform-origin: center;
  transition: all 0.8s ease-out;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 400px;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  transform: translate(calc(-50% - 20px));
`;
