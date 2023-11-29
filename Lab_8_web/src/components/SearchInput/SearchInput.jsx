import React from "react";
import { InputWrapper } from "./SearchInput.styled";


const SearchInput = ({ children, ...props }) => (
    <InputWrapper 
        allowClear 
        {...props}>
            {children}
    </InputWrapper>
);


export default SearchInput;