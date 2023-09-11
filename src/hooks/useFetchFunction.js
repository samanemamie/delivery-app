import { useEffect, useState } from 'react';

import {
    getFunctions,
    httpsCallable,
} from "firebase/functions";

const useFetchFunction = (originlatLng, destinationlatLng, transportData) => {

    const [pricingResult, setPricingResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const functions = getFunctions();

    useEffect(() => {
        if (transportData.length !== 0) {
            const fetchData = async () => {
                try {
                    const pricingFunction = httpsCallable(functions, "pricing");
                    const result = await pricingFunction({
                        origin: {
                            lat: originlatLng.lat,
                            lng: originlatLng.lng,
                        },
                        destination: {
                            lat: destinationlatLng.lat,
                            lng: destinationlatLng.lng,
                        },
                        vehicle_type: {
                            walking: transportData.vehicle_type.walking,
                            driving: transportData.vehicle_type.driving,
                            bicycling: transportData.vehicle_type.bicycling,
                        },
                        parcel_type: transportData.parcel_type,
                        parcel_description: transportData.parcel_description,
                        parcel_min_weight: transportData.parcel_min_weight,
                        parcel_max_weight: transportData.parcel_max_weight,
                    });

                    const pricingData = [];
                    if (result.data.status === "success") {
                        if (result.data.cycling) {
                            pricingData.push({
                                type: "cycling",
                                distance: result.data.cycling?.distance,
                                duration: result.data.cycling?.duration,
                                length: result.data.cycling?.length,
                                price: result.data.cycling?.price,
                                time: result.data.cycling?.time,
                                src: '/img/bike.png',

                            });



                            if (result.data.walking) {
                                pricingData.push({
                                    type: "walking",
                                    distance: result.data.walking?.distance,
                                    duration: result.data.walking?.duration,
                                    length: result.data.walking?.length,
                                    price: result.data.walking?.price,
                                    time: result.data.walking?.time,
                                    src: '/img/walk1.png',
                                });
                            }
                        }
                    }




                    setPricingResult(pricingData);
                    setLoading(false);

                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();

        }

    }, [transportData])


    return { pricingResult, loading, error };
};

export default useFetchFunction;