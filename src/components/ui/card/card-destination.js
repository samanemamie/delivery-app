import { useContext, useState } from 'react'




//
import { Form, Formik } from "formik";
import FormikInput from '../form/formik-input';
import FormikSelect from '../form/formik-select'
import FormikRadioButtons from '../form/formik-radio-buttons';
import { cardDestinationSchema } from '../../../lib/validations';



//
import { Button } from '../Button';
import Icons from '../Icons';



//
import { statusCard } from '../../../components/Providers';





const radioOptions = [
    { value: "confirmation", key: "Confirmation Code", id: "1" },
    { value: "note", key: "Note Needed", id: "2" },

];



function CardDestination({ panTo }) {

    const { cardDestinationStatus, setCardDestinationStatus, setCardParselsStatus, destinationlatLng } = useContext(statusCard)


    const [address, setAddress] = useState()

    const onSubmitForm = async (values) => {
        setAddress(values.destinationAddress)
        setCardDestinationStatus(false)
        setCardParselsStatus(true)
    }


    return (
        <>

            <div className="w-full max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <Formik
                    initialValues={{
                        address: "",
                        moreDetails: "",
                        phoneNumber: "",
                        recipientName: "",
                        delevery_approval: "",
                    }}
                    validationSchema={cardDestinationSchema}
                    onSubmit={onSubmitForm}
                >
                    {(props) => {
                        return (
                            <>

                                <Form
                                    onSubmit={props.handleSubmit}
                                    className="space-y-3 text-gray-400 min-h-[70px]"
                                >

                                    <div className='flex items-center justify-between text-base font-normal'>

                                        <p className="inline-flex items-center gap-1 dark:text-white">
                                            <Icons.GitFork color="blue" size={20} />
                                            <span>Destination</span>
                                        </p>

                                        <p className="cursor-pointer dark:text-white">
                                            {
                                                cardDestinationStatus ? ("Clear") : <span onClick={() => setCardDestinationStatus(destinationlatLng.length != 0 && true)} >Edit</span>
                                            }
                                        </p>
                                    </div>

                                    {

                                        cardDestinationStatus ?
                                            <>
                                                <div className="space-y-3 "
                                                >
                                                    <FormikSelect
                                                        name="destinationAddress"
                                                        label="Address"
                                                        placeholder={"Address"}
                                                        panTo={panTo}
                                                    />

                                                    <FormikInput
                                                        label="More Details / Message for the Rider"
                                                        name="moreDetails"
                                                    />
                                                    <div className='flex items-center gap-2'>
                                                        <FormikInput
                                                            label="Phone Number"
                                                            name="phoneNumber"
                                                        />
                                                        <FormikInput
                                                            label="Recipient Name"
                                                            name="recipientName"
                                                        />
                                                    </div>
                                                    <p className='text-sm'>Delevery Approval by :</p>

                                                    <div className='flex items-center gap-[105px] pt-2'>
                                                        <FormikRadioButtons
                                                            name="delevery_approval"
                                                            options={radioOptions}

                                                        />
                                                    </div>
                                                    <div className='flex items-center gap-2 pt-5' >
                                                        <Button variant='map' size='lg' >
                                                            Choose from Favourites
                                                        </Button>
                                                        <Button type={"submit"} variant='map' size='lg'>
                                                            Confirm Origin
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                            :

                                            <p className='w-4/5 px-3 pt-3 '>
                                                {address ? address : null}
                                            </p>
                                    }




                                </Form>



                            </>
                        );
                    }}
                </Formik>


            </div>

        </>
    )
}

export default CardDestination