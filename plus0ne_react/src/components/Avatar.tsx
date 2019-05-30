import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';

export interface IAvatarProps{
    themeColor?: string,
    avatarName: string
}
class CustomAvatar extends React.Component<IAvatarProps>{
    render(){
        return(
            <Avatar style={{'width':'44px','height':'44px'}} className={this.props.themeColor}>
                <img src={require(`../assets/${this.props.avatarName}.png`)} style={{'pointerEvents': 'none'}}/>
            </Avatar>
        );
    }
}
export default CustomAvatar;