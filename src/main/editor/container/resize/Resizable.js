import React from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import classNames from 'classnames/bind';
import styles from './styles.css';

const classNamesWithStyles = classNames.bind(styles);

class Resizable extends React.Component {

    constructor(props) {
        super(props);
        this.startEdit = () => this._startEdit();
        this.enableResizable = () => this._enableResizable();
        this.disableResizable = () => this._disableResizable();
        this.state = {
            editMode: false
        };
    }

    componentDidMount() {
        this.eventListener = (e) => {
            const domNode = ReactDOM.findDOMNode(this);
            if (e.target !== domNode) {
                this.setState({ editMode: false }, this.disableResizable);
            }
        };
        document.addEventListener('click', this.eventListener, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.eventListener);
    }

    _disableResizable() {
        const domNode = ReactDOM.findDOMNode(this);
        interact(domNode).unset();
    }

    _enableResizable() {
        const domNode = ReactDOM.findDOMNode(this);
        interact(domNode)
            .resizable({
                preserveAspectRatio: true,
                edges: { right: true, bottom: true }
            })
            .on('resizemove', (event) => {
                const target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0);
                let y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style
                target.style.width = `${event.rect.width}px`;
                target.style.height = `${event.rect.height}px`;

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    `translate(${x}px, ${y}px)`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            })
            .on('resizeend', (event) => {
                const width = event.target.width;
                const height = event.target.height;
                this.props.onResize(width, height);
            })
            .on('move', (event) => {
                const target = event.target;
                target.style.cursor = document.getElementsByTagName('html')[0].style.cursor;
            });
    }

    _startEdit() {
        this.setState({ editMode: true }, this.enableResizable);
    }

    render() {
        const { editMode } = this.state;
        const className = classNamesWithStyles({
            selected: editMode
        });
        const children = React.Children.only(this.props.children);
        return React.cloneElement(children, {
            className,
            onClick: this.startEdit
        });
    }
}

Resizable.propTypes = {
    children: React.PropTypes.node.isRequired,
    onResize: React.PropTypes.func
};

Resizable.defaultProps = {
    onResize: () => {}
};

export default Resizable;
