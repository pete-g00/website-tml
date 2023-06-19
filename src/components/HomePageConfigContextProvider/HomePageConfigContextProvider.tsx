import { CodeConverter, CodePosition, ProgramContext, TuringMachine } from "parser-tml";
import { createContext, useReducer } from "react";

export type TMPanelScreen = "FSM" | "DEF" | "NONE";
export type TapePanelScreen = "INPUT" | "SCREEN";

interface _HomePageConfig {
    actualProgram: ProgramContext|undefined;
    actualTM: TuringMachine|undefined;
    tmPanelTM: TuringMachine|undefined;
    tapePanelTM: TuringMachine|undefined;
    tapePanelProgram: ProgramContext|undefined;
    currentState: string|undefined;
    currentEdge: string|undefined;
    executingPositions: CodePosition[];
    isTapeExecuting: boolean;
    tapePanelScreen: TapePanelScreen;
    tmPanelScreen: TMPanelScreen;
}

export interface HomePageConfig {
    actualProgram: ProgramContext|undefined;
    actualTM: TuringMachine|undefined;
    tmPanelTM: TuringMachine|undefined;
    tapePanelTM: TuringMachine|undefined;
    tapePanelProgram: ProgramContext|undefined;
    currentState: string|undefined;
    currentEdge: string|undefined;
    executingPositions: CodePosition[];
    isTapeExecuting: boolean;
    tapePanelScreen: TapePanelScreen;
    tmPanelScreen: TMPanelScreen;   
    dispatch: React.Dispatch<HomePageConfigAction>;
}

const initialConfig:HomePageConfig = {
    actualProgram: undefined,
    actualTM: undefined,
    tmPanelTM: undefined,
    tapePanelTM: undefined,
    tapePanelProgram: undefined,
    currentState: undefined,
    currentEdge: undefined,
    executingPositions: [],
    isTapeExecuting: false,
    tapePanelScreen: "INPUT",
    tmPanelScreen: "NONE",
    dispatch: () => undefined,
};

export const HomePageConfigContext = createContext<HomePageConfig>(initialConfig);

export type HomePageConfigAction = 
    {type: 'SET_PROGRAM', program: ProgramContext|undefined} |
    {type: 'SET_ALL_PROGRAM', program: ProgramContext|undefined} |
    {type: 'CONNECT_PANEL_TM'} |
    {type: 'SET_CURRENT_STATE', state: string|undefined} | 
    {type: 'SET_CURRENT_EDGE', edge: string|undefined} | 
    {type: 'REMOVE_EXECUTING_POSITION'} | 
    {type: 'ADD_EXECUTING_POSITION', position:CodePosition} |
    {type: 'GO_TO_TAPE_SCREEN'} |
    {type: 'GO_TO_TAPE_INPUT'} |
    {type: 'SET_TM_PANEL_SCREEN', screen: TMPanelScreen};

function convertProgramToTM(program:ProgramContext) {
    const converter = new CodeConverter(program);
    return converter.convert();
}

function homePageConfigReducer(state:_HomePageConfig, action:HomePageConfigAction): _HomePageConfig {
    switch (action.type) {
        case 'SET_PROGRAM':
            if (action.program !== undefined) {
                return {...state, actualProgram: action.program, actualTM: convertProgramToTM(action.program)};
            } else {
                return {...state, actualProgram: undefined, actualTM: undefined};
            }
        case 'SET_ALL_PROGRAM': 
            if (action.program !== undefined) {
                return {...state, 
                    actualProgram: action.program, 
                    actualTM: convertProgramToTM(action.program), 
                    tmPanelTM: convertProgramToTM(action.program), 
                    tapePanelTM: convertProgramToTM(action.program)};
            } else {
                return {...state, actualProgram: undefined, actualTM: undefined, tmPanelTM: undefined, tapePanelTM: undefined};
            }
        case 'CONNECT_PANEL_TM':
            return {...state, tmPanelTM: state.actualTM};
        case 'SET_CURRENT_STATE':
            return {...state, currentState: action.state};
        case 'SET_CURRENT_EDGE':
            return {...state, currentEdge: action.edge};
        case 'REMOVE_EXECUTING_POSITION':
            return {...state, executingPositions: []};
        case 'ADD_EXECUTING_POSITION':
            return {...state, executingPositions: [action.position]};
        case 'GO_TO_TAPE_SCREEN':
            if (state.tmPanelTM !== undefined) {
                return {...state, tapePanelTM: state.actualTM, tapePanelProgram: state.actualProgram, isTapeExecuting: true, tmPanelTM: state.actualTM};
            } else {
                return {...state, tapePanelTM: state.actualTM, tapePanelProgram: state.actualProgram, isTapeExecuting: true};
            }
        case 'GO_TO_TAPE_INPUT':
            return {...state, tapePanelTM: undefined, currentState: undefined, currentEdge: undefined, isTapeExecuting: false, executingPositions: []};
        case 'SET_TM_PANEL_SCREEN':
            return {...state, tmPanelScreen: action.screen};
    }
}

interface HomePageConfigProviderProps {
    children?: React.ReactNode;
}

export function HomePageConfigContextProvider({ children }:HomePageConfigProviderProps) {
    const [homePageConfig, dispatch] = useReducer(homePageConfigReducer, initialConfig);

    return (<HomePageConfigContext.Provider value={{...homePageConfig, dispatch}}>
        { children }
    </HomePageConfigContext.Provider>);
}