import * as yup from "yup";


export const advancedSchema = yup.object().shape({
    address: yup.string().required("Pleas Wright Address Number"),
    moreDetails: yup.string().required("Pleas Wright Address Number"),
    phoneNumber: yup.string().required("Pleas Wright Address Number"),
    sendersName: yup.string().required("Pleas Wright Address Number"),
});
