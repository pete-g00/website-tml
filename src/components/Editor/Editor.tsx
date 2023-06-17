import React, { useContext, useEffect, useRef, useState } from 'react';
import './Editor.css';
import * as monaco from 'monaco-editor';
import { getProgram } from '../MonacoConfig';
import { CodePosition, ProgramContext } from 'parser-tml';
import { UserConfigContext } from '../UserConfigContextProvider/UserConfigContextProvider';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import _examples from '../examples.json';

const examples:{[key:string]:string} = _examples;

interface EditorProps {
    setProgram: (program:ProgramContext|undefined) => void;
    isTapeExecuting:boolean;
    executingPositions:CodePosition[];
}

function Editor({ setProgram, isTapeExecuting, executingPositions }:EditorProps) {
    const divEl = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor|null>(null);
    const markers:monaco.editor.IMarkerData[] = [];
    const event = useRef<monaco.IDisposable|undefined>(undefined);
    const userConfig = useContext(UserConfigContext);

    function handleChange() {
        if (!isTapeExecuting && editor.current) {
            const program = getProgram(editor.current.getValue(), markers);
            monaco.editor.setModelMarkers(editor.current.getModel()!, "validate-TMP", markers);
            
            if (markers.length === 0) {
                setProgram(program);
            } else {
                setProgram(undefined);
            }
        }
    }
    
    useEffect(() => {
        if (divEl.current) {
            const _editor = monaco.editor.create(divEl.current, {
                value: examples.isDiv2,
                language: 'TMProgram',
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

    useEffect(() => {
        if (isTapeExecuting) {
            const value = editor.current?.getValue();
            event.current = editor.current?.onDidChangeModelContent(() => {
                if (editor.current?.getValue() !== value) {
                    editor.current?.setValue(value!);
                    setShowSnackbar(true);
                }
            });
        } else {
            markers.length = 0;
            monaco.editor.setModelMarkers(editor.current!.getModel()!, "executing-code", markers);
            event.current?.dispose();
        }
    }, [isTapeExecuting]);

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
            for (const position of executingPositions) {
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
    }, [executingPositions]);

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