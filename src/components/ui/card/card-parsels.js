import { useContext } from 'react'


//
import { Button } from '../Button';
import { statusCard } from '../../../components/Providers';





function CardParsels() {

    const handleSubmit = () => {
        setCardParselsStatus(false)
        setCardTransportStatus(true)
    }

    const { cardParselsStatus, setCardParselsStatus, setCardTransportStatus } = useContext(statusCard)

    const data = [
        {
            src: '/img/envelope.png',
            size: 'Envelope',
            detail1: '0.1 - 1.5 kg - Max',
            detail2: '434 * 27 * 4 cm Max'
        },
        {
            src: '/img/smallbox.png',
            size: 'Envelope',
            detail1: '0.1 - 1.5 kg - Max',
            detail2: '434 * 27 * 4 cm Max'
        },
        {
            src: '/img/envelope.png',
            size: 'Envelope',
            detail1: '0.1 - 1.5 kg - Max',
            detail2: '434 * 27 * 4 cm Max'
        }
    ]

    return (
        <>

            <div className="w-full max-w-full px-3 py-3 bg-white border-b-2 border-gray-300 rounded-md shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
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
                        cardParselsStatus ?
                            <>

                                <div className='px-3 pt-2 '>
                                    {
                                        data.map((item, index) => {

                                            return (
                                                <div key={index} className='w-full px-5 py-3 bg-gray-100 border-b border-gray-300 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700'>
                                                    <div className='flex items-center justify-between '>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='px-1 bg-gray-300 '>
                                                                <img className='w-14 h-fit' src={item.src} />
                                                            </div>
                                                            <div>{item.size}</div>

                                                        </div>

                                                        <div className='flex flex-col items-center gap-1 text-xs'>
                                                            <p>{item.detail1}</p>
                                                            <p>{item.detail2}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div className='flex items-center justify-center' >
                                    <Button onClick={() => handleSubmit()} className="w-1/2" variant='map' size='lg' >
                                        Confirm
                                    </Button>

                                </div>
                            </>
                            :
                            <p>sdsadd</p>

                    }
                </div>

            </div>

        </>
    )
}

export default CardParsels