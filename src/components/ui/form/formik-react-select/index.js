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
            <div className="flex flex-col gap-5">
                <div
                    className={
                        'text-right w-full    ' +
                        (mandatory ? 'flex justify-start items-center gap-2' : '')
                    }
                >
                    {
                        mandatory ?
                            <p className='h-5 text-base font-bold text-red-600'>*</p>
                            :
                            null
                    }
                    <label className="">{props.label}</label>
                </div>
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
                {meta.error && meta.touched && <p className="w-full pr-2 -mt-3 text-sm font-light text-red-400 ">{meta.error}</p>}
            </div>
        </>
    );
};





export default FormikReactSelect;