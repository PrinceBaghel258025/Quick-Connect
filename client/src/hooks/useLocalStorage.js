import { useState, useEffect } from "react";

const useLocalStorage = ({ key='color-mode', value='light' }) => {
    console.log(key);
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const state = window.localStorage.getItem(key);
            return state ? JSON.parse(state) : value;
        } catch (err) {
            return value;
        }

    })

    useEffect(() => {
        try {
            const valueToStore = typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (err) {
            console.log(err);
        }
    }, [key, storedValue])
    return [storedValue, setStoredValue]

}

export default useLocalStorage;