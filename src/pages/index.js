import { useCallback, useEffect, useRef, useState } from "react";



//
import PageContainer from "../components/ui/container";
import LeftSideContainer from "../components/ui/container/left-side-container";
import RightSideContainer from "../components/ui/container/right-side-container";
import CardOrigin from "../components/ui/card/card-origin";



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



//
import { collection, getDocs } from "firebase/firestore";
import db from "../config/firebase"


export default function Home() {

  const getPricingData = async () => {
    try {
      const pricingSnapshot = await getDocs(collection(db, 'pricing'));
      const pricingData = pricingSnapshot.docs.map(doc => doc.data());
      console.log("pricingData", pricingData); // Data is Empty
      return pricingData;
    } catch (error) {
      console.error('Error getting pricing data:', error);
      return [];
    }
  };



  useEffect(() => {
    getPricingData()
  }, [])


  const libraries = ["places"];

  const mapContainerStyle = {
    height: "100vh",

  };

  const options = {
    fullscreenControl: false,

    disableDefaultUI: true,
    zoomControl: true,
  };


  const { isLoaded, loadError } = useLoadScript({
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

  const panTo = useCallback(({ lat, lng }) => {
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
          // onClick={onMapClick}
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
                strokeDasharray: "4 4", // Set the stroke to be dotted
                // ... other polyline options
              }}
            />
          )}

        </GoogleMap>

      </RightSideContainer>

    </PageContainer>
  )
}



