import * as yup from "yup";


export const advancedSchema = yup.object().shape({
    test: yup
        .string()

        .required("Pleas Wright Address Number"),


});
