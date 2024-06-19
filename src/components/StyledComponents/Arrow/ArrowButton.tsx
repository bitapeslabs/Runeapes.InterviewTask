import styled from "styled-components";

interface ArrowButtonProps {
    isLeft?: boolean,
    isHidden?: boolean,
}

const ArrowButton = styled.button<ArrowButtonProps>`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    border: none;
    width: 48px;
    height: 100%;
    opacity: 0.7;
    background-color: #929292a9;
    mix-blend-mode: luminosity;
    transition: opacity 500ms, background-color 500ms;
    z-index: 2;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    &:focus-visible {
        opacity: 1;
      }
    
    &:active {
        background-color: #6b6b6ba9;
      }

    ${(props) => (props.isLeft? 'left: 0;' : 'right: 0;')}
    ${(props) => (props.isHidden? 'opacity: 0; pointer-events: none;' : '')}
    
`
export default ArrowButton