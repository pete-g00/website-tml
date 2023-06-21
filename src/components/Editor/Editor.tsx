import React, { useContext, useEffect, useRef, useState } from 'react';
import './Editor.css';
import * as monaco from 'monaco-editor';
import { getProgram } from '../MonacoConfig';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import _examples from '../examples.json';
import { HomePageConfigContext } from '../HomePageConfigContextProvider/HomePageConfigContextProvider';

const examples:{[key:string]:string} = _examples;

function Editor() {
    // the editor div element
    const divEl = useRef<HTMLDivElement>(null);
    // the actual editor
    const editor = useRef<monaco.editor.IStandaloneCodeEditor|null>(null);
    // the markers (highlighted positions) within the editor
    const markers:monaco.editor.IMarkerData[] = [];
    
    // the locked value of the editor during execution
    const lockedValue = useRef<string|undefined>();
    
    const userConfig = useContext(UserConfigContext);
    const homePageConfig = useContext(HomePageConfigContext);

    // handle change of the program value
    function handleChange() {
        if (!homePageConfig.isTapeExecuting && editor.current) {
            const program = getProgram(editor.current.getValue(), markers);
            monaco.editor.setModelMarkers(editor.current.getModel()!, "validate-TMP", markers);
            
            if (markers.length === 0) {
                homePageConfig.dispatch({type: 'SET_PROGRAM', program});
            } else {
                homePageConfig.dispatch({type: 'SET_PROGRAM', program: undefined});
            }
        }
    }
    
    // create the editor
    useEffect(() => {
        if (divEl.current) {
            const _editor = monaco.editor.create(divEl.current, {
                value: examples.isDiv2,
                language: 'TML',
                theme: userConfig.editorTheme,
                automaticLayout: true,
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                detectIndentation: true,
                autoIndent: "full"
            });
            editor.current = _editor;
            _editor.onDidChangeModelContent(handleChange);
        }
        return () => {
            if (editor.current) {
                editor.current.dispose();
            }
        };
    }, []);

    // stop the user from changing the value during tape execution (i.e. when there is a locked value)
    useEffect(() => {
        const event = editor.current!.onDidChangeModelContent(() => {
            if (lockedValue.current && editor.current!.getValue() !== lockedValue.current) {
                editor.current!.setValue(lockedValue.current);
                setShowSnackbar(true);
            }
        });

        return () => {
            event.dispose();
        };
    }, []);

    // update the locked value based on tape execution
    useEffect(() => {
        if (homePageConfig.isTapeExecuting && editor.current!.getValue()! !== lockedValue.current!) {
            lockedValue.current = editor.current!.getValue()!;
        } else if (!homePageConfig.isTapeExecuting && lockedValue.current) {
            lockedValue.current = undefined;
        }
    });

    // change the editor based on the user configuration
    useEffect(() => {
        if (editor.current) {
            editor.current.updateOptions({
                theme: userConfig.editorTheme,
                fontSize: userConfig.editorFontSize.value,
                lineNumbers: userConfig.showEditorLineNumber ? "on" : "off"
            });
        }
    });



    useEffect(() => {
        if (userConfig.exampleKey && editor.current) {
            const value = examples[userConfig.exampleKey];
            editor.current.setValue(value);
            handleChange();
            userConfig.dispatch({type: 'SET_EXAMPLE_KEY', exampleKey: undefined});
        }
    });

    useEffect(() => {
        if (editor.current) {
            markers.length = 0;
            monaco.editor.setModelMarkers(editor.current!.getModel()!, "executing-code", markers);
            for (const position of homePageConfig.executingPositions) {
                markers.push({
                    endColumn: position.endColNumber+1,
                    endLineNumber: position.endLineNumber,
                    startColumn: position.startColNumber+1,
                    startLineNumber: position.startLineNumber+1,
                    message: "The code being executed",
                    severity: monaco.MarkerSeverity.Info,
                });
            }
            setTimeout(() => {
                monaco.editor.setModelMarkers(editor.current!.getModel()!, "executing-code", markers);
            }, 100);
        }
    });

    const [showSnackbar, setShowSnackbar] = useState(false);
    function handleSnackbarClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
          return;
        }
        setShowSnackbar(false);
    }

    return (<>
        <div className="Editor" ref={divEl}></div>
        
        <Snackbar open={showSnackbar} onClick={() => setShowSnackbar(true)} onClose={handleSnackbarClose} 
            autoHideDuration={5000} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
            <MuiAlert elevation={6} variant="filled" severity='error' onClose={handleSnackbarClose} sx={{ width: '100%' }}>
                Cannot Edit When Executing on Tape. <br/>Stop tape execution before editing.
            </MuiAlert>
        </Snackbar>
    </>);
}

export default Editor;