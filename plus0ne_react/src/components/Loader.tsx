import * as React from 'react';

export interface ILoaderProps{
    showLoader: boolean;
}
class Loader extends React.Component<ILoaderProps>{
    render(){
        return(
            <div className="loader-container">
                {
                    this.props.showLoader ?
                        <div className="loader">
                            <div id="ld">
                                <div/>                    
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                    :
                    <div/>   
                }           
            </div>
        );
    }
}

export default Loader;