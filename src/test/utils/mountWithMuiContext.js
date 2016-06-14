import React from 'react';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function (node) {
    return mount(node, {
        context: { muiTheme: getMuiTheme() },
        childContextTypes: { muiTheme: React.PropTypes.object.isRequired }
    });
}
