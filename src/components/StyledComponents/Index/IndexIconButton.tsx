import styled from "styled-components";

interface IndexIconButtonProps {
  activeIndex : boolean,
  borderWidth : number
}

const IndexIconButton = styled.button<IndexIconButtonProps>`
  border: none;
  padding: 0px;
  margin: 0px;
  height: 8px;
  border-radius: 2px;
  border-style: solid;
  border-color: rgba(50, 50, 50, 0.5);
  background-color: transparent;
  cursor: pointer;
  transition: background-color 500ms;
  background-color: ${(props)=>(props.activeIndex? 'black;' : 'transparent;')}
  borderWidth : ${(props) => props.borderWidth}px
  
`
export default IndexIconButton