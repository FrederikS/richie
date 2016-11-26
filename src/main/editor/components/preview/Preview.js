import React from 'react';
import { Editor, EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import { getBlockStyle } from '../../components/controls/BlockStyleControls';
import '../../styles/editor.global.css';
import LinkDecorator from '../../decorators/LinkDecorator';
import Atomic from '../blocks/Atomic';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.getBlockRenderer = block => this._getBlockRenderer(block);
        this.decorator = new CompositeDecorator([LinkDecorator]);
        const editorState = props.rawContent ?
            EditorState.createWithContent(convertFromRaw(props.rawContent), this.decorator) :
            EditorState.createEmpty(this.decorator);
        this.state = { editorState };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rawContent) {
            const newContent = convertFromRaw(nextProps.rawContent);
            this.setState({
                editorState: EditorState.createWithContent(newContent, this.decorator)
            });
        }
    }

    // eslint-disable-next-line class-methods-use-this
    _getBlockRenderer(block) {
        switch (block.getType()) {
            case 'atomic':
                return {
                    component: Atomic,
                    editable: false,
                    props: {
                        editable: false
                    }
                };
            default:
                return null;
        }
    }

    render() {
        return (
            <Editor
              blockRendererFn={this.getBlockRenderer}
              blockStyleFn={getBlockStyle}
              editorState={this.state.editorState}
              spellCheck
              readOnly
            />
        );
    }
}

Preview.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    rawContent: React.PropTypes.object
};

export default Preview;
