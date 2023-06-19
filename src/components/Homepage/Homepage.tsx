import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Editor from '../Editor/Editor';
import TMPanel from '../TMPanel/TMPanel';
import TapePanel from '../TapePanel/TapePanel';
import AppToolbar from '../Apptoolbar/Apptoolbar';
import { CodeParser } from 'parser-tml';
import AppDrawer from '../AppDrawer/AppDrawer';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';
import * as _examples from '../examples.json';
import { HomePageConfigContext, HomePageConfigContextProvider } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

const examples :{[key:string]: string} = _examples;

function HomePage() {
    document.body.classList.add("homepage");

    // the timeout fn to revert current edge and marker position back to undefined 
    // (animation occurs even if the previous value equals the current value)
    const [changeCurrentEdgeFn, setChangeCurrentEdgeFn] = useState<NodeJS.Timeout|undefined>(undefined);

    const userConfig = useContext(UserConfigContext);
    const homePageConfig = useContext(HomePageConfigContext);

    useEffect(() => {
        userConfig.dispatch({type: 'SET_EXAMPLE_KEY', exampleKey: "isDiv2"});
    }, []);

    useEffect(() => {
        return (() => {
            if (changeCurrentEdgeFn) {
                clearTimeout(changeCurrentEdgeFn);
            }
        });
    });

    useEffect(() => {
        if (homePageConfig.currentEdge) {
            const changeCurrentEdgeFn = setTimeout(() => {
                homePageConfig.dispatch({type: 'SET_CURRENT_EDGE', edge: undefined});
            }, 500);
            setChangeCurrentEdgeFn(changeCurrentEdgeFn);
        }
    });

    useEffect(() => {
        if (userConfig.exampleKey !== undefined) {
            const parser = new CodeParser(examples[userConfig.exampleKey]);
            const program = parser.parse();
            homePageConfig.dispatch({type: 'SET_PROGRAM', program});
        }
    });

    return (
        <div className='homepage'>
            <AppToolbar />
            <HomePageConfigContextProvider>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Editor />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TMPanel />
                        <TapePanel />
                    </Grid>
                </Grid>
            </HomePageConfigContextProvider>
            <AppDrawer />
        </div>
    );
}

export default HomePage;