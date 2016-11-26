import React from 'react';
import StyleButton from './StyleButton';
import styles from './styles.css';

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' }
];

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return styles.blockquote;
        case 'code-block':
            return styles.code;
        case 'atomic':
            return styles.atomic;
        default:
            return null;
    }
}

const BlockStyleControls = (props) => {
    const { currentType } = props;
    return (
        <div className={styles.controls}>
            {BLOCK_TYPES.map(type =>
                <StyleButton
                  key={type.label}
                  active={type.style === currentType}
                  label={type.label}
                  onToggle={props.onToggle}
                  style={type.style}
                />
            )}
        </div>
    );
};

BlockStyleControls.propTypes = {
    currentType: React.PropTypes.string.isRequired,
    onToggle: React.PropTypes.func
};

export default BlockStyleControls;
