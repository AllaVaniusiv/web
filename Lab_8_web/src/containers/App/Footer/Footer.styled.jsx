import Icon from '@ant-design/icons';
import styled from 'styled-components';

export const StyledFooter = styled.div`
    margin-top: 20px;
    padding: 0px 50px;
    border: 0px;
    border-top: 1px;
    border-style: solid;
    border-color: black;
`;

export const HorizontalLine = styled.hr`
    background-color: black;
    height: 1px;
    border: 0;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    p { 
        color: #8E8E93;
        font-weight: 200;
    }
    h1 {
        margin-top: 10px;
    }
    span { 
        margin: 0 10px;
    }
    div {
        width: 400px;
    }
`;

export const IconsWrapper = styled.div`
    margin: 10px 0;
`;

export const StyledText = styled.p`
    color: #8E8E93;
    margin-top: 15px;
    text-align: center;
`;