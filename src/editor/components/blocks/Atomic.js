import React from 'react';
import { Entity } from 'draft-js';
import Image from '../entities/Image';
import Types from '../entities/constants/Types';

class AtomicBlock extends React.Component {

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
        const entity = Entity.get(this.props.block.getEntityAt(0));
        const type = entity.getType();
        switch (type) {
            case Types.IMAGE: {
                const { src, title } = entity.getData();
                return <Image src={src} title={title} onDragStart={this.onDragStart} />;
            }
            default:
                return '';
        }
    }
}

AtomicBlock.propTypes = {
    block: React.PropTypes.object.isRequired
};

export default AtomicBlock;
