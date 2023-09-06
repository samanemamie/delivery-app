import { useCallback, useRef, useState } from "react";



//
import PageContainer from "../components/ui/container";
import LeftSideContainer from "../components/ui/container/left-side-container";
import RightSideContainer from "../components/ui/container/right-side-container";
import CardOrigin from "../components/ui/card/card-origin";



//
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";


import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { formatRelative } from "date-fns";


//
import CardDestination from "../components/ui/card/card-destination";
import CardParsels from "../components/ui/card/card-parsels";
import CardTransport from "../components/ui/card/card-transport";





export default function Home() {

  const libraries = ["places"];
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };
  const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat: -25.274399,
    lng: 133.775131,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk",
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);


  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    const newMarker = {
      lat: lat,
      lng: lng
    };



    setMarkers(newMarker);

    console.log(newMarker, 'newMarker');



    console.log(markers, 'markers');
  }, []);


  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  return (
    <PageContainer>
      <LeftSideContainer>
        <CardOrigin panTo={panTo} />
        <CardDestination />
        <CardParsels />
        <CardTransport />
      </LeftSideContainer>
      <RightSideContainer>
        <div style={{ height: '100vh', width: '100%' }}>


          <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
          >
            {/* {markers && markers?.map(({ marker, index }) => {
              console.log(marker, "marker")
              return (
                <Marker
                  key={index}
                  position={{ lat: marker?.lat, lng: marker?.lng }}


                  icon={{
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                  }}
                />
              )

            }


            )} */}
            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <h2>
                    Alert
                  </h2>
                  <p>Spotted {formatRelative(selected.time, new Date())}</p>
                </div>
              </InfoWindow>
            ) : null}

          </GoogleMap>
        </div>
      </RightSideContainer>

    </PageContainer>
  )
}



