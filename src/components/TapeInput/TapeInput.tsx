import React, { useState, useContext }  from 'react';
import { Box, Button, TextField } from '@mui/material';
import { HomePageConfigContext } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

interface TapeInputProps {
    setTape:(value:string) => void;
    tape:string;
}

function validateTape(tape:string, alphabet:Set<string>) {
    for (let i = 0; i < tape.length; i++) {
        if (tape[i] !== " " && !alphabet.has(tape[i])) {
            return true;
        }
    }

    return false;
}

function TapeInput({ tape, setTape }:TapeInputProps) {
    const [hasError, setHasError] = useState(false);
    const homePageConfig = useContext(HomePageConfigContext);

    function handleSubmit() {
        if (homePageConfig.actualTM?.alphabet) {    
            const errorState = validateTape(tape, homePageConfig.actualTM.alphabet);
            setHasError(errorState);
    
            if (!errorState) {
                homePageConfig.dispatch({type: 'GO_TO_TAPE_SCREEN'});
            }
        }
    }

    function handleKeyDown(e:React.KeyboardEvent<HTMLFormElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <form onKeyDown={handleKeyDown}>
            <Box textAlign='center'>
                <div>
                    <TextField autoComplete='off'variant='outlined' label='Tape Value' error={hasError} 
                        helperText={hasError ? 'Invalid Tape Value' : ' '} onChange={(e) => setTape(e.target.value)} 
                        disabled={homePageConfig.actualProgram === undefined} value={tape}/>
                </div>
                <div>
                    <Button variant='contained' onClick={handleSubmit} disabled={homePageConfig.actualProgram === undefined}>
                        Execute
                    </Button>
                </div>
            </Box>
        </form>
    );
}

export default TapeInput;