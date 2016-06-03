import React from 'react';
import { Entity } from 'draft-js';
import Image from '../../components/entities/Image';
import Types from '../../components/entities/constants/Types';
import Resizable from '../../container/Resizable';

class AtomicBlock extends React.Component {

    constructor(props) {
        super(props);
        this.onResize = (width, height) => this._onResize(width, height);
        this.onDragStart = (e) => this._onDragStart(e);
    }

    _onResize(width, height) {
        const { editable } = this.props.blockProps;
        if (editable) {
            const entityKey = this.props.block.getEntityAt(0);
            Entity.mergeData(entityKey, { width, height });
        }
    }

    _onDragStart(e) {
        e.dataTransfer.effectAllowed = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.dropEffect = 'move'; // eslint-disable-line no-param-reassign
        e.dataTransfer.setData('block-key', this.props.block.key);
    }

    _renderComponent(Component) {
        const { editable } = this.props.blockProps;
        return editable ? <Resizable onResize={this.onResize}>{Component}</Resizable> : Component;
    }

    render() {
        const { editable } = this.props.blockProps;
        const entity = Entity.get(this.props.block.getEntityAt(0));
        const type = entity.getType();
        switch (type) {
            case Types.IMAGE: {
                const { src, title, width, height } = entity.getData();
                return this._renderComponent(
                    <Image
                      src={src}
                      title={title}
                      width={width}
                      height={height}
                      onDragStart={this.onDragStart}
                      draggable={editable}
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
