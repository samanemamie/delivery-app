import { useContext } from 'react'


//
import Icons from '../Icons';
import { Button } from '../Button';


//
import { statusCard } from '../../../components/Providers';



//
import useFetchFunction from '../../../hooks/useFetchFunction';
import Spiner from '../Spiner';



function CardTransport() {



    const {
        cardTransportStatus,
        setCardTransportStatus,
        transportData,
        originlatLng,
        destinationlatLng,
    } = useContext(statusCard)

    const { pricingResult, loading, error } = useFetchFunction(originlatLng, destinationlatLng, transportData);


    console.log(pricingResult, "pricingResult")



    const data = [
        {
            src: '/img/motor.png',
            detail1: '0.1 - 1.5 kg - Max',
            detail2: '13-18 min'
        },
        {
            src: '/img/walk1.png',

            detail1: '0.1 - 1.5 kg - Max',
            detail2: '13-18 min'
        },
        {
            src: '/img/bike.png',

            detail1: '0.1 - 1.5 kg - Max',
            detail2: '13-18 min'
        }
    ]

    return (
        <>

            <div className="w-full max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-3 text-gray-400">

                    <div className='flex items-center justify-between text-base font-normal'>
                        <p className="inline-flex items-center gap-2 dark:text-white">
                            <span>Transporter Option</span>
                            <Icons.HelpCircle color="rgb(209 213 219)" size={20} />
                        </p>
                        <p className="cursor-pointer dark:text-white">
                            {
                                cardTransportStatus ? ("Clear") : <span onClick={() => setCardTransportStatus(pricingResult.length != 0 && true)} >Edit</span>
                            }
                        </p>
                    </div>

                    {
                        cardTransportStatus ?
                            <>
                                <div className='flex gap-3 px-3 pt-2'>


                                    {
                                        loading ?

                                            <div className='w-full px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700'>
                                                <Spiner />
                                            </div>
                                            :
                                            pricingResult.map((item, index) => {

                                                console.log(item, "item")

                                                return (

                                                    <div key={index} className='flex flex-col items-center justify-center w-full py-3 bg-gray-100 rounded-sm shadow hover:bg-blue-500 dark:bg-gray-800 dark:border-gray-700'>
                                                        <div>
                                                            <img className='w-14 h-fit' src={item.src} />
                                                        </div>
                                                        <div>
                                                            <p>{item.price}</p>
                                                        </div>
                                                        <div>
                                                            <p>{item.time}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                    }



                                </div>
                                <div className='flex items-center justify-center' >
                                    <Button className="w-1/2" variant='map' size='lg' >
                                        Confirm
                                    </Button>

                                </div>
                            </>
                            :
                            <p>
                                asdasdd
                            </p>
                    }

                </div>


            </div>

        </>
    )

}
export default CardTransport