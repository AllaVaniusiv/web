import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { InputNumber } from 'antd';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { CategoryWrapper, Description, DescriptionContainer, ItemContainer, SubmitContainer, Title } from "./ItemPage.styled";
import { getPrinters } from "../../API/api";
import DownloadImage from "../../components/Image/DownloadImage";

const ItemPage = () => {
    const { printerId } = useParams();

    const [currentPrinter, setCurrentPrinter] = useState({});

    useEffect(() => {
        getPrinters({id: printerId}, (resp) => setCurrentPrinter(resp.printer));
    }, [printerId])

    return (
        <div>
            { currentPrinter ?
            <div>
                <Title>{currentPrinter.title}</Title>
                <ItemContainer>
                    <DownloadImage imageName={currentPrinter.image} />
                    <div>
                        <CategoryWrapper>
                            <Link to="#">{currentPrinter.category}</Link>
                        </CategoryWrapper>
                        <SubmitContainer>
                            <h3>{currentPrinter.price} UAH</h3>
                            <div>
                                {!currentPrinter.quantity ? true : false && <p>Item is out of stock</p>}
                                <InputNumber disabled={!currentPrinter.quantity ? true : false} min={1} max={currentPrinter.quantity} defaultValue={1} />
                                <Link to="/cart">
                                    <PrimaryButton disabled={!currentPrinter.quantity ? true : false}>Add to cart</PrimaryButton>
                                </Link>
                            </div>
                            <br />
                        </SubmitContainer>
                    </div>
                </ItemContainer>
                <DescriptionContainer>
                    <h2>Description</h2>
                    <Description>{currentPrinter.text}</Description>
                </DescriptionContainer>
            </div> :
            <div>Problem!!!</div> }
        </div>
    )
};

export default ItemPage;