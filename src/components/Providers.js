import { ThemeProvider } from 'next-themes'

import { createContext, useState } from "react"


export const statusCard = createContext()


const Providers = ({ children }) => {

    const [cardOriginStatus, setCardOriginStatus] = useState(true)
    const [cardDestinationStatus, setCardDestinationStatus] = useState(false)
    const [cardParselsStatus, setCardParselsStatus] = useState(false)
    const [cardTransportStatus, setCardTransportStatus] = useState(false)


    const [originlatLng, setOriginlatLng] = useState([])
    const [destinationlatLng, setDestinationlatLng] = useState([])


    const [transportData, setTransportData] = useState([])







    return (
        <statusCard.Provider value={{
            cardOriginStatus, setCardOriginStatus,
            cardDestinationStatus, setCardDestinationStatus,
            cardParselsStatus, setCardParselsStatus,
            cardTransportStatus, setCardTransportStatus,

            originlatLng, setOriginlatLng,
            destinationlatLng, setDestinationlatLng,

            transportData, setTransportData
        }}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                {children}
            </ThemeProvider>
        </statusCard.Provider>
    )
}

export default Providers