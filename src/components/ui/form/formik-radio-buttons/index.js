import { useField, Field } from "formik";

import React from "react";

const FormikRadioButtons = (props) => {

    const [field, meta] = useField(props);
    const { isdifrent, mandatory, label, name, options, ...rest } = props


    return (
        <>
            <Field
                name={name}
                {...rest}
                className={meta.touched && meta.error ? "input-error" : "text-gray-200"}
            >
                {
                    ({ field }) => {
                        return options.map(option => {
                            return (
                                < div key={option.key}>
                                    <div className="flex items-center gap-3 ">
                                        <input
                                            type="radio"
                                            id={option.value}
                                            {...field}
                                            value={option.value}
                                            checked={field.value === option.value}
                                            className={meta.touched && meta.error ? "w-[18px] h-[18px]" : "w-[18px] h-[18px] text-gray-200"}
                                        />
                                        <label className="text-sm font-normal text-gray-400" htmlFor={option.value}>{option.key}</label>
                                    </div>
                                    {meta.touched && meta.error && <div className="mt-5 text-sm text-red-400 justify-self-start md:mt-0">{meta.error}</div>}

                                </div>
                            )
                        })
                    }
                }
            </Field>


        </>
    );
};
export default FormikRadioButtons;