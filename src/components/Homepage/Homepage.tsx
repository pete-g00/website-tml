import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Editor from '../Editor/Editor';
import TMPanel from '../TMPanel/TMPanel';
import TapePanel from '../TapePanel/TapePanel';
import AppToolbar from '../Apptoolbar/Apptoolbar';
import { CodeParser, CodeConverter, ProgramContext, TuringMachine, CodePosition } from 'parser-tml';
import AppDrawer from '../AppDrawer/AppDrawer';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';
import * as _examples from '../examples.json';

const examples :{[key:string]: string} = _examples;

function HomePage() {
    document.body.classList.add("homepage");

    const [program, setProgram] = useState<ProgramContext|undefined>(undefined);
    const [turingMachine, setTuringMachine] = useState<TuringMachine|undefined>(undefined);

    const [currentState, setCurrentState] = useState<string|undefined>(undefined);
    const [currentEdge, setCurrentEdge] = useState<string|undefined>(undefined);

    const [executingPositions, setExecutingPositions] = useState<CodePosition[]>([]);
    
    const [isTapeExecuting, setIsTapeExecuting] = useState(false);

    // the timeout fn to revert current edge and marker position back to undefined 
    // (animation occurs even if the previous value equals the current value)
    const [changeCurrentEdgeFn, setChangeCurrentEdgeFn] = useState<NodeJS.Timeout|undefined>(undefined);

    const userConfig = useContext(UserConfigContext);

    useEffect(() => {
        userConfig.dispatch({type: 'SET_EXAMPLE_KEY', exampleKey: "isDiv2"});
    }, []);

    useEffect(() => {
        if (currentEdge) {
            const changeCurrentEdgeFn = setTimeout(() => {
                setCurrentEdge(undefined);
            }, 500);
            setChangeCurrentEdgeFn(changeCurrentEdgeFn);
        }
        
        return (() => {
            if (changeCurrentEdgeFn) {
                clearTimeout(changeCurrentEdgeFn);
            }
        });
    }, [currentEdge]);

    useEffect(() => {
        if (userConfig.exampleKey !== undefined) {
            const parser = new CodeParser(examples[userConfig.exampleKey]);
            const program = parser.parse();
            setProgram(program);
            const converter = new CodeConverter(program);
            setTuringMachine(converter.convert());
        }
    });

    useEffect(() => {
        if (program) {
            const converter = new CodeConverter(program);
            setTuringMachine(converter.convert());
        } else {
            setTuringMachine(undefined);
        }
    }, [program]);

    return (
        <div className='homepage'>
            <AppToolbar />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Editor executingPositions={executingPositions} setProgram={setProgram} isTapeExecuting={isTapeExecuting}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TMPanel turingMachine={turingMachine} currentEdge={currentEdge} isTapeExecuting={isTapeExecuting} currentState={currentState} />
                    <TapePanel program={program} turingMachine={turingMachine} setExecutingPositions={setExecutingPositions}
                        setIsTapeExecuting={setIsTapeExecuting} setCurrentState={setCurrentState} setCurrentEdge={setCurrentEdge}/>
                </Grid>
            </Grid>
            <AppDrawer />
        </div>
    );
}

export default HomePage;