import { useCallback, useContext, useEffect, useRef, useState } from "react";



//
import PageContainer from "../components/ui/container";
import LeftSideContainer from "../components/ui/container/left-side-container";
import RightSideContainer from "../components/ui/container/right-side-container";
import CardOrigin from "../components/ui/card/card-origin";



//
import { statusCard } from "../components/Providers";



//
import Icons from "../components/ui/Icons";



//
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";



//
import CardDestination from "../components/ui/card/card-destination";
import CardParsels from "../components/ui/card/card-parsels";
import CardTransport from "../components/ui/card/card-transport";




import { collection, getDocs } from "firebase/firestore";
import { db, storage, ref, getDownloadURL } from "../config/firebase"

import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";




export default function Home() {

  const { originlatLng, setOriginlatLng, destinationlatLng, setDestinationlatLng } = useContext(statusCard)


  const functions = getFunctions();






  const getPricingAndBearerData = async () => {
    try {


      const pricingFunction = httpsCallable(functions, "pricing");
      const pricingResult = await pricingFunction({
        origin: {
          lat: 65,
          lng: 78,
        },
        destination: {
          lat: 76,
          lng: 67
        },
        vehicle_type: {
          walking: true,
          driving: false,
          bicycling: false,
        },
        parcel_type: "Envelope",
        parcel_description: "35 x 27 x 4 cm",
        parcel_min_weight: 2.5,
        parcel_max_weight: 0.1,
      })

      console.log(pricingResult, 'pricingResult');



      // console.log(res, "res")

      // const pathReference = ref(storage, 'parcelsImage/f2uKNTOPPlQrIQRtq6hx.png');

      return { bearerData, pricingResult };
    } catch (error) {
      console.error('Error getting pricing and bearer data:', error);
      return { pricingData: [], bearerData: [] };
    }
  };

  // useEffect(() => {
  //   getPricingAndBearerData()

  // }, [])



  const libraries = ["places"];

  const mapContainerStyle = {
    height: "100vh",

  };

  const options = {
    fullscreenControl: false,

    disableDefaultUI: true,
    zoomControl: true,
  };


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk",
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const [center, setCenter] = useState(
    { lat: -37.840935, lng: 144.946457 }
  )


  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng, name }) => {

    if (name == "originAddress") {
      setOriginlatLng({ lat: lat, lng: lng })
    } else {
      setDestinationlatLng({ lat: lat, lng: lng })
    }

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    setMarkers((province) => [
      ...province,
      { lat: lat, lng: lng },
    ]);



  }, []);



  if (!isLoaded) return <div className="grid h-screen place-items-center animate-bounce"><Icons.MapPin color="gray" size={50} /></div>;


  return (
    <PageContainer>
      <LeftSideContainer>
        <CardOrigin panTo={panTo} />
        <CardDestination panTo={panTo} />
        <CardParsels />
        <CardTransport />
      </LeftSideContainer>
      <RightSideContainer>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={10}

          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {


            return (
              <Marker
                onClick={() => onMarkerClick(marker)}
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            )

          }

          )}

          {markers.length === 2 && (
            <Polyline
              path={markers}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 1,
                strokeWeight: 2,
                strokeDasharray: "4 4",
              }}
            />
          )}

        </GoogleMap>
      </RightSideContainer>

    </PageContainer>
  )
}







