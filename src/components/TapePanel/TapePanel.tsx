import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import TapeInput from '../TapeInput/TapeInput';
import TapeScreen from '../TapeScreen/TapeScreen';
import './TapePanel.css';
import { HomePageConfigContext } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

function TapePanel() {
    const [tape, setTape] = useState("");
    const [tapeExecutionMessage, setTapeExecutionMessage] = useState(String.fromCharCode(160));
    
    const homePageConfig = useContext(HomePageConfigContext);

    return (
        <div className='tape-panel'>
            <Box textAlign="center">
                <h2>Run Program On Tape</h2>
                <p>{homePageConfig.tapePanelTM ? 
                    tapeExecutionMessage : 
                    "Execute the Turing Machine program on a valid tape."
                }</p>
            </Box>
            {homePageConfig.tapePanelTM === undefined
                ? <TapeInput setTape={setTape} tape={tape}/> 
                : <TapeScreen tapeValue={tape} setTapeExecutionMessage={setTapeExecutionMessage}/>
            }
        </div>
    );
}

export default TapePanel;