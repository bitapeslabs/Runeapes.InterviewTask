import styled from "styled-components";

export const CarouselContainer = styled.div<{ isInfinite: boolean }>`
  position: relative;
  display: flex;
  justify-content: ${({ isInfinite }) => (isInfinite ? `center` : `start`)};
  overflow: hidden;
`;

export const CarouselTrack = styled.div<{ translateX: number; deltaX: number }>`
  display: flex;
  transform: ${({ translateX, deltaX }) =>
    `translateX(${translateX + deltaX}px)`};
  transition: ${({ deltaX }) => `transform ${deltaX ? "0" : "0.8"}s ease-out`};
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  color: red;
  border: 1px solid red;
`;
