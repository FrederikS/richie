import React from 'react';
import { Entity } from 'draft-js';

const Image = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const { src, title } = entity.getData();
    return (
        <img src={src} title={title} alt={title} />
    );
};

Image.propTypes = {
    block: React.PropTypes.object.isRequired
};

export default Image;
