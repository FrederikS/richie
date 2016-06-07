import React from 'react';
import StyleButton from './StyleButton';
import styles from './styles.css';

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' }
];

const InlineStyleControls = (props) => {
    const { currentStyle } = props;
    return (
        <div className={styles.controls}>
            {INLINE_STYLES.map(type =>
                <StyleButton
                  key={type.label}
                  active={currentStyle.has(type.style)}
                  label={type.label}
                  onToggle={props.onToggle}
                  style={type.style}
                />
            )}
        </div>
    );
};

InlineStyleControls.propTypes = {
    currentStyle: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

export default InlineStyleControls;
