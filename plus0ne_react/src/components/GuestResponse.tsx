import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

interface IGuestResponse {
    message: string,
    lightTheme: boolean
}
class GuestResponse extends React.Component<IGuestResponse>{
    render(){
        return(
            <div className="margin-top-6 preview-user-eidt-container">
                <div className="message-container message-container-guest-response" style={{'width':`${this.props.message.length*10}px`}}>
                    <Paper className={`message-content-container message-edit-field ${this.props.lightTheme ? 'host-invite-light' : 'host-invite-dark'}`}>
                        <span className="message-content typographic-color-light">{ this.props.message }</span>
                    </Paper>
                    <div className="message-avatar-container edit-avatar-container">
                        <CustomAvatar 
                            themeColor={`${this.props.lightTheme ? 'host-invite-avatar-light' : 'host-invite-avatar-dark'}`}
                            avatarName="bot"
                        />
                    </div>
                </div>
            </div>    
        );
    }
}

export default connect(mapStateToProps)(GuestResponse);