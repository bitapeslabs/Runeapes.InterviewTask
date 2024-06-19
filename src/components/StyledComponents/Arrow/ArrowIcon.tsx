import styled from "styled-components";

interface ArrowIconProops {
    isLeft?: boolean
}

const ArrowIcon = styled.button<ArrowIconProops>`
    width: 24px;
    height: 24px;
    border: 6px solid #1b1b1b;
    transition: border-color 500ms;
    opacity: 0.5;
    background-color: transparent;
    ${(props) => (props.isLeft ? ' border-right: none;  border-top: none; transform: translateX(2.5px) rotate(45deg); ' : ' border-left: none; border-bottom: none; transform: translateX(-2.5px) rotate(45deg); ')}
`

export default ArrowIcon