import React from "react";
import { SelectWrapper } from "./PrimarySelect.styled";


const PrimarySelect = ({ children, ...props }) => (
    <SelectWrapper {...props}>{children}</SelectWrapper>
);


export default PrimarySelect;