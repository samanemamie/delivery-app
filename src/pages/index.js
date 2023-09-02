
import PageContainer from "../components/ui/container";
import LeftSideContainer from "../components/ui/container/left-side-container";
import RightSideContainer from "../components/ui/container/right-side-container";
import CardOrigin from "../components/ui/card/card-origin";


//
import GoogleMapReact from 'google-map-react';



//
import CardDestination from "../components/ui/card/card-destination";
import CardParsels from "../components/ui/card/card-parsels";
import CardTransport from "../components/ui/card/card-transport";





export default function Home() {

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: 33.865143,
      lng: 151.209900,
    },
    zoom: 6
  };




  return (
    <PageContainer>
      <LeftSideContainer>

        <CardOrigin />
        <CardDestination />
        <CardParsels />
        <CardTransport />
      </LeftSideContainer>
      <RightSideContainer>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </RightSideContainer>

    </PageContainer>
  )
}



