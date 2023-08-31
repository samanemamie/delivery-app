import { useTheme } from "next-themes";
import { Button } from "../components/ui/Button";
import { Toast, toast } from "../components/ui/toast";
import { Field, Form, Formik } from "formik";


import FormikInput from "../components/ui/form/formik-input";
import { advancedSchema } from "../lib/validations";
import FormikReactSelect from "../components/ui/form/formik-react-select";
import FormikRadioButtons from "../components/ui/form/formik-radio-buttons";



const feedingSystem = [
  { value: 1, label: "sam" },
  { value: 2, label: "mil" },
  { value: 3, label: "jav" },];

const feedingSystem2 = [
  { value: "manual", key: "Confirmation Code", id: "1" },
  { value: "chain", key: "Note Needed", id: "2" },

];


export default function Home() {
  const { setTheme } = useTheme()
  return (
    <div>
      <Button size='lg' variant='outline' className='mt-10' onClick={() => {
        toast({
          title: 'Error signing out',
          message: 'Please try again later.',
          type: 'error',
        })
        setTheme('light')
      }}>sam</Button>

      <Formik
        initialValues={{

        }}
        validationSchema={advancedSchema}
      // onSubmit={onSubmitForm}
      >
        {(props) => {
          return (
            <>

              <Form
                onSubmit={props.handleSubmit}
                className=""
              >
                <div className="flex items-center w-full gap-5">
                  <FormikInput
                    label="Phone Number"
                    name="test"
                  />
                  <FormikInput
                    label="po"
                    name="po"
                  />
                </div>
                <FormikReactSelect
                  label="شهر"
                  name="province"
                  options={feedingSystem}
                  mandatory={true}
                // isMulti={true}
                />
                <div className="flex items-center gap-5">
                  <FormikRadioButtons
                    label="ثبت آگهی به عنوان"
                    name="is_seller"
                    options={feedingSystem2}
                  />
                </div>





              </Form>



            </>
          );
        }}
      </Formik>




      {/* 
      <p className="text-red-500">salam</p>
      <Button size='sm' variant='subtle' className='mt-96 ' onClick={() => setTheme('dark')}>xczcxz</Button> */}

    </div >
  )
}
