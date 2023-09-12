import { useCallback, useRef, useState } from "react";



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






export default function Home() {



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
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {


            return (
              <Marker
                onClick={() => onMarkerClick(marker)}
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
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







