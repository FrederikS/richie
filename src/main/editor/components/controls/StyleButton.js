import React from 'react';
import styles from './styles.css';
import classNames from 'classnames/bind';
const classNamesWithStyles = classNames.bind(styles);

class StyleButton extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        const className = classNamesWithStyles(styles.styleButton, {
            activeButton: this.props.active
        });
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

StyleButton.propTypes = {
    active: React.PropTypes.bool,
    label: React.PropTypes.string,
    onToggle: React.PropTypes.func,
    style: React.PropTypes.string.isRequired
};

StyleButton.defaultProps = {
    active: false,
    onToggle: () => {}
};

export default StyleButton;
