import styled from "styled-components";


export const Image = styled.img`
max-width:200px;
float:left;
margin-right:15px;
`

export const Text = styled.div`
font-syze:15px;
`

export const LinkWrapper = styled.div`
margin:15px 0 0 0;
display:flex;
gap:15px;
justify-content:center;
width:100%;
align-items:center;
`

export const DeleteButton = styled.button`
border:1px solid black;
background:white;
padding:5px 15px;
color:black;
cursor:pointer;
border-radius:10px;

&:hover{
background:red;
color:white;
border:1px solid red;
}
`

export const ModalWrapper = styled.div`
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:rgb(0,0,0,0.5);
z-index:1;
`


export const ModalText = styled.div`
color:black;
font-weight:bold;
font-size:20px;
text-align:center;
`

export const ModalContent = styled.div`
display:flex;
gap:15px;
align-items:center;
justify-content:center;
width:100%;
`