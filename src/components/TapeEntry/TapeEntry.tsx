import React from 'react';

interface TapeEntryProps {
    x1:number;
    y1:number;
    textRef: React.MutableRefObject<SVGTextElement|null>;
}

function TapeEntry({textRef, x1, y1 }:TapeEntryProps) {
    const length = 50;

    return <>
        <rect x={x1} y={y1} width={length} height={length} fill='transparent'></rect>
        <line x1={x1+5} y1={y1+40} x2={x1-5+length} y2={y1+40} stroke='black' strokeWidth={2}></line>
        <text ref={textRef} x={x1+25} y={y1+30} dominantBaseline="middle" textAnchor="middle"></text>
    </>;
}

export default TapeEntry;