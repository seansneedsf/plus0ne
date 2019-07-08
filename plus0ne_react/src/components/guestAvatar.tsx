import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import HighlightOff from '@material-ui/icons/HighlightOff';
import HelpOutline from '@material-ui/icons/HelpOutline';

interface IGuestAvatarProps{
    email: string;
    response: string;
}
class GuestAvatar extends React.Component<IGuestAvatarProps>{
    componentDidMount(){
        console.log("here is the user response:",this.props.response)
    }
    render(){
        return(
                <div className="guest-response__container">
                    <Avatar style={{'width':'44px','height':'44px'}}>
                        <img src={`https://api.adorable.io/avatars/44/${this.props.email}`} style={{'pointerEvents': 'none'}}/>
                    </Avatar>
                    <div className="email-address">
                        { this.props.email }
                    </div>
                    <div className="status">
                        { 
                            (()=>{
                                switch(this.props.response.toString()){
                                    case "-1":
                                        return <HelpOutline/>;
                                    case "0":
                                        return <HighlightOff/>;
                                    case "1":
                                        return <CheckCircleOutline/>
                                }
                                return null;
                            })()
                        }
                    </div>
                </div>
        );
    }
}
export default GuestAvatar;