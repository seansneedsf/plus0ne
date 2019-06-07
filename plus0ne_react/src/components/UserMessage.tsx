import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

interface IBotMessageProps {
    message: string,
    lightTheme: boolean,
    avatarName: string
}
class BotMessage extends React.Component<IBotMessageProps, {}>{
    static defaultProps = {
        avatarName: "bot"
    };
    // style={{'width':`${this.props.message.length*15.5}px`}}
    render(){
        return(
            <div className="user-message-container">
                <div className="message-container message-container__user-response" 
                    style={{'width':`${(this.props.message.length)*15.2}px`}}>
                    <Paper className={`message-content-container message-content-container__user-response ${this.props.lightTheme ? 'host-invite-avatar-light' : 'host-invite-avatar-dark'}`}>
                        <span className="message-content message-content-response" style={{'color':'white'}}>{ this.props.message }</span>
                    </Paper>
                    <div className="message-avatar-container message-avatar-container__user-response">
                        <CustomAvatar 
                            themeColor={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'} ${this.props.avatarName==='bot'?'host-invite-avatar-dark':''}`}
                            avatarName={this.props.avatarName}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(BotMessage);