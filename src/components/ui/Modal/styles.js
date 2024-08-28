import styled from 'styled-components'

export const Modal = styled.div`
position: fixed;
    top: 42%;
    left: 49%;
    transform: translate(-50%, -50%);
    z-index:2;
    color:black;
    border:1px solid white;
    padding:15px;
    background:white;
    display:flex;
    gap:15px;
    flex-direction:column;
    border-radius:15px;
`