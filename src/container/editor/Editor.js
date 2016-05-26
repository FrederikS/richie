import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BlockStyleControls, { getBlockStyle } from '../../components/controls/BlockStyleControls';
import InlineStyleControls from '../../components/controls/InlineStyleControls';
import styles from './styles.css';
import '../../styles/editor.global.css';
import LinkControl from './controls/LinkControl';
import LinkDecorator from '../../editor/LinkDecorator';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(LinkDecorator)
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
        this.toggleLink = (linkEntity) => this._toggleLink(linkEntity);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
        ));
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            inlineStyle
        ));
    }

    _toggleLink(linkEntity) {
        const { editorState } = this.state;
        this.onChange(RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            linkEntity
        ));
    }

    render() {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        const currentBlockType = editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();
        return (
            <div className={styles.editorRoot}>
                <BlockStyleControls
                  currentType={currentBlockType}
                  onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                  currentStyle={editorState.getCurrentInlineStyle()}
                  onToggle={this.toggleInlineStyle}
                />
                <LinkControl editorState={editorState} onToggle={this.toggleLink} />
                <div className={styles.editor} onClick={this.focus}>
                    <Editor
                      blockStyleFn={getBlockStyle}
                      editorState={editorState}
                      handleKeyCommand={this.handleKeyCommand}
                      onChange={this.onChange}
                      ref="editor"
                      spellCheck
                    />
                </div>
            </div>
        );
    }
}

export default MyEditor;
