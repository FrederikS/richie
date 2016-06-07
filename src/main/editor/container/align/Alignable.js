import React from 'react';
import ActionBar from '../../components/action/ActionBar';

class Alignable extends React.Component {

    constructor(props) {
        super(props);
        this.alignLeft = () => this._alignLeft();
        this.alignCenter = () => this._alignLeft();
        this.alignRight = () => this._alignLeft();
        this.showActionBar = () => this._showActionBar();

        this.state = {
            showActionBar: false
        };
    }

    _alignLeft() {}

    _alignCenter() {}

    _alignRight() {}

    _showActionBar() {
        this.setState({
            showActionBar: true
        });
    }

    render() {
        const { showActionBar } = this.state;
        return (
            <div>
                {showActionBar ? <ActionBar
                  onLeftClicked={this.alignLeft}
                  onCenterClicked={this.alignCenter}
                  onRightClicked={this.alignRight}
                /> : false}
                <div ref="alignable" onClick={this.showActionBar}>
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
