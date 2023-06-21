import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import './TMPanel.css';
import FSMPanel from '../FSMPanel/FSMPanel';
import ButtonGroup from '@mui/material/ButtonGroup';
import DefTMPanel from '../DefTMPanel/DefTMPanel';
import { HomePageConfigContext, TMPanelScreen } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

function TMPanel() {
    // whether the convert button is enabled
    const [isConvertEnabled, setIsConvertEnabled] = useState(true);
    const homePageConfig = useContext(HomePageConfigContext);
    
    useEffect(() => {
        setIsConvertEnabled(homePageConfig.actualTM !== undefined);
    });

    function showScreen(screen:TMPanelScreen) {
        return () => {
            homePageConfig.dispatch({type: 'SET_TM_PANEL_SCREEN', screen});
        };
    }

    return (
        <div className='tm-panel'>
            <Box textAlign="center"><h2>Turing Machine</h2></Box>
            <div className='tm-screen'>
                {homePageConfig.tmPanelScreen === "FSM" 
                    ? <FSMPanel />
                    : homePageConfig.tmPanelScreen === "DEF" ? 
                    <DefTMPanel />
                    : <></>
                }
            </div>
            <div>
                <Box textAlign="center">
                    {homePageConfig.tmPanelTM ? <p>&nbsp;</p> : <p>Convert the Code into the Turing Machine</p>}
                </Box>
            <Box textAlign="center">
                <ButtonGroup variant="contained" aria-label="TM Conversion Options">
                    <Button onClick={showScreen("FSM")} disabled={!isConvertEnabled}>Convert to FSM</Button>
                    <Button onClick={showScreen("DEF")} disabled={!isConvertEnabled}>Show TM Definition</Button>
                </ButtonGroup>
            </Box>
            </div>
        </div>
    );
}

export default TMPanel;