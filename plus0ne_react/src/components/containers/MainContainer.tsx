import * as React from 'react';

class MainContainer extends React.Component{        
    render(){
        return(
            <div className="main-container MuiPaper-elevation6">
                {this.props.children}
            </div>
        )
    }
}

export default MainContainer;