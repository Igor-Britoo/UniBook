import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-top: 40px;
    width: 100%;
    max-width: 1100px;

    @media screen and (max-width: ${props => props.theme.breakpoints.xl}) {
        max-width: 900px;
    }
    @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
        max-width: 600px;
    }
`;

export const Sections = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 60px;
    text-align: left;
`;

export const BooksSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
    
    align-items: center;

    .btn-load-more{
        width: 200px;
        height: 30px;
    }
`;

export const Books = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    min-width: 800px;

    ${props => props.numberOfBooks ===0 && `
    display: flex;
    `}

    @media screen and (max-width: ${props => props.theme.breakpoints.xl}) {
        grid-template-columns: repeat(3, 1fr);
        min-width: 600px;
    }

`;

export const FiltersSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: fit-content;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.gray[500]};
    padding: 32px 30px;
    gap: 35px;

    @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
        display: none;
    }
`;

export const FilterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RangeInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    .range-slider {
        height: 8px;
        background:${props => props.theme.colors.white};
    }

    .range-slider .range-slider__range {
        background: ${props => props.theme.colors.green[500]};
    }

    .range-slider .range-slider__thumb {
        width: 4px;
        height: 20px;
        border-radius: 0px;
        background-color: ${props => props.theme.colors.green[800]};
    }

`;

export const InputsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    width: 100%;

    input{
        width: 50%;
        border: 1px solid ${props => props.theme.colors.gray[800]};
        padding: 4px 8px;
        font-size: ${props => props.theme.fontSizes.sm};
        font-weight: 500;
        color: ${props => props.theme.colors.green[800]};

        // Hide the arrows 
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }
        -moz-appearance: textfield;

        &:focus{
            outline: none;
            border: 1px solid ${props => props.theme.colors.green[800]};
        }
    }

    div{
        width: 12px;
        height: 2px;
        background-color: ${props => props.theme.colors.green[800]}
    }
`;



