import React, { useState, useEffect } from "react";
import PrinterImg from "../../icons/printer_header.jpg"
import { HomeWrapper, DesctriptionWrapper, CardsWrapper, ButtonWrapper } from "./Home.styled";
import CardItem from "../../components/CardItem/CardItem";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { getPrinters } from "../../API/api";

function Home() {
    const [printers, setPrinters] = useState([]);
    const [buttonLabel, setButtonLabel] = useState("View more");

    useEffect(() => {
        showMore(null, 3);
    }, [])

    const showMore = (e, primaryLimit) => {
        getPrinters({current: primaryLimit}, (resp) => {
            setPrinters(resp.printers);
            if (resp.more) {
                setButtonLabel("View more");
            } else {
                setButtonLabel("View less");
            }
        }, "/recomend");
    }

    const homePageContent = {
        title: 'What is Printer',
        text: 'A printer is a device used to create physical copies of documents and graphic images on paper or other data carriers. Printers are used in both home and office settings to print text, images, photos, and other content.There are different types of printers such as inkjet, laser, dot matrix and photo printers, each with its own characteristics and advantages.'
    }


    return (
        <HomeWrapper>
            <DesctriptionWrapper>
                <img src={PrinterImg} alt="" />
                <div>
                    <h2>{homePageContent.title}</h2>
                    <p>{homePageContent.text}</p>
                </div>
            </DesctriptionWrapper>
            <h2>Our recommendations for you</h2>
            <CardsWrapper>
                {printers.map(({ title, text, image, price, id }, idx) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageName={image}
                        price={price}
                        id={id}
                        key={id}
                    />
                ))}
            </CardsWrapper>
            <ButtonWrapper>
                <PrimaryButton onClick={showMore} size="large">{buttonLabel}</PrimaryButton>
            </ButtonWrapper>
        </HomeWrapper>
    );
}

export default Home;
