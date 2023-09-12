import * as yup from "yup";


export const cardOriginSchema = yup.object().shape({
    originAddress: yup.string().required("Pleas Wright Address "),
    moreDetails: yup.string().required("Pleas Wright moreDetails"),
    phoneNumber: yup.string().required("Pleas Wright phoneNumber"),
    sendersName: yup.string().required("Pleas Wright sendersName"),
});

export const cardDestinationSchema = yup.object().shape({
    destinationAddress: yup.string().required("Pleas Wright Address "),
    moreDetails: yup.string().required("Pleas Wright moreDetails"),
    phoneNumber: yup.string().required("Pleas Wright phoneNumber"),
    recipientName: yup.string().required("Pleas Wright recipientName"),
    delevery_approval: yup.string()
        .required("Please select an option")
        .oneOf(["confirmation", "note"], "Please select an option"),
});

