import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

const ActionBar = (props) => {
    const { onLeftClicked, onCenterClicked, onRightClicked } = props;
    return (
        <Tabs>
            <Tab label="left" onActive={onLeftClicked} />
            <Tab label="center" onActive={onCenterClicked} />
            <Tab label="right" onActive={onRightClicked} />
        </Tabs>
    );
};

ActionBar.propTypes = {
    onLeftClicked: React.PropTypes.func.isRequired,
    onCenterClicked: React.PropTypes.func.isRequired,
    onRightClicked: React.PropTypes.func.isRequired
};

export default ActionBar;
