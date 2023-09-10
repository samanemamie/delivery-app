import { useContext } from 'react'


//
import { Button } from '../Button';



//
import { statusCard } from '../../../components/Providers';
import usePricingAndBearerData from '../../../hooks/useFetch';
import useFetchParcelImg from '../../../hooks/useFetchImg';
import Spiner from '../Spiner';





function CardParsels() {

    const { bearerParcelsData, loading, error } = usePricingAndBearerData("bearerParcels")


    console.log(bearerParcelsData, "bearerParcelsData")

    const handleSubmit = (item) => {
        console.log(item, "item")
        setCardParselsStatus(false)
        setCardTransportStatus(true)
    }

    const { cardParselsStatus, setCardParselsStatus, setCardTransportStatus } = useContext(statusCard)
    // console.log(bearerParcelsData, "bearerParcelsData")


    // const data = [
    //     {
    //         src: '/img/envelope.png',
    //         size: 'Envelope',
    //         detail1: '0.1 - 1.5 kg - Max',
    //         detail2: '434 * 27 * 4 cm Max'
    //     },
    //     {
    //         src: '/img/smallbox.png',
    //         size: 'Envelope',
    //         detail1: '0.1 - 1.5 kg - Max',
    //         detail2: '434 * 27 * 4 cm Max'
    //     },
    //     {
    //         src: '/img/envelope.png',
    //         size: 'Envelope',
    //         detail1: '0.1 - 1.5 kg - Max',
    //         detail2: '434 * 27 * 4 cm Max'
    //     }
    // ]



    return (
        <>

            <div className="w-full min-h-[120px] max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="space-y-3 text-gray-400">
                    <div className='flex items-center justify-between text-base font-normal'>
                        <p className=" dark:text-white">
                            Parsels's Type
                        </p>
                        <p className="cursor-pointer dark:text-white">
                            {
                                cardParselsStatus ? ("Clear") : <span onClick={() => setCardParselsStatus(true)} >Edit</span>
                            }
                        </p>
                    </div>

                    {

                        <div className={`${cardParselsStatus ? 'block' : 'hidden'} px-3 pt-2`}>

                            <div className='px-3 py-3'>
                                {
                                    cardParselsStatus &&
                                        bearerParcelsData && loading ?
                                        (
                                            <div className='w-full px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700'>
                                                <Spiner />
                                            </div>
                                        )
                                        :
                                        bearerParcelsData.map((item, index) => {
                                            return (
                                                <div key={index} className='w-full px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-sm shadow hover:bg-blue-500 dark:bg-gray-800 dark:border-gray-700'>
                                                    <div className='flex items-center justify-between '>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='px-1 bg-gray-300 '>

                                                                <img src={item.url} alt="Parcel" className='px-3 py-3 w-14 h-14' />
                                                            </div>
                                                            <div>{item.parcel_type}</div>

                                                        </div>

                                                        <div className='flex flex-col items-center gap-1 text-xs'>
                                                            <div className='flex items-center gap-1'>
                                                                <p>{item.parcel_min_weight}</p>
                                                                <p> -</p>
                                                                <p>{item.parcel_max_weight}</p>
                                                                <p>km</p>
                                                                <p>max</p>
                                                            </div>
                                                            <div className='flex items-center gap-2'>
                                                                <p>{item.parcel_description}</p>

                                                                <p>max</p>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })

                                }

                            </div>

                            <div className='flex items-center justify-center' >
                                <Button onClick={() => handleSubmit(item)} className="w-1/2" variant='map' size='lg' >
                                    Confirm
                                </Button>

                            </div>
                        </div>



                    }
                </div>

            </div>

        </>
    )
}

export default CardParsels