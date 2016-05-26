import Editor from '../index';
import ReactDOM from 'react-dom';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Editor />
    </MuiThemeProvider>
), document.getElementById('app'));
