import { ThemeProvider } from 'next-themes'

import { createContext, useState } from "react"


export const statusCard = createContext()

const Providers = ({ children }) => {
    const [newCard, setNewCard] = useState(false)
    return (
        <statusCard.Provider value={{ newCard, setNewCard }}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                {children}
            </ThemeProvider>
        </statusCard.Provider>
    )
}

export default Providers