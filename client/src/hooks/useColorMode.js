import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage('color-mode', 'light');


    useEffect(() => {
        const className = 'dark';
        const bodyClasses = window.document.body.classList;
        try {
            colorMode === 'dark' ? bodyClasses.add(className) : bodyClasses.remove(className);

        } catch (err) {
            console.log(err)
        }
    }, [colorMode])

    return [colorMode, setColorMode]


}

export default useColorMode;