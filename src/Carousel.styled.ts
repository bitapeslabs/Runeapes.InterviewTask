import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 500px;
  justify-content: center;
  overflow: hidden;
`;

export const ItemContainer = styled.div`
  position: absolute;
  display: flex;
  transform-style: preserve-3d;
  transform-origin: center;
  transition: all 0.8s ease-out;
`;

export const CarouselButton = styled.button`
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 2rem;
`;