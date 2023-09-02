import { useField } from "formik";

const FormikInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <div className="relative h-14 rounded-sm  bg-gray-200 w-full  min-w-[200px]">
                <input
                    {...field}
                    {...props}
                    className={`peer h-full w-full ${meta.touched && meta.error ? "border-b border-red-500 focus:border-b-2 focus:border-red-500 focus:after:border-red-500 " : "border-b-2 border-gray-400 focus:border-b-2 focus:border-blue-500 focus:after:border-blue-500 "} px-3  bg-transparent pt-4 pb-1.5 font-sans text-base font-normal text-gray-600 outline outline-0 transition-all  focus:outline-0 `}
                    placeholder=" "
                />
                <label className={`after:content[' '] ${meta.touched && meta.error ? " peer-focus:text-red-500 text-red-500" : " text-gray-400 peer-focus:text-blue-500"} pointer-events-none absolute px-3 -mt-[55px] flex h-full w-full select-none  text-base font-normal leading-tight text-gray-400 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0  after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:after:scale-x-100  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500`}>
                    {label}
                </label>
                {meta.touched && meta.error && <p className="mt-2 text-xs font-normal text-center text-red-500">{meta.error}</p>}

            </div>
        </>
    );
};
export default FormikInput;