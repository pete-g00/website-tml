import * as monaco from 'monaco-editor';
import { CodeError, CodeParser, CodeValidator } from 'parser-tml';
import themes from './editorThemes.json';

monaco.languages.register({id: "TML"});

const keywords = ['alphabet', 'module', 'switch', 'if', 'else', 'while', 'move', 'changeto', 'goto'];
const typeKeywords = ["accept", "reject", "left", "right", "start", "end", "blank", "tapehead"];

const tmConfig: monaco.languages.LanguageConfiguration = {
    comments: {
        lineComment: "#"
    },
    brackets: [
        ["[", "]"],
        ["(", ")"]
    ],
    autoClosingPairs: [
        {open: '[', close: ']'},
        {open: '(', close: ')'},
    ],
    surroundingPairs: [
        {open: '[', close: ']'},
        {open: '(', close: ')'},
    ],
    onEnterRules: [
        {
            beforeText: /:/,
            action: {indentAction: monaco.languages.IndentAction.Indent}
        },
        {
            beforeText: /accept|reject|goto.*\)/,
            action: {indentAction: monaco.languages.IndentAction.Outdent}
        }
    ]
};

monaco.languages.setLanguageConfiguration('TML', tmConfig);

const tmLanguage:monaco.languages.IMonarchLanguage = {
    defaultToken: "invalid",
    ignoreCase: false,
    keywords,
    typeKeywords,
    brackets: [
        {open: "[", close: "]", token: "delimiter.bracket"},
        {open: "(", close: ")", token: "delimiter.parenthesis"},
    ],
    tokenizer: {
        root: [
            [/[,:=]/, 'delimiter'],
            [/[\[\]()]/, "@brackets"],
            [/#.*$/, 'comment'],

            [/@[a-zA-Z_]\w*/, 'tag'],
            [/[a-zA-Z0-9_$][\w$]*/, {
                cases: {
                    '@typeKeywords': 'predefined',
                    '@keywords': 'keyword',
                    '@default': 'identifier',
                }
            }]
        ]
    }
};

monaco.languages.setMonarchTokensProvider("TML", tmLanguage);

function getCompletionItem(model:monaco.editor.ITextModel, position:monaco.Position, keyword:string) {
    return {
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
        range: {
            startLineNumber: position.lineNumber,
            startColumn: model.getWordAtPosition(position)!.startColumn,
            endColumn: position.column,
            endLineNumber: position.lineNumber,
        }
    };
}

function filterValues(value:string) {
    // const commentsRemoved = value.replaceAll(/#.*\n|#.*$/g, "");
    const splitValues = value.split(/ |:|\(|\)|\[|\]|#|\n/);
    const filtered = splitValues.filter(
        value => !keywords.includes(value) && !typeKeywords.includes(value)
    );

    return filtered;
}

monaco.languages.registerCompletionItemProvider("TML", {
    provideCompletionItems: (model, position) => {
        // TODO: if comment, then get comment suggestions

        // otherwise, take normal suggestions
        const suggestions = [
            ...keywords.map(keyword => getCompletionItem(model, position, keyword)),
            ...typeKeywords.map(keyword => getCompletionItem(model, position, keyword)),
            ...filterValues(model.getValue()).map(keyword => getCompletionItem(model, position, keyword))
        ];
        return {suggestions};
    }
});

// based on themes defined at: https://github.com/brijeshb42/monaco-themes/blob/master/themes
monaco.editor.defineTheme("cobalt", {base: 'vs-dark', ...themes.cobalt});
monaco.editor.defineTheme("dawn", {base: 'vs', ...themes.dawn});
monaco.editor.defineTheme("dracula", {base: 'vs-dark', ...themes.dracula});
monaco.editor.defineTheme("github", {base: 'vs', ...themes.github});
monaco.editor.defineTheme("monokai", {base: "vs-dark", ...themes.monokai});
monaco.editor.defineTheme("textmate", {base: "vs", ...themes.textmate});

// @ts-ignore
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
	getWorkerUrl: function (_moduleId:any, label:string) {
		if (label === 'json') {
			return './json.worker.bundle.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './css.worker.bundle.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './ts.worker.bundle.js';
		}
		return './editor.worker.bundle.js';
	}
};

function catchError(source:string, error:unknown, markers:monaco.editor.IMarkerData[]) {
    try {
        markers.push({
            endColumn: (error as CodeError).position.endColNumber+1,
            endLineNumber: (error as CodeError).position.endLineNumber,
            message: (error as CodeError).message,
            severity: monaco.MarkerSeverity.Error,
            startColumn: (error as CodeError).position.startColNumber+1,
            startLineNumber: (error as CodeError).position.startLineNumber+1,
            source,
        });
    } catch {
        throw error;
    }
}

export function getProgram(code:string, markers:monaco.editor.IMarkerData[]) {
    markers.pop();
    const parser = new CodeParser(code);
    try {
        const program = parser.parse();
        const validator = new CodeValidator(program);
        try {
            validator.validate();
            return program;
        } catch (error) {
            catchError("TMValidator", error, markers);
        }
    } catch (error) {
        catchError("TMParser", error, markers);
    }
    return undefined;
}