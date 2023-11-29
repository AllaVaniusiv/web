import axios from "axios";


export const BaseURL = "http://localhost:5000/printers";

export const getPrinters = async (params, callback, URL="") => {
    await axios.get(`${BaseURL}${URL}`, { params }).then((response) => {
        callback(response.data);
    });
};

export const downloadImage = async (imageName, setImageData, setLoading) => {
    if (!imageName) {
        return null;
    }
    try {
        setLoading(true);
        const response = await axios.get(`${BaseURL}/image/${imageName}`, {
            responseType: 'arraybuffer',
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const dataUrl = URL.createObjectURL(blob);

        setImageData(dataUrl);
    } catch (error) {
        console.error('Error downloading image:', error);
    } finally {
        setLoading(false);
    }
};