import { useState } from "react"

export const useSessionStorage = (key, defaultValue) => {
    const data = sessionStorage.getItem(key)
    const [state, setState] = useState(data ? JSON.parse(data) : defaultValue)

    sessionStorage.setItem(key, JSON.stringify(state))

    return [state, setState]
}