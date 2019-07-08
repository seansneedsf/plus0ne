import * as React from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";
interface IImageUploadProps{
    eventId?: string;
}
class ImageUpload extends React.Component<IImageUploadProps> {
    state = {
        file: '',
        imagePreviewUrl: '',
        uploading: false,
        showUpload: false
    };

    handleSubmit = async (e:any) =>{
      e.preventDefault();
      this.setState({uploading: true});
      const imageFile:any = this.state.file;
      const formdata = new FormData();
      const options:any = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 340,
        useWebWorker: true,
        maxIteration: 20
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        compressedFile.name = `${this.props.eventId}.jpg`;
        formdata.append('name', compressedFile.name);
        formdata.append('eventId', this.props.eventId);
        formdata.append('file', compressedFile);
        axios({
            url: 'http://localhost:8000/api/event/upload-image',
            method: "post",
            data: formdata,
            headers: {
                'Content-Type': `multipart/form-data;`
            },
        }).then(result=>{
            const imageBase64 = result.data;
            document.getElementById("preview-image").setAttribute("src", imageBase64);
            this.setState({uploading: false});
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    handleImageChange(e:any) {
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
          showUpload: true
        });
      }
      reader.readAsDataURL(file)
    }
  
    render() {
      const {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="preview-text">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="custom-image-selection-container">
          <div className="image-uploader-controls">
            <input className="selected-image-input" 
              type="file" 
              onChange={(e:any)=>this.handleImageChange(e)} />
              {
                  this.state.showUpload?
                  <button className="submit-custom-upload-button" 
                    type="submit" 
                    onClick={(e:any)=>this.handleSubmit(e)}>Upload</button>
                    :
                    null
              }
          </div>
          <div className="custom-image-preview-container">
            {$imagePreview}
            {
                this.state.uploading?
                <div className="image-uploader__spinner">
                    <div className="sp sp-3balls"/>
                    <span>Uploading...</span>
                </div>:
                null
            }
            
          </div>
        </div>
      )
    }
  }

  export default ImageUpload;
    
