import React from 'react';
import ActionBar from '../../components/action/ActionBar';

class Alignable extends React.Component {

    constructor(props) {
        super(props);
        this.alignLeft = () => this._alignLeft();
        this.alignCenter = () => this._alignLeft();
        this.alignRight = () => this._alignLeft();
    }

    _alignLeft() {}

    _alignCenter() {}

    _alignRight() {}

    render() {
        return (
            <div>
                <ActionBar
                  onLeftClicked={this.alignLeft}
                  onCenterClicked={this.alignCenter}
                  onRightClicked={this.alignRight}
                />
                <div ref="alignable">
                    {this.props.children}
                </div>
            </div>
        );
    }

}

Alignable.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default Alignable;
