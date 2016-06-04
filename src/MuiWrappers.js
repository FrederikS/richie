import React from 'react';
import Editor from './editor/components/Editor';
import Preview from './editor/components/preview/Preview';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const MuiEditor = (props) => {
    const { handleImageFile, onChange } = props;
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Editor handleImageFile={handleImageFile} onChange={onChange} />
        </MuiThemeProvider>
    );
};

MuiEditor.propTypes = {
    handleImageFile: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func
};

MuiEditor.defaultProps = {
    onChange: () => {}
};

const MuiPreview = (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Preview rawContent={props.rawContent} />
    </MuiThemeProvider>
);

MuiPreview.propTypes = {
    rawContent: React.PropTypes.object
};

export { MuiEditor, MuiPreview };
