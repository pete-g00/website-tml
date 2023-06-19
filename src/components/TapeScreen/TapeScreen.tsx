import React, { useEffect, useRef, useState, useContext } from 'react';
import TapeEntry from '../TapeEntry/TapeEntry';
import * as d3 from 'd3';
import { Button } from '@mui/material';
import { TMExecutor, Direction, TerminationState, CodeExecutor } from 'parser-tml';
import './TapeScreen.css';
import { HomePageConfigContext } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';

type TileAnimation = d3.Transition<SVGGElement | null, unknown, null, undefined>;

interface ValuePair<T>{
    i:number;
    val:T;
}

function getPreviousOffsetIndex(i:number) {
    return i === 0 ? 16 : i-1;
}

function getNextOffsetIndex(i:number) {
    return i === 16 ? 0 : i+1;
}

interface TapeScreenProps {
    tapeValue:string;
    setTapeExecutionMessage: (msg:string) => void;
}

function TapeScreen({ tapeValue, setTapeExecutionMessage }:TapeScreenProps) {
    const homePageConfig = useContext(HomePageConfigContext);
    const { transitionTime } = useContext(UserConfigContext);

    const length = 17;
    const tmExecutor = new TMExecutor(tapeValue, homePageConfig.tapePanelTM!);
    const tmpExecutor = new CodeExecutor(tapeValue, homePageConfig.tapePanelProgram!);

    const tiles = useRef(
        Array(17).fill("").map((_, i) => tapeValue[i-2]?.trim() ?? "")
    );
    const tapeHeadIndex = useRef(2);
    const [canGoBack, setCanGoBack] = useState(true);
    const [canStep, setCanStep] = useState(true);
    const [canPlay, setCanPlay] = useState(true);
    const playing = useRef(false);
    const [playMessage, setPlayMessage] = useState<"Play"|"Pause">("Play");
   
    // keep track of the current translations
    const translations = useRef(new Array(length).fill(0));
    
    const tmExecutorRef = useRef(tmExecutor);
    const tmpExecutorRef = useRef(tmpExecutor);

    const gRefs:React.RefObject<SVGGElement>[] = [];
    const textRefs:React.RefObject<SVGTextElement>[] = [];
    
    for (let i=0; i<length; i++) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        gRefs[i] = useRef<SVGGElement>(null);
    }
    for (let i=0; i<length; i++) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        textRefs[i] = useRef<SVGTextElement>(null);
    }

    /**
     * In the tape tiles, changes the value at index i1 to va11 and the value at index i2 to val2.
     * Returns whether the original value at i1 matches the new value val1.
     */ 
    function changeValues(...values:ValuePair<string>[]) {
        for (let j=0; j<values.length; j++) {
            const {i, val} = values[j];
            textRefs[i].current!.textContent = val;
        }
    }
    
    /**
     * Moves the `g` element at index `i` corresponding to the `gRef` by (50*`sign`, 0) within the duration 
     */
    function moveEntry(i:number, sign:number, duration:number, animation?:TileAnimation) {
        animation ??= d3.select(gRefs[i].current).transition();
        translations.current[i] += 50 * sign;
        
        const nextAnimation = animation
            .transition()
            .duration(duration)
            .attr('transform', `translate(${translations.current[i]}, 0)`);

        return nextAnimation;
    }

    /**
     * Moves the element at index `i` to the end instantly. 
     *  
     * If an animation is provided, then chains this transition to the animation.
     * The next transition, if chained, happens after the provided duration
     */ 
    function moveTileToEnd(i:number, duration:number, animation?:TileAnimation|undefined) {
        animation ??= d3.select(gRefs[i].current).transition();
        translations.current[i] = (length - 1 - i)*50;
        // console.log(`Moving tile ${i} to the end with value ${translations.current[i]}`);
        
        return animation
            .transition()
            .duration(0)
            .attr('transform', `translate(${translations.current[i]}, 0)`)
            .delay(duration);
    }

    /**
     * Moves the element at index `i` to the start instantly. 
     *  
     * If an animation is provided, then chains this transition to the animation
     * The next transition, if chained, happens after the provided duration
     */ 
    function moveTileToStart(i:number, duration:number, animation?:TileAnimation|undefined) {
        animation ??= d3.select(gRefs[i].current).transition();
        translations.current[i] = -i*50;
        // console.log(`Moving tile ${i} to the start with value ${translations.current[i]}`);

        return animation
            .transition()
            .duration(0)
            .attr('transform', `translate(${translations.current[i]}, 0)`)
            .delay(duration);
    }

    /**
     * Changes the tape value at the tapehead index with the value, 
     * along with the extreme right value (which shall get moved to the extreme left during transition)
     */
    function moveTapeRight(tapeIndex:number, indexOffset=0, value?:ValuePair<string>) {
        // the leftmost tile is 2 behind the current tape index 
        const leftMostTile = getPreviousOffsetIndex(getPreviousOffsetIndex(tapeIndex));
        // relative to tape being centered at this point (i.e. 0 = tapehead index), 
        // the right most index is length-2, adding some index offset (for move start/end)
        const rightMostIndex = (length-2)+indexOffset; 
        const rightMostValue = tmExecutorRef.current.tape.get(rightMostIndex);
        // console.log(`Setting tile[${leftMostTile}] to be tape[${rightMostIndex}]="${rightMostValue}"`);
        
        if (value === undefined) {
            changeValues({i: leftMostTile, val: rightMostValue});
        } else {
            changeValues({i: leftMostTile, val: rightMostValue}, value);
        }
    }

    /**
     * Changes the tape value at the tapehead index with the value, 
     * along with the extreme left value (which shall get moved to the extreme right during transition)
     */
    function moveTapeLeft(tapeIndex:number, indexOffset=0, value?:ValuePair<string>) {
        // the rightmost tile is 3 behind the current tapehead index (after wrapping)
        const rightMostTile = getPreviousOffsetIndex(getPreviousOffsetIndex(getPreviousOffsetIndex(tapeIndex)));
        // relative to tape being centered at this point (i.e. 0 = tapehead index), 
        // the left most index is -3 adding some index offset (for move start/end)
        const leftMostIndex = -3-indexOffset; 
        const leftMostValue = tmExecutorRef.current.tape.get(leftMostIndex);
        // console.log(`Setting tile[${rightMostTile}] to be tape[${leftMostIndex}]="${leftMostValue}"`);
        
        if (value === undefined) {
            changeValues({i: rightMostTile, val: leftMostValue});   
        } else {
            changeValues({i: rightMostTile, val: leftMostValue}, value);
        }
    }

    function afterTransition(nextOffset:number) {
        tapeHeadIndex.current = nextOffset;
        
        tmExecutorRef.current.execute();
        homePageConfig.dispatch({type: 'SET_CURRENT_STATE', state: tmExecutorRef.current.currentState});
        const terminated = tmExecutorRef.current.terminationStatus !== undefined;

        if (terminated) {
            playing.current = false;
            setCanStep(false);
            setCanPlay(false);
            setCanGoBack(true);
        } else if (!playing.current) {
            setCanStep(true);
            setCanGoBack(true);
        }
    }

    // transitions the tiles entries to the right within the duration after the provided transition
    function transitionRight(tapeIndex:number, duration:number, onAnimationCompleted:(() => void)|undefined, animations?:TileAnimation[]) {
        animations ??= [];
        const nextOffset = getNextOffsetIndex(tapeIndex);
        const leftMostTile = getPreviousOffsetIndex(getPreviousOffsetIndex(tapeIndex));
        
        // move most entries to the left but the leftmost entry becomes the rightmost entry
        for (let j = 0; j < length; j++) {
            animations[j] = j === leftMostTile 
                ? moveTileToEnd(leftMostTile, duration, animations[j])
                : moveEntry(j, -1, duration, animations[j]);
        }
        
        animations[0].on("end", () => {
            afterTransition(nextOffset);
            if (onAnimationCompleted) {
                onAnimationCompleted();
            }
        });
     
        return nextOffset;
    }

    // transitions the tiles entries to the left within the duration after the provided animation
    function transitionLeft(tapeIndex:number, duration:number, onAnimationCompleted:(() => void)|undefined, animations?:TileAnimation[]) {
        animations ??= [];
        const nextOffset = getPreviousOffsetIndex(tapeIndex);
        const rightMostTile = getPreviousOffsetIndex(getPreviousOffsetIndex(nextOffset));

        // move most entries to the right but the rightmost entry becomes the leftmost entry
        for (let j = 0; j < length; j++) {
            animations[j] = j === rightMostTile 
                ? moveTileToStart(rightMostTile, duration, animations[j]) 
                : moveEntry(j, 1, duration, animations[j]);
        }

        animations[0].on("end", () => {
            afterTransition(nextOffset);
            if (onAnimationCompleted) {
                onAnimationCompleted();
            }
        });
        
        return nextOffset;
    }

    function transitionEnd(currentValue:string, duration:number, idxOffset:number, onAnimationCompleted:(() => void)|undefined, ) {
        let nextOffset = tapeHeadIndex.current;
        const animations = Array(length).fill(undefined).map<TileAnimation>((_, i) => d3.select(gRefs[i].current).transition());
        
        // do the first transition (might involve changing a value)
        // idx offset != 0 => move to the right
        if (idxOffset !== 0) {
            moveTapeRight(tapeHeadIndex.current, 0, {i: tapeHeadIndex.current, val: currentValue});
            nextOffset = transitionRight(tapeHeadIndex.current, duration, undefined, animations);
        } 
        // length 0 => just change the value; no movement
        else {
            changeValues({i: tapeHeadIndex.current, val: currentValue});
        }

        for (let i=1; i<idxOffset; i++) {
            let tapeIndex = tapeHeadIndex.current;
            for (let j=0; j<i; j++) {
                tapeIndex = getNextOffsetIndex(tapeIndex);
            }
            animations[0].on("end", () => {
                moveTapeRight(tapeIndex, i);
            });
            nextOffset = transitionRight(tapeIndex, duration, undefined, animations);
        }

        animations[0].on("end", () => {
            afterTransition(nextOffset);
            if (onAnimationCompleted) {
                onAnimationCompleted();
            }
        });
    }

    function transitionStart(currentValue:string, duration:number, idxOffset:number, onAnimationCompleted:(() => void)|undefined) {
        let nextOffset = tapeHeadIndex.current;
        const animations = Array(length).fill(undefined).map<TileAnimation>((_, i) => d3.select(gRefs[i].current).transition());
        
        // do the first transition (might involve changing a value)
        // idx offset != 0 => move to the left
        if (idxOffset !== 0) {
            moveTapeLeft(tapeHeadIndex.current, 0, {i: tapeHeadIndex.current, val: currentValue});
            nextOffset = transitionLeft(tapeHeadIndex.current, duration, undefined, animations);
        } 
        // length 0 => just change the value; no movement
        else {
            changeValues({i: tapeHeadIndex.current, val: currentValue});
        }
        for (let i=1; i<idxOffset; i++) {
            let tapeIndex = tapeHeadIndex.current;
            for (let j=0; j<i; j++) {
                tapeIndex = getPreviousOffsetIndex(tapeIndex);
            }
            animations[0].on("end", () => {
                moveTapeLeft(tapeIndex, i);
            });
            nextOffset = transitionLeft(tapeIndex, duration, undefined, animations);
        }

        animations[0].on("end", () => {
            afterTransition(nextOffset);
            if (onAnimationCompleted) {
                onAnimationCompleted();
            }
        });
    }

    function getTerminationMessage() {
        if (tmpExecutorRef.current.terminationStatus === TerminationState.ACCEPT) {
            return "; Tape Accepted";
        } else if (tmExecutorRef.current.terminationStatus === TerminationState.REJECT) {
            return "; Tape Rejected";
        }
    }

    function handleStep(onAnimationCompleted?: () => void) {
        if (tmExecutorRef.current.terminationStatus === undefined){
            setCanStep(false);
            setCanGoBack(false);
            
            const prevTapeIdx = tmpExecutorRef.current.tape.currentIndex;

            const currentState = tmExecutorRef.current.currentState;
            const tmState = homePageConfig.tapePanelTM!.getState(currentState)!;
            const currentTapeValue = tiles.current[tapeHeadIndex.current];
            const transition = tmState.transition(currentTapeValue)!;

            const currentEdgeIdx = tmState.transitions.findIndex((value) => value.letters.includes(currentTapeValue));
            const currentEdge = tmState.transitions[currentEdgeIdx];
            const letters = currentEdge.letters.map((val) => val.length === 0 ? "_" : val).join("-");
            const transitionLabel = `${currentEdge.currentState}-${currentEdge.nextState}-${letters}`;
        
            const executingPosition = tmpExecutorRef.current.currentBasicBlock?.position;
            tmpExecutorRef.current.execute();

            const nextTapeIdx = tmpExecutorRef.current.tape.currentIndex;
            const idxOffset = Math.abs(nextTapeIdx - prevTapeIdx);
            const duration = idxOffset <= 1 ? transitionTime : transitionTime/3;

            let msg = "";
            let animation:TileAnimation;
            if (transition.direction === Direction.LEFT) {
                msg = "Moving to the left";
                moveTapeLeft(
                    tapeHeadIndex.current, 0,
                    {val: transition.letter, i: tapeHeadIndex.current}
                );
                transitionLeft(tapeHeadIndex.current, duration, onAnimationCompleted);
            } else if (transition.direction === Direction.RIGHT) {
                msg = "Moving to the right";
                moveTapeRight(
                    tapeHeadIndex.current, 0,
                    {val: transition.letter, i: tapeHeadIndex.current}
                );
                transitionRight(tapeHeadIndex.current, duration, onAnimationCompleted);
            } else if (transition.direction === Direction.START) {
                msg = "Moving to the start";
                transitionStart(transition.letter, duration, idxOffset, onAnimationCompleted);
            } else if (transition.direction === Direction.END) {
                msg = "Moving to the end";
                transitionEnd(transition.letter, duration, idxOffset, onAnimationCompleted);
            }
            msg += getTerminationMessage() ?? "";
            setTapeExecutionMessage(msg);

            
            homePageConfig.dispatch({type: 'SET_CURRENT_EDGE', edge: transitionLabel});
            if (executingPosition === undefined) {
                homePageConfig.dispatch({type: 'REMOVE_EXECUTING_POSITION'});
            } else {
                homePageConfig.dispatch({type: 'ADD_EXECUTING_POSITION', position: executingPosition});
            }
                        
            return animation!;
        }
    }

    function playTapeAnimation() {
        if (playing.current && canPlay) {
            handleStep(() => {
                playTapeAnimation();
            });
        }
    }

    function handlePlay() {
        playing.current = !playing.current;
        if (playing.current) {
            playTapeAnimation();
            setPlayMessage("Pause");
        } else {
            setPlayMessage("Play");
        }
    }

    useEffect(() => {
        homePageConfig.dispatch({type: 'SET_CURRENT_STATE', state: tmExecutorRef.current.currentState});
        setTapeExecutionMessage(String.fromCharCode(160));
        
        // get the text in the tiles correctly placed 
        for (let i=0; i<length; i++) {
            textRefs[i].current!.textContent = tiles.current[i];
        }

        return () => {
            setTapeExecutionMessage(String.fromCharCode(160));
            // interrupt the transition
            for (let i=0; i<length; i++) {
                d3.select(gRefs[i].current).interrupt();
            }
        };
    }, []);

    return (
        <div>
            <div className='tiles'>
                <svg viewBox='0 0 750 70'>
                    <defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" />
                    </marker></defs>
                    {gRefs.map((ref, i) => {
                        return (<g ref={ref} key={i}>
                            <TapeEntry textRef={textRefs[i]} x1={-50 + 50*i} y1={0}/>
                        </g>);
                    })}
                    <line stroke='black' strokeWidth={1} markerEnd="url(#arrow)" x1={75} y1={70} x2={75} y2={55}></line>
                </svg>
            </div>
            <div className='buttons'>
                <Button color='secondary' onClick={() => homePageConfig.dispatch({type: 'GO_TO_TAPE_INPUT'})} disabled={!canGoBack} variant='contained'>
                    Back
                </Button>
                <Button onClick={handlePlay} disabled={!canPlay} variant='contained'>{playMessage}</Button>
                <Button onClick={() => handleStep()} disabled={!canStep} variant='contained'>Step</Button>
            </div>
        </div>
    );
}

export default TapeScreen;