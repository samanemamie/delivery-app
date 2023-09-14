import { useContext, useEffect, useState } from 'react'


//
import { Button } from '../Button';
import Spiner from '../Spiner';



//
import { statusCard } from '../../../components/Providers';


//
import usePricingAndBearerData from '../../../hooks/useFetch';




function CardParsels() {


    const [items, setItems] = useState()

    const [data, setData] = useState([])


    const { cardParselsStatus, setCardParselsStatus, setCardTransportStatus, setTransportData } = useContext(statusCard)

    const { bearerParcelsData, loading, error } = usePricingAndBearerData("bearerParcels");





    const handleSubmit = (items) => {
        setData({ src: items.item.url, name: items.item.parcel_type })
        setTransportData(items.item)
        setCardParselsStatus(false)
        setCardTransportStatus(true)
    }



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
                                cardParselsStatus ? ("Clear") : <span onClick={() => setCardParselsStatus(bearerParcelsData.length != 0 && true)} >Edit</span>
                            }
                        </p>
                    </div>

                    {

                        cardParselsStatus ?
                            <div className={`${cardParselsStatus ? 'block' : 'hidden'} px-3 pt-2`}>

                                <div className='px-3 py-3'>
                                    {

                                        loading ?
                                            (
                                                <div className='w-full px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700'>
                                                    <Spiner />
                                                </div>
                                            )
                                            :
                                            bearerParcelsData.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setItems({ item, index })
                                                        }}
                                                        className={`w-full px-5 py-3  border-b rounded-sm shadow hover:bg-blue-500 focus:bg-blue-500 dark:bg-gray-800 dark:border-gray-700 ${items?.index === index ? "!bg-blue-500" : '!bg-gray-100'}`}
                                                    >
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
                                    <Button onClick={() => handleSubmit(items)} className="w-1/2" variant='map' size='lg' >
                                        Confirm
                                    </Button>

                                </div>
                            </div>

                            :
                            <div className='px-3 pt-3'>
                                {
                                    data.length != 0 ?
                                        <div className='flex items-center justify-start gap-2'>
                                            <img className='w-8 h-6' src={data.src} />
                                            <p>{data.name}</p>
                                        </div>
                                        :
                                        null
                                }
                            </div>

                    }
                </div>

            </div>

        </>
    )
}

export default CardParsels