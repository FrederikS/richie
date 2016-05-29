import React from 'react';
import { Entity } from 'draft-js';

class Image extends React.Component {

    constructor(props) {
        super(props);
        this.onDragStart = (e) => this._onDragStart(e);
    }

    _onDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.setData('block-key', this.props.block.key);
    }

    render() {
        const { block, draggable } = this.props;
        const entity = Entity.get(block.getEntityAt(0));
        const { src, title } = entity.getData();
        return (
            <img
              src={src}
              title={title}
              alt={title}
              draggable={draggable}
              onDragStart={this.onDragStart}
            />
        );
    }

}

Image.propTypes = {
    block: React.PropTypes.object.isRequired,
    draggable: React.PropTypes.bool
};

Image.defaultProps = {
    draggable: true
};

export default Image;
