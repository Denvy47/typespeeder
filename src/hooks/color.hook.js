import {useCallback} from 'react'

export const useColor = () => {
    const color = useCallback ((elemNum) => {
        const selector = '.letter-' + elemNum
        const elem = document.querySelector(selector)
        elem.classList.add('cyan-text')
    }, [])

    return {color}
}