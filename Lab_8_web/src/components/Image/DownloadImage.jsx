import React, { useState, useEffect } from "react";
import { downloadImage } from "../../API/api";

const DownloadImage = ({ imageName, ...props }) => {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        downloadImage(imageName, setImageData, setLoading);
    }, [imageName]);

    return (
        loading ? (
            <div>Loading...</div>
        ) : (
            imageData && <img src={imageData} alt="Printer" {...props} />
        )
    );
};


export default DownloadImage;