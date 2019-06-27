import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
// import PreviewPic from "./PreviewPic";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

interface IPreviewMiniProps {
    lightTheme: boolean,
    avatarName: string,
    name: string,
    address: string,
    eventId: string,
    eventDate: string,
    eventTime: string
}
class PreviewMini extends React.Component<IPreviewMiniProps, {}>{
    static defaultProps = {
        avatarName: "bot"
    };
    handlePreview = () => {
        location.href=`/event/${this.props.eventId}`;
    }
    render(){
        return(
            <div className="message-container preview-mini-container"
                onClick={this.handlePreview}>
                <div className="message-avatar-container">
                    <CustomAvatar 
                        themeColor={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'} ${this.props.avatarName==='bot'?'host-invite-avatar-dark':''}`}
                        avatarName={this.props.avatarName}
                    />
                </div>
                <Paper className={`message-content-container preview-mini-content-container ${this.props.lightTheme ? 'message-content-light' : 'message-content-dark'}`}>
                    <div className="preview-image-background-container">
                        <div className="preview-mini-header">
                            <div className="preview-mini-date-container">
                                <span>{this.props.eventDate}</span>
                            </div>
                            <div className="preview-mini-icon-container">
                                <img src={require("../assets/plus0ne_logo.png")} style={{'width':'66px', 'height':'66px'}}/>
                            </div>
                            <div className="preview-mini-time-container">
                                <span>{this.props.eventTime}</span>
                            </div>
                        </div>
                        <div className="preview-mini-body">
                            <div className="preview-mini-title">
                                { this.props.name }
                            </div>
                            <div className="preview-mini-address">
                                { this.props.address }
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PreviewMini);