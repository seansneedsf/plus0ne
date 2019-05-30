import * as React from 'react';

class AppBarContainer extends React.Component{
    render(){
        return(
            <div className="main-appbar-container">
                {this.props.children}
            </div>
        )
    }
}

export default AppBarContainer;