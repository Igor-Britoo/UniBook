import styled from "styled-components";

export const ContainerCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
    border-radius: 10px;
    gap: 10px;
    padding: 14px;
    background-color: ${ props => props.theme.colors.gray[300]};
    box-shadow: 0px 2px 8px -2px rgba(0, 0, 0, 0.25);

    .title-author{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .book-cover{
        width: 120px;
        height: 180px;
    }

    button{
        width: 100%;
        cursor: pointer;
    }
`;