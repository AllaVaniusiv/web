import React from "react";
import logo from "../../../icons/logo.svg";
import { HorizontalLine, StyledFooter, IconsWrapper, IconBase, Wrapper, StyledText } from "./Footer.styled";
import LinkedImg from "../../../components/LinkedImg/LinkedImg";
import Icon, {
    TwitterSquareFilled,
    YoutubeFilled,
    LinkedinFilled,
    FacebookFilled,
    AliwangwangOutlined
} from "@ant-design/icons";

function Footer() {
    return (
        <StyledFooter>
            <Wrapper>
                <div>
                    <h3>Branding stuff</h3>
                    <p>Some interesting text...</p>
                </div>
                
                <img src={logo} alt="" width={100}/>

                <IconsWrapper>
                    <LinkedImg href="https://www.facebook.com/" component={FacebookFilled} color='#4267B2'/>
                    <LinkedImg href="https://twitter.com/" component={TwitterSquareFilled} color='#03A9F4'/>
                    <LinkedImg href="https://www.linkedin.com/home" component={LinkedinFilled} color='#007AB9'/>
                    <LinkedImg href="https://youtube.com/" component={YoutubeFilled} color='#FF0000'/>
                </IconsWrapper>
            </Wrapper>
            <HorizontalLine />
            <StyledText>© Copyright all rights reserved</StyledText>
        </StyledFooter>
    );
}

export default Footer;
