import React from 'react';
import ReactDOM from 'react-dom';
import ActionBar from '../../components/action/ActionBar';
import styles from './styles.css';

class Alignable extends React.Component {

    constructor(props) {
        super(props);
        this.alignLeft = () => this._alignLeft();
        this.alignCenter = () => this._alignCenter();
        this.alignRight = () => this._alignRight();
        this.showActionBar = () => this._showActionBar();

        this.state = { showActionBar: false };
    }

    componentDidMount() {
        this.eventListener = (e) => {
            const domNode = ReactDOM.findDOMNode(this);
            if (!domNode.contains(e.target)) {
                this.setState({ showActionBar: false });
            }
        };
        document.addEventListener('click', this.eventListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.eventListener);
    }

    _showActionBar() {
        this.setState({
            showActionBar: true
        });
    }

    render() {
        const { showActionBar } = this.state;
        return (
            <div className={styles.alignable}>
                {showActionBar ? <ActionBar
                  className={styles.actionBar}
                  selectedIndex={['left', 'center', 'right'].indexOf(this.props.alignment)}
                  onLeftClicked={() => this.props.onAlign('left')}
                  onCenterClicked={() => this.props.onAlign('center')}
                  onRightClicked={() => this.props.onAlign('right')}
                /> : false}
                <div ref="alignable" onClick={this.showActionBar}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

Alignable.propTypes = {
    children: React.PropTypes.node.isRequired,
    onAlign: React.PropTypes.func,
    alignment: React.PropTypes.string
};

Alignable.defaultProps = {
    onAlign: () => {}
};

export default Alignable;
