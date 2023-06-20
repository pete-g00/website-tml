import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';

interface AppToolbarProps {
    isDocumentation?:boolean;
}

function AppToolbar({ isDocumentation }: AppToolbarProps) {
    const userConfig = useContext(UserConfigContext);    
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar color="primary" variant="elevation" position="fixed">
                <Toolbar>
                    <Typography align='left' color='inherit' variant="h6" sx={{flexGrow: 1}}>TM Program Executor</Typography>
                    <div>
                        {!isDocumentation && <Tooltip title='Change Settings'>
                            <IconButton color='inherit' onClick={() => userConfig.dispatch({type: 'OPEN_DRAWER'})}>
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>}
                        <Button color='inherit' href='https://pete00g.gitbook.io/turing-machine-language/' about='_blank'>
                            Documentation
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
}

export default AppToolbar;