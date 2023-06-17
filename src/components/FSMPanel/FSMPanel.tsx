import React, { useContext, useEffect, useRef, useState } from 'react';
import { Graphviz as GraphvizLoader } from '@hpcc-js/wasm';
import { Graphviz } from '@hpcc-js/wasm/types/graphviz';
import { TuringMachine } from 'parser-tml';
import { Box } from '@mui/material';
import * as d3 from 'd3';
import './FSMPanel.css';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';

interface FSMPanelProps {
    turingMachine: TuringMachine;
    currentState: string|undefined;
    currentEdge: string|undefined;
}

function convertToDot(tm:TuringMachine, ratio:number): string {
    const values:string[] = [];
    values.push(`digraph {
    ratio="${ratio}"
    bgcolor="#E6E6E6"
    fontname="Helvetica"
    node [fontname="Helvetica"]
    edge [fontname="Helvetica"]
    rankdir=LR;
    node [shape = doublecircle, id = "${tm.initialState}"]; q0;
    node [shape = circle, style = filled, fillcolor = green, id = accept]; A;
    node [fillcolor = red, id = reject]; R;
    node [style = "", shape = circle];
`);
    const stateToLabel:{[key:string]:string} = {
        "accept": "A",
        "reject": "R"
    };
    tm.states.forEach((_state, i) => {
        const label = "q" + i;
        stateToLabel[_state] = label;
        values.push(`\tnode []; ${label}\n`);
    });
    tm.states.forEach((_state) => {
        const state = tm.getState(_state)!;
        state.transitions.forEach((transition) => {
            const currentState = stateToLabel[transition.currentState];
            const nextState = stateToLabel[transition.nextState];
            const letters = transition.letters.map((val) => val.length === 0 ? "_" : val).join("-");
            const transitionLabel = `${transition.currentState}-${transition.nextState}-${letters}`;
            
            values.push(`\t${currentState} -> ${nextState} [label = "${transition.label}", id = "${transitionLabel}"];\n`);
        });
    });
    values.push("}");
    return values.join("");
}

function FSMPanel({ turingMachine, currentEdge, currentState }: FSMPanelProps) {
    const divElement = useRef<HTMLDivElement>(null);
    const graphviz = useRef<Graphviz|null>(null);

    const { transitionTime } = useContext(UserConfigContext);
    const parser = new DOMParser();

    const [height, setHeight] = useState(-1);
    const [width, setWidth] = useState(-1);
    
    function changeCurrentState(currentState:string|undefined) {
        if (currentState) {
            const node = d3.select(`g#${currentState}`).selectAll("ellipse");
            node.attr("stroke", "blue");
            node.attr("stroke-width", "2");
        }
    }

    function changeCurrentEdge(currentEdge:string|undefined) {
        if (currentEdge) {
            const arrow = d3.select(`g#${currentEdge}`).select("path");
            arrow.transition()
                .duration(transitionTime*3/4)
                .attr("stroke", "blue")
                .attr("stroke-width", "3")
                .transition()
                .duration(transitionTime/4)
                .attr("stroke", "black")
                .attr("stroke-width", "1");
        }
    }

    useEffect(() => {
        changeCurrentState(currentState);

        return (() => {
            if (currentState) {
                const node = d3.select(`g#${currentState}`).selectAll("ellipse");
                node.attr("stroke", "black");
                node.attr("stroke-width", "1");
            }
        });
    }, [currentState]);

    useEffect(() => {
        changeCurrentEdge(currentEdge);
    }, [currentEdge]);

    function handleResize() {
        setHeight(divElement.current!.offsetWidth);
        setWidth(divElement.current!.offsetHeight);
    }

    useEffect(() => {
        handleResize();
        const resizer = new ResizeObserver(handleResize);
        resizer.observe(divElement.current!);


        return () => {
            resizer.disconnect();
        };
    }, []);

    useEffect(() => {
        function drawGraph() {
            const dot = convertToDot(turingMachine, width/height);

            const svg = graphviz.current!.dot(dot);
            const svgEl = parser.parseFromString(svg, "text/html").querySelector("svg")!;

            svgEl.setAttribute("width", "auto");
            svgEl.setAttribute("height", "auto");

            divElement.current!.replaceChildren();
            divElement.current!.appendChild(svgEl);

            // const gEl = divElement.current!.querySelector("g")!;
            // gEl.classList.add("pan-zoom");
            // const gD3 = d3.select(gEl);

            // // get the dragging instantiated here as well
            // const zoom = d3.zoom<SVGGElement, unknown>()
            //     .scaleExtent([1, 10])
            //     .translateExtent([[0, 0], [height, width]])
            //     .filter((e) => {
            //         e.preventDefault();
            //         return (!e.ctrlKey || e.type === 'wheel') && !e.button;
            //     })
            //     .on("zoom", (e) => {
            //         gD3.attr("transform", e.transform);
            //     });
            // gD3.call(zoom);

            changeCurrentState(currentState);
            changeCurrentEdge(currentEdge);
        }

        if (divElement.current) {
            if (graphviz.current) {
                drawGraph();
            } else {
                GraphvizLoader.load().then((module) => {
                    graphviz.current = module;
                    drawGraph();
                });
            }
        }
    }, [turingMachine, height, width]);

    /**
# checks whether a string has an equal number of a's and b's
# The module is recursive, and in one iteration should remove one a and one b.
# Base it on the first value (if a at the start, remove the last b; and vice versa). 
alphabet = [a, b]
module equalAB():
    # base case => accept blank
    if blank:
        accept
    # a: remove it, go to the end and remove the last b
    if a:
        changeto blank
        move end
        goto removeLast(b, a)
    # b: remove it, go to the end and remove the last a
    if b:
        changeto blank
        move end
        goto removeLast(a, b)
# given that the tape is positioned at the end,
# removes the last x from the tape
module removeLast(x, y):
    # last character x => remove it and restart
    if x:
        changeto blank
        move start
        goto equalAB()
    # last character y => remove it, 
    # and replace the last x with an y
    if y:
        changeto blank
        move left
        while x:
            move left
        if y:
            changeto x
            move start
            goto equalAB()
        # no a's => more b's than a's
        else:
            reject
    # last character blank => more y's than x's
    else:
        reject
     */

    return (
        <Box textAlign="center" className="tm-FSMPanel">
            <h3>FSM representation of the TM program</h3>
            <div className='tm-FSMPanel' ref={divElement}></div>
        </Box>
    );
}

export default FSMPanel;