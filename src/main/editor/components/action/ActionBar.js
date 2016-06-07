import React from 'react';

const ActionBar = (props) => (
    <div>
        <ul>
            <li onClick={props.onLeftClicked}>left</li>
            <li onClick={props.onCenterClicked}>center</li>
            <li onClick={props.onRightClicked}>right</li>
        </ul>
    </div>
);

ActionBar.propTypes = {
    onLeftClicked: React.PropTypes.func.isRequired,
    onCenterClicked: React.PropTypes.func.isRequired,
    onRightClicked: React.PropTypes.func.isRequired
};

export default ActionBar;
