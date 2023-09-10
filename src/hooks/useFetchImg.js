import { db, storage, ref, getDownloadURL } from "../config/firebase";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

const useFetchParcelImg = (initialValue = []) => {
    const [parcelImages, setParcelImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imagePromises = initialValue.map(async (img) => {
                    const pathReference = ref(storage, img.parcel_img_url);
                    const url = await getDownloadURL(pathReference);
                    return {
                        id: img.parcel_type, url
                    };
                });

                const images = await Promise.all(imagePromises);
                setParcelImages(images);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving images:', error);
                setError(error);
                setLoading(false);
            }
        };

        loadImage();
    }, [initialValue]);

    return { parcelImages, loading, error };
};

export default useFetchParcelImg;