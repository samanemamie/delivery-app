import { useField, useFormikContext } from "formik";
import RSelect from 'react-select';



export const ReactSelect = ({ label = "", options, value, defaultValue, isMulti = false, ...rest }) => {

    const getMultiValues = () => {
        let results = [];
        value &&
            options &&
            value?.map((val) => results.push(options?.find((option) => option.value == val)));
        return results;
    };
    const getSingleValue = () => {
        return value && options && options?.find((item) => item.value == value);
    };

    const colourStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: 'black',
            position: 'relative',
            height: '3.5rem',
            borderRadius: '0.125rem',
            backgroundColor: 'rgb(229 231 235)',
            width: '100%',
            minWidth: '200px',
            border: 'none',
            boxShadow: isFocused ? 'none' : undefined,
            borderBottom: isFocused ? '2px solid  rgb(59 130 246)' : undefined,
        }),

        input: (styles) => ({ ...styles }),

    };
    return (
        <RSelect

            // components={{ IndicatorSeparator: null, DropdownIndicator: DropdownArrow }}
            // styles={{
            //     container: (provided, state) => {
            //         return {
            //             ...provided,
            //             marginTop: "5px",
            //         };
            //     },

            //     control: (provided, state) => {
            //         return {
            //             ...provided,
            //             border: "1px solid #ced4da",
            //             borderRadius: ".25rem",
            //         };
            //     },
            // }}
            placeholder={label}
            value={isMulti ? getMultiValues() : getSingleValue()}
            defaultValue={
                defaultValue ?? { value: "00", label: "انتخاب کنید", isOptionDisable: true }
            }
            styles={colourStyles}
            options={options?.length ? options : []}
            noOptionsMessage={({ inputValue }) => "موردی یافت نشد!"}
            isMulti={isMulti}
            {...rest}
        />
    );
};




const FormikReactSelect = (props) => {
    const [field, meta] = useField(props);
    const { mandatory, name, onBlur, onChange, value, ...rest } = props;
    const { setFieldValue } = useFormikContext();


    const getSingleValue = () => {
        return props.defaultValue && props.options && props.options?.find((item) => item.value == props.defaultValue._id);
    };

    return (
        <>

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
            {meta.error && meta.touched && <p className="w-full pr-2 -mt-3 text-sm font-light text-red-400 focus:ring-0 ">{meta.error}</p>}

        </>
    );
};





export default FormikReactSelect;