import React from 'react';
import { Entity } from 'draft-js';

const Link = (props) => {
    const { entityKey, children } = props;
    const { href } = Entity.get(entityKey).getData();
    return (
        <a href={href}>
            {children}
        </a>
    );
};

Link.propTypes = {
    entityKey: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
};

export default Link;
