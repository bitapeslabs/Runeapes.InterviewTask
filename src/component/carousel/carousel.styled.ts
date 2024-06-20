import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 500px;
  justify-content: center;
  overflow: hidden;
`;

export const CarouselTrack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s ease-in-out;
  background-color: black;
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
