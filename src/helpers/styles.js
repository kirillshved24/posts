import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`

export const PaginationButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
   

    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    &:hover: {
        background-color: #0056b3;
    }
`