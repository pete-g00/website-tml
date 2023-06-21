import React, { useContext } from 'react';
import { Box, Divider, Drawer, } from '@mui/material';
import { editorThemes, UserConfigContext, editorFontSizes, ExampleKey, appThemes } from '../UserConfigContextProvider/UserConfigContextProvider';
import './AppDrawer.css';
import examples from '../examples.json';
import DrawerTile from '../DrawerTile/DrawerTile';

const exampleKeys = Object.keys(examples) as ExampleKey[];

function AppDrawer() {
    const userConfig = useContext(UserConfigContext);

    return (
        <Drawer className='drawer' anchor='right' open={userConfig.isDrawerOpen} 
            onClose={() => userConfig.dispatch({type: 'CLOSE_DRAWER'})}>
            <Box sx={{width: 250}} role='presentation' textAlign='center'>
                <h2>Settings</h2>
                <Divider/>
                <DrawerTile values={editorThemes} activeOption={userConfig.editorTheme} title='Editor Theme'
                    convertToString={(value) => value} 
                    onOptionChosen={(theme) => userConfig.dispatch({type: 'SET_EDITOR_THEME', theme})}/>
                <DrawerTile values={appThemes} activeOption={userConfig.theme} title='Website Theme'
                    convertToString={(value) => value}
                    onOptionChosen={(theme) => userConfig.dispatch({type: 'SET_APP_THEME', theme})} />
                <DrawerTile values={editorFontSizes} activeOption={userConfig.editorFontSize} title='Editor Font Size'
                    convertToString={(fontSize) => fontSize.label} 
                    onOptionChosen={(fontSize) => userConfig.dispatch({type: 'SET_EDITOR_FONT_SIZE', fontSize})} />
                <DrawerTile values={[true, false]} activeOption={userConfig.showEditorLineNumber} title='Show Line Numbers'
                    convertToString={(value) => value ? 'Show' : 'Hide'}
                    onOptionChosen={(value) => userConfig.dispatch({type: 'SET_SHOW_LINE_NUMBER', value})} />
                <DrawerTile values={[0.2, 0.5, 1]} activeOption={userConfig.transitionTime/1000} title='Tape Transition Time (seconds)'
                    convertToString={(sec) => sec.toString()}
                    onOptionChosen={(sec) => userConfig.dispatch({type: 'SET_TRANSITION_TIME', transitionTime: sec*1000})} />
                <DrawerTile values={exampleKeys} title='Add Example to Editor'
                    convertToString={(key) => key}
                    onOptionChosen={(key) => userConfig.dispatch({type: 'SET_EXAMPLE_KEY', exampleKey: key})} />
            </Box>
        </Drawer>
    );
}

export default AppDrawer;