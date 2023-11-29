import styled from 'styled-components';

export const ItemContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
    margin-left: 100px;
    img {
        margin: 0 100px;
        width: 400px;
    }
`

export const SubmitContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center; 
    text-align: center;
    margin: 0 0px;
    p {
        margin-top: 0px;
    }
`

export const CategoryWrapper = styled.div`
    display: flex;
    a {
        margin: 50px 5px;
        color: white;
        background: #a30cde;
        text-decoration: none;
        border: 1px solid black;
        border-radius: 10px;
        padding: 2px 10px;
        text-align: center;
    }
`

export const SelectsWrapper = styled.div`
    display: flex;
    div>div {
        margin: 0 10px;
    }
    div>p {
        margin: 0 10px;
    }
`

export const Title = styled.h1`
    margin-left: 200px;
`

export const Description = styled.p`
    white-space: pre-wrap;
`

export const DescriptionContainer = styled.div`
    margin: 0 300px 0 200px;
`