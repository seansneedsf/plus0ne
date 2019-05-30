import * as React from 'react';

export interface IThemeColorClassProps {
    themeColorClass?: string
}
class PaddingContainer extends React.Component<IThemeColorClassProps>{        
    render(){
        return(
            <div className={`padding-12-container ${this.props.themeColorClass?this.props.themeColorClass:''}`}>
                {this.props.children}
            </div>
        )
    }
}

export default PaddingContainer;