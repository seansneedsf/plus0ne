import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
import Input from "@material-ui/core/Input";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

interface IBotMessageProps {
    message: string;
    lightTheme: boolean;
    avatarName: string;
    messageDelay?: number;
    withInput?: boolean;
    readOnly?: boolean;
    changeListener?: any;
}
class BotMessage extends React.Component<IBotMessageProps, {}>{
    static defaultProps = {
        avatarName: "botCheck",
        messageDelay: 1000,
        withInput: false,
        readOnly: true
    };
    state={
        typing: true
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({typing: false})
        }, this.props.messageDelay);
    }

    render(){
        return(
            <div className="message-container">
                <div className="message-avatar-container">
                    <CustomAvatar 
                        themeColor={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'} ${this.props.avatarName==='bot'?'host-invite-avatar-dark':''}`}
                        avatarName={this.props.avatarName}
                    />
                </div>
                {
                    this.state.typing ?
                    <div className="typing-indicator">
                        <span/>
                        <span/>
                        <span/>
                    </div>
                    :    
                    <Paper className={`message-content-container description-text-area ${this.props.lightTheme ? 'message-content-light' : 'message-content-dark'}`}>
                        {
                            (this.props.withInput && !this.props.readOnly)?
                            <Input
                                style={{"fontSize":"14px", "fontWeight":"unset", "textAlign": "unset", "width": "100%"}}
                                disableUnderline={true}
                                multiline={true}
                                value={this.props.message=== "Event description." ? '' : this.props.message}
                                placeholder={ this.props.message ? this.props.message : "Event description." }
                                onChange={(e)=>this.props.changeListener(e, "description")}
                            />
                            :
                            <span className="message-content" style={{'color':'white'}}>{ this.props.message }</span>
                        }
                    </Paper>
                    
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(BotMessage);