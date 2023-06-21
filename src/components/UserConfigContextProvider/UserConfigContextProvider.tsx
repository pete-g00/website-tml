import React, { createContext, useReducer } from 'react';

export type EditorTheme = "cobalt" | "dawn" | "dracula" | "github" | "monokai" | "textmate";
export const editorThemes:EditorTheme[] = ["cobalt", "dawn", "dracula", "github", "monokai", "textmate"];

export type AppTheme = "dark" | "light";
export const appThemes: AppTheme[] = ["dark", "light"];

export class EditorFontSize {
  public readonly label;
  public readonly value;

  private constructor(label:string, value:number) {
    this.label = label;
    this.value = value;
  }

  public static SMALL:EditorFontSize = new EditorFontSize("Small", 12);
  public static NORMAL:EditorFontSize = new EditorFontSize("Normal", 14);
  public static LARGE:EditorFontSize = new EditorFontSize("Large", 16);

  public static parse(label:string):EditorFontSize|undefined {
    const fontSize = editorFontSizes.find((el) => {
      return el.label === label;
    });
    return fontSize;
  }
}

export const editorFontSizes:EditorFontSize[] = [EditorFontSize.LARGE, EditorFontSize.NORMAL, EditorFontSize.SMALL];

export type ExampleKey = "isDiv2" | "isDiv2Recursive" | "palindrome";

interface _UserConfig {
  editorTheme:EditorTheme;
  editorFontSize:EditorFontSize;
  isDrawerOpen:boolean;
  showEditorLineNumber:boolean;
  transitionTime:number;
  exampleKey:ExampleKey|undefined;
  theme: AppTheme;
}

export interface UserConfig {
  editorTheme:EditorTheme;
  editorFontSize:EditorFontSize;
  isDrawerOpen:boolean;
  showEditorLineNumber:boolean;
  transitionTime:number;
  exampleKey:ExampleKey|undefined;
  theme: AppTheme;
  dispatch: React.Dispatch<UserConfigAction>;
}

const initialConfig:UserConfig = {
  editorTheme: "dracula",
  editorFontSize: EditorFontSize.NORMAL,
  showEditorLineNumber: true,
  isDrawerOpen: false,
  transitionTime: 500,
  exampleKey: "isDiv2",
  theme: "dark",
  dispatch: () => undefined,
};

export const UserConfigContext = createContext<UserConfig>(initialConfig);

export type UserConfigAction = 
  {type: 'CLOSE_DRAWER'} |
  {type: 'OPEN_DRAWER'} | 
  {type: 'SET_EDITOR_THEME', theme: EditorTheme} |
  {type: 'SET_APP_THEME', theme: AppTheme} |
  {type: 'SET_EDITOR_FONT_SIZE', fontSize: EditorFontSize} | 
  {type: 'SET_SHOW_LINE_NUMBER', value: boolean} | 
  {type: 'SET_TRANSITION_TIME', transitionTime: number} | 
  {type: 'SET_EXAMPLE_KEY', exampleKey: ExampleKey|undefined};

function userConfigReducer(state:_UserConfig, action:UserConfigAction): _UserConfig {
  switch (action.type) {
    case 'SET_EDITOR_THEME':
      return {...state, editorTheme: action.theme, isDrawerOpen: false};
    case 'SET_APP_THEME':
      return {...state, theme: action.theme, isDrawerOpen: false};
    case 'SET_EDITOR_FONT_SIZE':
      return {...state, editorFontSize: action.fontSize, isDrawerOpen: false};
    case 'SET_SHOW_LINE_NUMBER':
      return {...state, showEditorLineNumber: action.value, isDrawerOpen: false};
    case 'OPEN_DRAWER':
      return {...state, isDrawerOpen: true};    
    case 'CLOSE_DRAWER':
      return {...state, isDrawerOpen: false};
    case 'SET_TRANSITION_TIME':
      return {...state, transitionTime: action.transitionTime, isDrawerOpen: false};
    case 'SET_EXAMPLE_KEY':
      return {...state, exampleKey: action.exampleKey, isDrawerOpen: false};
  }
}

interface UserConfigContextProviderProps {
    children?: React.ReactNode;
}

export function UserConfigContextProvider({ children }:UserConfigContextProviderProps) {
    const [userConfig, dispatch] = useReducer(userConfigReducer, initialConfig);

    return (<UserConfigContext.Provider value={{...userConfig, dispatch}}>
        { children }
    </UserConfigContext.Provider>);
}