import styled from "styled-components";

const Container = styled.div<{
  $itemWidth: number;
  $isInfinite: boolean;
  $index: number;
  $viewCount: number;
  $totalCount: number;
  $translate: number;
  $gap: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ $gap }) => $gap + "px"};
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  width: ${({ $itemWidth }) => $itemWidth + "px"};
  height: inherit;
  transform: ${({ $translate }) => "translateX(" + $translate + "%)"};
  transition: transform 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    object-fit: cover;
  }
`;

export { Container };
