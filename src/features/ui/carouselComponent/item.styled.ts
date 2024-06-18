import styled from "styled-components";

const Container = styled.div<{
  $itemWidth: number;
  $isInfinite: boolean;
  $index: number;
  $viewCount: number;
  $totalCount: number;
  $translate: number;
  $backgroundColor: string;
  $zIndex: number
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  width: ${({ $itemWidth }) => $itemWidth + "px"};
  height: inherit;
  transform: ${({ $translate }) => "translateX(" + $translate + "%)"};
  transition: transform 0.2s ease-in-out;
  z-index: ${({$zIndex}) => $zIndex};
  
  .title {
    background-color: ${({$backgroundColor}) => $backgroundColor};
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    object-fit: cover;
    font-size: 24px;
  }
`;

export { Container };
