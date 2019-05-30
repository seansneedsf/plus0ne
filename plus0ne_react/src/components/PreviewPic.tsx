import * as React from 'react';
import Loader from "./Loader";

class PreviewPic extends React.Component{
    state={
        picLoaded: false,
    }
    handlePicLoading=()=>{
        return this.setState({picLoaded: true});
    }
    render(){
        return(
            <div className="preview-pic-loader-container">
                <img src="https://source.unsplash.com/335x180/?nature" 
                    onLoad={this.handlePicLoading}
                    className={`${this.state.picLoaded ? 'preview-image':'hide-preview-image'}`}/> 
                <Loader showLoader={!this.state.picLoaded}/>
            </div>
        );
    }
}
export default PreviewPic;