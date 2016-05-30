import React from 'react';
import { getBlockStyle } from '../../components/controls/BlockStyleControls';
import '../../styles/editor.global.css';
import LinkDecorator from '../../decorators/LinkDecorator';
import { blockRenderer } from '../../renderer/BlockRenderer';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        const editorState = props.rawContent ?
            EditorState.createWithContent(convertFromRaw(props.rawContent), LinkDecorator) :
            EditorState.createEmpty(LinkDecorator);
        this.state = { editorState };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rawContent) {
            const newContent = convertFromRaw(nextProps.rawContent);
            this.setState({
                editorState: EditorState.createWithContent(newContent, LinkDecorator)
            });
        }
    }

    render() {
        return (
            <Editor
              blockRendererFn={blockRenderer}
              blockStyleFn={getBlockStyle}
              editorState={this.state.editorState}
              spellCheck
              readOnly
            />
        );
    }
}

Preview.propTypes = {
    rawContent: React.PropTypes.object
};

export default Preview;
