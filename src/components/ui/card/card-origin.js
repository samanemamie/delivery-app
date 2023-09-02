import { useContext } from 'react'
import FormikReactSelect from '../form/formik-react-select'
import { Form, Formik } from "formik";
import Icons from '../Icons';
import FormikInput from '../form/formik-input';
import { Button } from '../Button';

import { statusCard } from '../../../components/Providers';
import { advancedSchema } from '../../../lib/validations';

const feedingSystem = [
    { value: 1, label: "sam" },
    { value: 2, label: "mil" },
    { value: 3, label: "jav" },];

const feedingSystem2 = [
    { value: "manual", key: "Confirmation Code", id: "1" },
    { value: "chain", key: "Note Needed", id: "2" },

];



function CardOrigin() {
    const { cardOriginStatus, setCardOriginStatus, setCardDestinationStatus } = useContext(statusCard)

    console.log(cardOriginStatus, "cardOriginStatus")

    console.log(cardOriginStatus, "cardOriginStatus")

    const onSubmitForm = async (values, onSubmitProps) => {
        console.log(values, "values")
        setCardOriginStatus(false)
        setCardDestinationStatus(true)
    }


    return (
        <>

            <div className="w-full max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <Formik
                    initialValues={{
                        address: "",
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
                                                cardOriginStatus ? ("Clear") : <span onClick={() => setCardOriginStatus(true)} >Edit</span>
                                            }

                                        </p>
                                    </div>

                                    {
                                        cardOriginStatus ?

                                            <>
                                                <div className="space-y-3 "

                                                >
                                                    <FormikReactSelect
                                                        name="address"
                                                        options={feedingSystem}
                                                        label={'salam'}
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