import React from 'react';
import { Entity } from 'draft-js';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import PhotoIcon from 'material-ui/svg-icons/editor/insert-photo';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

class ImageControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            src: '',
            title: '',
            fileName: ''
        };

        this.handleOpen = () => this._handleOpen();
        this.setTitle = (e) => this._setTitle(e);
        this.handleFiles = (e) => this._handleFiles(e);
        this.insertImage = () => this._insertImage();
        this.handleClose = () => this._handleClose();
        this.confirmTitle = (e) => this._confirmTitle(e);
    }

    _handleOpen() {
        this.setState({
            open: true
        });
    }

    _handleClose() {
        this.setState({
            open: false
        });
    }

    _setTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    _handleFiles(e) {
        const imageFile = e.target.files[0];
        this.props.handleImageFile(imageFile, (src) => {
            this.setState({
                src,
                fileName: imageFile.name
            }, () => this.refs['img-title'].focus());
        });
    }

    _insertImage() {
        const { src, title } = this.state;
        const entityKey = Entity.create('IMAGE', 'IMMUTABLE', { src, title });
        this.props.onImageAdd(entityKey);
        this.handleClose();
    }

    _confirmTitle(e) {
        if (e.keyCode === 13) {
            this.insertImage();
        }
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
              onTouchTap={this.insertImage}
            />
        ];
        return (
            <span>
                <IconButton
                  onTouchTap={this.handleOpen}
                  tooltip="Insert Image"
                  tooltipPosition="top-center"
                >
                    <PhotoIcon color="#999" />
                </IconButton>
                <Dialog
                  title="Add Image"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                    <div className={styles.row}>
                        <TextField
                          name="filename"
                          ref="img-path"
                          className={styles.growItem}
                          value={this.state.fileName}
                          disabled
                        />
                        <FlatButton
                          label="Choose image"
                          labelPosition="before"
                          icon={<UploadIcon />}
                        >
                            <input
                              type="file"
                              onChange={this.handleFiles}
                              accept="image/*"
                              max="1"
                              className={styles.fileInput}
                            />
                        </FlatButton>
                    </div>
                    <TextField
                      ref="img-title"
                      hintText="Enter an image-title"
                      onChange={this.setTitle}
                      fullWidth
                      value={this.state.title}
                      onKeyDown={this.confirmTitle}
                    />
                </Dialog>
            </span>
        );
    }
}

ImageControl.propTypes = {
    onImageAdd: React.PropTypes.func,
    handleImageFile: React.PropTypes.func.isRequired
};

ImageControl.defaultProps = {
    onImageAdd: () => {}
};

export default ImageControl;
