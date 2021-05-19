import React from "react";
import {Letter} from "./Letter";

export const TextField = ({text}) => {
    const textToRender = text.toString().split('').map((value, index) => {
        return <Letter key={index} value={value} cls={'letter-' + index}/>
    })

    return (
        <div>
            {textToRender}
        </div>
    )
}