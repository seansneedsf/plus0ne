import * as React from 'react';
import Loader from "./Loader";
import Fab from '@material-ui/core/Fab';
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import ImageUploader from "./ImageUploader";
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface IPreviewPic{
    event?: any;
    noUpload?: boolean;
}
class PreviewPic extends React.Component<IPreviewPic, {}>{
    static defaultProps ={
        noUpload:false,
    }
    state={
        picLoaded: false,
        open: false
    }
    handlePicLoading=()=>{
        return this.setState({picLoaded: true});
    }
    handleClickOpen = () => {
        this.setState({open: true});
    }
    handleDialogClose = ()=>{
        this.setState({open: false});
    }
    render(){
        return(
            <div className="preview-pic-loader-container">
                {
                    this.props.noUpload ?
                    null
                    :
                    <div className="preview-pic__custom-pic-selector">
                        <Fab style={{'width':'44px','height':'44px'}} 
                            onClick={this.handleClickOpen}
                        > 
                            <AddPhotoAlternate/>
                        </Fab>
                        <Dialog
                            maxWidth="xs"
                            aria-labelledby="confirmation-dialog-title"
                            open={this.state.open}
                            className="image-uploader__dialog"
                            >
                            <DialogTitle>Upload Custom Image</DialogTitle>
                            <DialogContent dividers={true}>                        
                                <ImageUploader eventId={this.props.event.id}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDialogClose}>
                                    Done
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
                <img src={this.props.event.customImage?this.props.event.customImage:"https://source.unsplash.com/335x180/?nature"}
                    onLoad={this.handlePicLoading}
                    id="preview-image"
                    className={`${this.state.picLoaded ? 'preview-image':'hide-preview-image'}`}/> 
                <Loader showLoader={!this.state.picLoaded}/>
            </div>
        );
    }
}
export default PreviewPic;