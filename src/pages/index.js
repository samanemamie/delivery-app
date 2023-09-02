import { useTheme } from "next-themes";
import { Button } from "../components/ui/Button";
import { Toast, toast } from "../components/ui/toast";
import { Field, Form, Formik } from "formik";


import FormikInput from "../components/ui/form/formik-input";
import { advancedSchema } from "../lib/validations";
import FormikReactSelect from "../components/ui/form/formik-react-select";
import FormikRadioButtons from "../components/ui/form/formik-radio-buttons";
import PageContainer from "../components/ui/container";
import LeftSideContainer from "../components/ui/container/left-side-container";
import RightSideContainer from "../components/ui/container/right-side-container";
import CardOrigin from "../components/ui/card/card-origin";
import { factReducer, initialState } from "../lib/reducer/FactReducer";
import { createContext, useContext } from "react";

import { statusCard } from '../components/Providers'

import GoogleMapReact from 'google-map-react';
import CardDestination from "../components/ui/card/card-destination";
import CardParsels from "../components/ui/card/card-parsels";
import CardTransport from "../components/ui/card/card-transport";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const feedingSystem = [
  { value: 1, label: "sam" },
  { value: 2, label: "mil" },
  { value: 3, label: "jav" },];

const feedingSystem2 = [
  { value: "manual", key: "Confirmation Code", id: "1" },
  { value: "chain", key: "Note Needed", id: "2" },

];


export default function Home() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const { setTheme } = useTheme()

  const { cardOriginStatus } = useContext(statusCard)

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
            bootstrapURLKeys={{ key: "" }}
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
