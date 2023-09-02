import { useContext } from 'react'
import FormikReactSelect from '../form/formik-react-select'
import { Form, Formik } from "formik";
import Icons from '../Icons';
import FormikInput from '../form/formik-input';
import { Button } from '../Button';

import { statusCard } from '../../../components/Providers';
import { advancedSchema } from '../../../lib/validations';
import FormikRadioButtons from '../form/formik-radio-buttons';

const feedingSystem = [
    { value: 1, label: "sam" },
    { value: 2, label: "mil" },
    { value: 3, label: "jav" },];

const feedingSystem2 = [
    { value: "manual", key: "Confirmation Code", id: "1" },
    { value: "chain", key: "Note Needed", id: "2" },

];



function CardDestination() {

    const { cardDestinationStatus, setCardDestinationStatus, setCardParselsStatus } = useContext(statusCard)

    const onSubmitForm = async (values, onSubmitProps) => {
        console.log(values, "values")
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

                                        <p className="inline-flex items-center gap-1 dark:text-white">
                                            <Icons.GitFork color="blue" size={20} />
                                            <span>Destination</span>
                                        </p>

                                        <p className="cursor-pointer dark:text-white">
                                            {
                                                cardDestinationStatus ? ("Clear") : <span onClick={() => setCardDestinationStatus(true)} >Edit</span>
                                            }
                                        </p>
                                    </div>

                                    {

                                        cardDestinationStatus ?
                                            <>
                                                <div className="space-y-3 "
                                                >
                                                    <FormikReactSelect
                                                        name="address"
                                                        options={feedingSystem}
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
                                                        <FormikRadioButtons label=" سیستم پرورش"
                                                            name="breeding_system"
                                                            options={feedingSystem2}

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
                                            <p>sdsdasd</p>
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