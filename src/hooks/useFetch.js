import { db, storage, ref, getDownloadURL } from "../config/firebase";
import { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { statusCard } from "../components/Providers";

const usePricingAndBearerData = (initialValue = []) => {

    const { originlatLng, destinationlatLng } = useContext(statusCard);

    const [bearerParcelsData, setBearerParcelsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (originlatLng.length !== 0 && destinationlatLng.length !== 0) {
            const fetchData = async () => {
                try {
                    const bearerSnapshot = await getDocs(collection(db, initialValue));
                    const bearerData = bearerSnapshot.docs.map(doc => doc.data());

                    const imagePromises = bearerData.map(async (img) => {
                        const pathReference = ref(storage, img.parcel_img_url);
                        const url = await getDownloadURL(pathReference);
                        return {
                            ...img,
                            url
                        };
                    });

                    const images = await Promise.all(imagePromises);
                    setBearerParcelsData(images);
                } catch (error) {
                    console.error('Error getting bearer data:', error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [initialValue, originlatLng, destinationlatLng]);

    return { bearerParcelsData, loading, error };
};

export default usePricingAndBearerData;


