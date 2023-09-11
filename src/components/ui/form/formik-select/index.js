import { useField, useFormikContext } from "formik";


import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import Icons from "../../Icons";



export const FormikSelect = (props) => {

    const [field, meta] = useField(props);
    const { panTo, label, name, onBlur, ...rest } = props;
    const { setFieldValue } = useFormikContext();

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });



    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, name });


            setFieldValue(name, address);
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };



    return (
        <>

            <Combobox className="relative h-14 rounded-sm  bg-gray-200 w-full  min-w-[200px]"
                onSelect={handleSelect}
            >
                <ComboboxInput
                    className={`peer h-full w-full ${meta.touched && meta.error ? "border-b border-red-500 focus:border-b-2 focus:border-red-500 focus:after:border-red-500 " : "border-b-2 border-gray-400 focus:border-b-2 focus:border-blue-500 focus:after:border-blue-500 "} px-3  bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-gray-600 outline outline-0 transition-all  focus:outline-0 `}
                    {...field}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                />
                <label className={`after:content[' '] ${meta.touched && meta.error ? " peer-focus:text-red-500 text-red-500" : " text-gray-400 peer-focus:text-blue-500"} pointer-events-none absolute px-3 -mt-[40px] flex h-full w-full select-none  text-base font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500`}>
                    {label}
                </label>
                <ComboboxPopover className="p-5 bg-gray-100 rounded-sm">
                    <ComboboxList className="z-50 my-2">
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <div className="flex items-center gap-2 py-2 ">

                                    <Icons.MapPin color="gray" size={15} />
                                    <ComboboxOption key={id} value={description} />


                                </div>

                            ))


                        }

                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>

            {/* 
            <ReactSelect
                {...field}
                defaultValue={getSingleValue()}
                onChange={(data) => {
                    onChange && onChange(data);
                    if (props?.isMulti) {
                        setFieldValue(
                            name,
                            data?.map((d) => d.value),
                        );
                    } else {
                        setFieldValue(name, data.value);
                    }
                }}
                {...rest}
            />
            {meta.error && meta.touched && <p className="w-full pr-2 -mt-3 text-sm font-light text-red-400 ">{meta.error}</p>} */}

        </>
    );
};





export default FormikSelect;