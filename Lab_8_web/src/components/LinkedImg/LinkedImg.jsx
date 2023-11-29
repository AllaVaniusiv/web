import React from "react";
import { IconBase } from "./LinkedImg.styled";

const LinkedImg = ({ href, component, color='#000000', ...props }) => (
    <a href={href} target="_blank" rel="noreferrer">
        <IconBase component={component} color={color} {...props}/>
    </a>
);


export default LinkedImg;