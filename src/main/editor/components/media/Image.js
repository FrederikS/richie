import React from 'react';

const Image = (props) => <img {...props} alt={props.title} />;

Image.propTypes = {
    src: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    draggable: React.PropTypes.bool
};

Image.defaultProps = {
    draggable: true
};

export default Image;
