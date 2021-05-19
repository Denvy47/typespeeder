import 'materialize-css';
import {InputCounter} from "./components/InputCounter";
import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "./hooks/http.hook";
import {PercentValidInputCounter} from "./components/PercentValidInputCounter";
import {TextField} from "./components/TextField";
import {useColor} from "./hooks/color.hook";



function App() {
    const {request} = useHttp()
    const [text, setText] = useState([])

    const fetchText = useCallback(async () => {
        try {
            const fetchedText = await request('https://baconipsum.com/api/?type=meat-and-filler')
            setText(fetchedText)
        } catch (e) {
            throw e
        }
    }, [request])

    useEffect(()=> {
        fetchText()
    }, [fetchText])


    let count = 0
    let validCount = 0
    let invalidCount = 0
    const [counter, setCounter] = useState(count)
    const [validCounter, setValidCounter] = useState(validCount)
    const [invalidCounter, setInvalidCounter] = useState(invalidCount)

    const {color} = useColor()

    const keyPressHandler = useCallback((e) => {
        const isCharacter = /[.,\sA-Z]/gi.test(e.key)
        const keys = ['Enter', 'Meta', 'Shift', 'Alt', 'Control', 'Tab', 'CapsLock']

        if (isCharacter && !keys.includes(e.key) && text.length !== 0) {
            setCounter(++count)

            if (text.toString()[validCount] === e.key) {
                color(validCount)
                setValidCounter(++validCount)
            } else {
                setInvalidCounter(++invalidCount)
            }
        }
    }, [count, validCount, invalidCount, text, color])

    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler);
    },[keyPressHandler]);

    return (
        <div className='container'>
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <div className='card-title orange-text row'>
                            <div className='col xl6 left-align'>
                                <InputCounter value={validCounter}/>
                            </div>
                            <div className='col xl6 right-align'>
                                <PercentValidInputCounter text={text} invalidCount={invalidCounter}/>
                            </div>
                        </div>
                        <div className='card-title orange-text row'>
                            <div className='col xl6 left-align'>
                                <p>Mistakes: {invalidCounter}</p>
                            </div>
                            <div className='col xl6 right-align'>
                                <p>Overall symbols: {counter}</p>
                            </div>
                        </div>
                        <TextField text={text}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
