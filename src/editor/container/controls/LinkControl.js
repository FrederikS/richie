import React from 'react';
import { Entity } from 'draft-js';
import IconButton from 'material-ui/IconButton';
import LinkIcon from 'material-ui/svg-icons/content/link';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { findLinkEntities } from '../../decorators/LinkDecorator';
import Snackbar from 'material-ui/Snackbar';

function findLinkEntityRangesIn(blockContent) {
    const entityRanges = [];
    findLinkEntities(blockContent, (start, end) => {
        entityRanges.push({ start, end });
    });
    return entityRanges;
}

function matchesExactly(selectionState, entityRange) {
    return selectionState.getStartOffset() === entityRange.start &&
        selectionState.getEndOffset() === entityRange.end;
}

class LinkControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            url: '',
            showLinkError: false
        };
        this.toggleLink = () => this._toggleLink();
        this.setUrl = (e) => this._setUrl(e);
        this.handleOpen = () => this._handleOpen();
        this.handleClose = () => this._handleClose();
        this.confirmLink = (e) => this._confirmLink(e);
        this.closeLinkError = () => this._closeLinkError();
    }

    _toggleLink() {
        const { url } = this.state;
        const entityKey = url ? Entity.create('LINK', 'MUTABLE', { href: url }) : null;
        this.props.onToggle(entityKey);
        this.handleClose();
    }

    _confirmLink(e) {
        if (e.keyCode === 13) {
            this.toggleLink();
        }
    }

    _setUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

    _handleClose() {
        this.setState({
            open: false
        });
    }

    _handleOpen() {
        if (!this.props.editorState.getSelection().isCollapsed()) {
            this.setState({
                open: true,
                url: this._getCurrentUrl()
            }, () => {
                this.refs['url-input'].focus();
            });
        } else {
            this.setState({
                showLinkError: true
            });
        }
    }

    _closeLinkError() {
        this.setState({
            showLinkError: false
        });
    }

    _getCurrentUrl() {
        let url;
        const { editorState } = this.props;
        const selection = editorState.getSelection();
        const blockContent = editorState.getCurrentContent()
                                .getBlockForKey(selection.getAnchorKey());
        const linkEntityRanges = findLinkEntityRangesIn(blockContent);
        if (linkEntityRanges.length === 1 && matchesExactly(selection, linkEntityRanges[0])) {
            const entityKey = blockContent.getEntityAt(0);
            const entity = entityKey ? Entity.get(entityKey) : null;
            url = entity && entity.getType() === 'LINK' ? entity.getData().href : '';
        } else {
            url = '';
        }
        return url;
    }

    render() {
        const actions = [
            <FlatButton
              label="Cancel"
              primary
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary
              keyboardFocused
              onTouchTap={this.toggleLink}
            />
        ];
        return (
            <div>
                <IconButton
                  onClick={this.handleOpen}
                  tooltip="Insert Link"
                  tooltipPosition="top-center"
                >
                    <LinkIcon color="#999" />
                </IconButton>
                <Dialog
                  title="Add Link"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                    <TextField
                      ref="url-input"
                      hintText="Enter an url"
                      onChange={this.setUrl}
                      fullWidth
                      value={this.state.url}
                      onKeyDown={this.confirmLink}
                    />
                </Dialog>
                <Snackbar
                  open={this.state.showLinkError}
                  message="Select a text to link it."
                  autoHideDuration={3000}
                  onRequestClose={this.closeLinkError}
                />
            </div>
        );
    }
}

LinkControl.propTypes = {
    editorState: React.PropTypes.object.isRequired,
    onToggle: React.PropTypes.func
};

LinkControl.defaultProps = {
    onToggle: () => {}
};

export default LinkControl;
