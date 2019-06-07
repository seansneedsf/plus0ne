import * as React from 'react';

interface IThemeColorClassProps {
    themeColorClass?: string
}
class ContentContainer extends React.Component<IThemeColorClassProps>{
    render(){
        return(
            <div className={`main-content-container ${this.props.themeColorClass?this.props.themeColorClass:''}`}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentContainer;