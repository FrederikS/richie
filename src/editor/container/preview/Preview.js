import React from 'react';
import { getBlockStyle } from '../../components/controls/BlockStyleControls';
import '../../styles/editor.global.css';
import LinkDecorator from '../../decorators/LinkDecorator';
import { blockRenderer } from '../../renderer/BlockRenderer';
import { Editor, EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import setEntitiesNonEditable from './utils/setEntitiesNonEditable';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.decorator = new CompositeDecorator([LinkDecorator]);
        const editorState = props.rawContent ?
            EditorState.createWithContent(convertFromRaw(props.rawContent), this.decorator) :
            EditorState.createEmpty(this.decorator);
        this.state = { editorState };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rawContent) {
            const contentWithReadOnlyEntities = setEntitiesNonEditable(nextProps.rawContent);
            const newContent = convertFromRaw(contentWithReadOnlyEntities);
            this.setState({
                editorState: EditorState.createWithContent(newContent, this.decorator)
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
