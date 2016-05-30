import Editor from '../index';
import ReactDOM from 'react-dom';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const handleImageFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
};

ReactDOM.render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Editor handleImageFile={handleImageFile} />
    </MuiThemeProvider>
), document.getElementById('app'));
