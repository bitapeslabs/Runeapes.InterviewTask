import { ICarouselItem } from "../../../utils/typesUtils";
import styled from "styled-components";

const Container = styled.div<ICarouselItem>`
  background: #777;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: ${({ $viewWidth }) => $viewWidth + "px"};
  height: ${({ $viewHeight }) => $viewHeight + "px"};

  .time_line {
    position: absolute;
    top: 0;
    width: 100%;
    height: 5px;
    background-color: #bbb;

    .progress {
      height: inherit;
      background-color: #4334eb;
    }
  }

  .slider {
    display: flex;
    align-items: center;
    height: inherit;
    touch-action: none;
  }

  .handler {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
    padding: 6px;
    background-color: #888e;
    display: flex;
    align-items: center;
    gap: 8px;

    .handle {
      cursor: pointer;
      width: 8px;
      height: 8px;
      background-color: #bbb;
      border-radius: 100%;

      &.active {
        background-color: white;
      }
    }
  }

  .left,
  .right {
    position: absolute;
    padding: 12px;
    background-color: #666a;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;

    &:hover {
      background-color: #666d;
    }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;

export { Container };
