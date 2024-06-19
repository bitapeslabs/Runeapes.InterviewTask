import styled from "styled-components";

interface IndexContainerProps {
    gap?: number,
}

const IndexContainer = styled.div<IndexContainerProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
  gap: ${(props) => props.gap}px;
  `;

export default IndexContainer