import React from "react";
import { ButtonWrapper } from "./PrimaryButton.styled";


const PrimaryButton = ({ children, ...props }) => (
    <ButtonWrapper {...props}>{children}</ButtonWrapper>
);


export default PrimaryButton;