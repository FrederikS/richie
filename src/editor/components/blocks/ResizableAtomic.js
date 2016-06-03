import React from 'react';
import { Entity } from 'draft-js';
import Image from '../../components/entities/Image';
import Types from '../../components/entities/constants/Types';
import styles from './styles.css';
import ReactDOM from 'react-dom';
import interact from 'interact.js';
import classNames from 'classnames/bind';
const classNamesWithStyles = classNames.bind(styles);

class AtomicBlock extends React.Component {

    constructor(props) {
        super(props);
        this.onDragStart = (e) => this._onDragStart(e);
        this.onDragEnd = (e) => this._onDragEnd(e);
        this.onResize = (width, height) => this._onResize(width, height);
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
                this.onResize(width, height);
            })
            .on('move', (event) => {
                const target = event.target;
                target.style.cursor = document.getElementsByTagName('html')[0].style.cursor;
            });
    }

    _onDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.setData('block-key', this.props.block.key);
    }

    _onResize(width, height) {
        const { editable } = this.props.blockProps;
        if (editable) {
            const entityKey = this.props.block.getEntityAt(0);
            Entity.mergeData(entityKey, { width, height });
        }
    }

    _startEdit() {
        const { editable } = this.props.blockProps;
        if (editable) {
            this.setState({ editMode: true }, this.enableResizable);
        }
    }

    render() {
        const { editMode } = this.state;
        const entity = Entity.get(this.props.block.getEntityAt(0));
        const type = entity.getType();
        const className = classNamesWithStyles({
            selected: this.state.editMode
        });
        switch (type) {
            case Types.IMAGE: {
                const { src, title, width, height } = entity.getData();
                return (
                    <Image
                      className={className}
                      src={src}
                      title={title}
                      width={width}
                      height={height}
                      draggable={editMode}
                      onClick={this.startEdit}
                      onDragStart={this.onDragStart}
                    />
                );
            }
            default:
                return '';
        }
    }
}

AtomicBlock.propTypes = {
    block: React.PropTypes.object.isRequired,
    blockProps: React.PropTypes.object.isRequired
};

export default AtomicBlock;
