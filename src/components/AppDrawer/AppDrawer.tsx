import React, { useContext } from 'react';
import { Box, Button, ButtonGroup, Divider, Drawer, } from '@mui/material';
import { editorThemes, UserConfigContext, editorFontSizes, ExampleKey } from '../UserConfigContextProvider/UserConfigContextProvider';
import './AppDrawer.css';
import examples from '../examples.json';

const exampleKeys = Object.keys(examples);

function AppDrawer() {
    const userConfig = useContext(UserConfigContext);

    return (
        <Drawer className='drawer' anchor='right' open={userConfig.isDrawerOpen} 
            onClose={() => userConfig.dispatch({type: 'CLOSE_DRAWER'})}>
            <Box sx={{width: 250}} role='presentation' textAlign='center'>
                <h2>Editor Settings</h2>
                <Divider/>
                <div className='editor-settings-tile'>
                    <h3>Editor Theme</h3>
                    <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
                        {editorThemes.map((theme, i) => {
                            return <Button key={i}
                                className={userConfig.editorTheme === theme ? 'active-option' : undefined} 
                                onClick={() => userConfig.dispatch({type: 'SET_EDITOR_THEME', theme})}>{theme}</Button>;
                        })}
                    </ButtonGroup>
                </div>
                <Divider/>
                <div className='editor-settings-tile'>
                    <h3>Editor Font Size</h3>
                    <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
                        {editorFontSizes.map((fontSize, i) => {
                            return <Button key={i}
                                className={userConfig.editorFontSize === fontSize ? 'active-option' : undefined} 
                                onClick={() => userConfig.dispatch({type: 'SET_EDITOR_FONT_SIZE', fontSize})}>{fontSize.label}</Button>;                            
                        })}
                    </ButtonGroup>    
                </div>
                <Divider/>
                <div className='editor-settings-tile'>
                    <h3>Show Line Numbers</h3>
                    <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
                        {[true, false].map((value, i) => {
                            return <Button key={i}
                                className={userConfig.showEditorLineNumber === value ? 'active-option' : undefined} 
                                onClick={() => userConfig.dispatch({type: 'SET_SHOW_LINE_NUMBER', value})}>{value ? 'Show' : 'Hide'}</Button>;
                        })}
                    </ButtonGroup>
                </div>
                <Divider/>
                <div className='editor-settings-tile'>
                    <h3>Tape Transition Time (seconds)</h3>
                    <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
                        {[0.2, 0.5, 1].map((sec, i) => {
                            return <Button key={i} className={sec*1000 === userConfig.transitionTime ? 'active-option' : undefined}
                                onClick={() => userConfig.dispatch({type: 'SET_TRANSITION_TIME', transitionTime: sec*1000})}>{ sec }</Button>;
                        })}
                    </ButtonGroup>
                </div>
                <Divider/>
                <div className='editor-settings-tile'>
                    <h3>Add Example to Editor</h3>
                    <ButtonGroup color='secondary' variant='contained' orientation='vertical' fullWidth>
                        {exampleKeys.map((key, i) => {
                            return <Button key={i} 
                                onClick={() => userConfig.dispatch({type: 'SET_EXAMPLE_KEY', exampleKey: key as ExampleKey})}>{ key }</Button>;
                        })}
                    </ButtonGroup>
                </div>
                <Divider/>
            </Box>
        </Drawer>
    );
}

export default AppDrawer;