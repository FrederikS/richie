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
        default:
            return null;
    }
}

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
    return (
        <div className={styles.controls}>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                  key={type.label}
                  active={type.style === blockType}
                  label={type.label}
                  onToggle={props.onToggle}
                  style={type.style}
                />
            )}
        </div>
    );
};

BlockStyleControls.propTypes = {
    editorState: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

export default BlockStyleControls;
