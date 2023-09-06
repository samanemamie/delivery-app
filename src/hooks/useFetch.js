import { useState } from "react"

export const useFetch = (address) => {
    const [state, setState] = useState(address)
    const togle = () => {
        console.log(state, "state")
    }

    return [togle]
}