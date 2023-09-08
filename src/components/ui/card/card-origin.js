import { useContext } from 'react'
import { Form, Formik } from "formik";



//
import FormikSelect from '../form/formik-select'
import FormikInput from '../form/formik-input';
import { advancedSchema } from '../../../lib/validations';



//
import Icons from '../Icons';
import { Button } from '../Button';



//
import { statusCard } from '../../../components/Providers';






function CardOrigin({ panTo }) {

    const { cardOriginStatus, setCardOriginStatus, setCardDestinationStatus } = useContext(statusCard)



    const onSubmitForm = async (values, onSubmitProps) => {

        setCardOriginStatus(false)
        setCardDestinationStatus(true)

        console.log(values, "values")
    }


    return (
        <>

            <div className="w-full max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <Formik
                    initialValues={{
                        originAddress: "",
                        moreDetails: "",
                        phoneNumber: "",
                        sendersName: "",
                    }}
                    // validationSchema={advancedSchema}
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
                                        <p className="inline-flex items-center dark:text-white">
                                            <Icons.MapPin color="blue" size={20} />
                                            <span>Origin</span>
                                        </p>
                                        <p className="cursor-pointer dark:text-white">
                                            {
                                                cardOriginStatus ? < span onClick={() => props.resetForm()} >Clear</span> : <span onClick={() => setCardOriginStatus(true)} >Edit</span>
                                            }

                                        </p>
                                    </div>

                                    {
                                        cardOriginStatus ?

                                            <>
                                                <div className="space-y-3 "

                                                >
                                                    <FormikSelect
                                                        name="originAddress"
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
                                                            label="Senders Name"
                                                            name="sendersName"
                                                        />
                                                    </div>
                                                    <div className='flex items-center gap-2 pt-5' >
                                                        <Button type={"button"} variant='map' size='lg' >
                                                            Choose from Favourites
                                                        </Button>
                                                        <Button type={"submit"} variant='map' size='lg'>
                                                            Confirm Origin
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>

                                            :
                                            <p className='px-3'>sadsadsas</p>

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

export default CardOrigin