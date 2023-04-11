import styled from "styled-components";


export const Sections = styled.div`
    display: flex;
    width: 100%;
    max-width: 1072px;
    gap: 60px;
    text-align: left;
    margin-top: 40px;
    
    @media screen and (max-width: ${props => props.theme.breakpoints.xl}) {
        max-width: 888px;
    }
    @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
        max-width: 684px;
    }
    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        max-width: 384px;
    }
    @media screen and (max-width: ${props => props.theme.breakpoints.xs}) {
        max-width: 180px;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
    }
`;

export const BooksSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 60px;
    margin-left: 300px;
    
    align-items: center;

    .btn-load-more{
        width: 200px;
        height: 30px;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
       margin: 0; 
    }

`;

export const Books = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    min-width: 792px;

    ${props => props.numberOfBooks ===0 && `
    display: flex;
    `}

    @media screen and (max-width: ${props => props.theme.breakpoints.xl}) {
        grid-template-columns: repeat(3, 1fr);
        min-width: 588px;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
        grid-template-columns: repeat(2, 1fr);
        min-width: 384px;
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.xs}) {
        grid-template-columns: 1fr;
        min-width: 180px;
    }

`;

export const FiltersSection = styled.div`
    position: fixed;
    z-index: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 65vh;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.gray[500]};
    padding: 32px 30px;
    gap: 35px;

    /* For WebKit-based browsers */
    ::-webkit-scrollbar {
        border-radius: 10px; /* radius of the scrollbar track */
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px; /* radius of the scrollbar track */
    }

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        display: ${props => props.active ? 'flex' : 'none'};
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #F3F3F3;
        box-shadow: -6px 4px 4px rgba(0, 0, 0, 0.25);
        z-index: 9999;
        border-radius: 0;

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

export const ButtonOpenFilters = styled.button`
    display: none;

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        width: fit-content;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 14px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
`;

export const ButtonCloseFilters = styled.button`
    display: none;

    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        width: fit-content;
        display: block;
        border: none;
        background-color: transparent;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 20px;
    }
`;

