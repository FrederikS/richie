import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

const ActionBar = (props) => {
    const { onLeftClicked, onCenterClicked, onRightClicked, selectedIndex } = props;
    return (
        <Tabs initialSelectedIndex={selectedIndex}>
            <Tab label="left" onActive={onLeftClicked} />
            <Tab label="center" onActive={onCenterClicked} />
            <Tab label="right" onActive={onRightClicked} />
        </Tabs>
    );
};

ActionBar.propTypes = {
    onLeftClicked: React.PropTypes.func.isRequired,
    onCenterClicked: React.PropTypes.func.isRequired,
    onRightClicked: React.PropTypes.func.isRequired,
    selectedIndex: React.PropTypes.number
};

export default ActionBar;
