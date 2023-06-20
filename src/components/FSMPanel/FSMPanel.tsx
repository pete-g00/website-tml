import React, { useContext, useEffect, useRef, useState } from 'react';
import { Graphviz as GraphvizLoader } from '@hpcc-js/wasm';
import { Graphviz } from '@hpcc-js/wasm/types/graphviz';
import { TuringMachine } from 'parser-tml';
import { Box } from '@mui/material';
import * as d3 from 'd3';
import './FSMPanel.css';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';
import { HomePageConfigContext } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

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
        values.push(`\tnode [id="${_state}"]; ${label}\n`);
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

function FSMPanel() {
    const homePageConfig = useContext(HomePageConfigContext);

    const divElement = useRef<HTMLDivElement>(null);
    const graphviz = useRef<Graphviz|null>(null);
    const currentDOT = useRef<string>("");

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
        changeCurrentState(homePageConfig.currentState);

        return (() => {
            if (homePageConfig.currentState) {
                const node = d3.select(`g#${homePageConfig.currentState}`).selectAll("ellipse");
                node.attr("stroke", "black");
                node.attr("stroke-width", "1");
            }
        });
    });

    useEffect(() => {
        if (homePageConfig.currentEdge) {
            changeCurrentEdge(homePageConfig.currentEdge);
        }
    });

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
            const dot = convertToDot(homePageConfig.tmPanelTM!, width/height);
            if (dot !== currentDOT.current) {
                currentDOT.current = dot;
                
                const svg = graphviz.current!.dot(dot);
                const svgEl = parser.parseFromString(svg, "text/html").querySelector("svg")!;
    
                svgEl.setAttribute("width", "auto");
                svgEl.setAttribute("height", "auto");
                
                divElement.current!.replaceChildren();
                divElement.current!.appendChild(svgEl);
    
                // const gEl = svgEl.querySelector("g")!;
                // gEl.classList.add("pan-zoom");
                // const gD3 = d3.select(gEl);
                
                // // find the initial offset given by graphviz
                // const initialOffset = {x: 0, y: 0};
                // const transforms = gEl.transform.baseVal;
                // for (let i=0; i<transforms.length; i++) {
                //     initialOffset.x += transforms.getItem(i).matrix.e;
                //     initialOffset.y += transforms.getItem(i).matrix.f;
                // }
    
                // // get the dragging instantiated here as well
                // const zoom = d3.zoom<SVGGElement, unknown>()
                //     .scaleExtent([0.1, 10])
                //     .translateExtent([[0, 0], [height, width]])
                //     .filter((e) => {
                //         e.preventDefault();
                //         return (!e.ctrlKey || e.type === 'wheel') && !e.button;
                //     })
                //     .on("zoom", (e) => {
                //         const nextTransform = {
                //             k: e.transform.k,
                //             x: e.transform.x + initialOffset.x,
                //             y: e.transform.y + initialOffset.y
                //         };
                //         gD3.attr("transform", `translate (${nextTransform.x} ${nextTransform.y}) rotate (${nextTransform.k})`);
                //     });
                // gD3.call(zoom);
                
                changeCurrentState(homePageConfig.currentState);
                changeCurrentEdge(homePageConfig.currentEdge);
            }
        }

        if (divElement.current && homePageConfig.tmPanelTM) {
            if (graphviz.current) {
                drawGraph();
            } else {
                GraphvizLoader.load().then((module) => {
                    graphviz.current = module;
                    drawGraph();
                });
            }
        }
    }, [homePageConfig, height, width]);


    return (
        <Box textAlign="center" className="tm-FSMPanel">
            <h3>FSM representation of the TM program</h3>
            <div className='tm-FSMPanel' ref={divElement}></div>
        </Box>
    );
}

export default FSMPanel;