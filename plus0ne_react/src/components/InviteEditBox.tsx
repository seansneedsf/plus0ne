import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import Notifications, {notify} from "react-notify-toast";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

export interface IInviteEdit {
    message: string,
    lightTheme: boolean,
    eventId: string,
}
const ENTER_KEY = "Enter";
const notificationColor = { background: '#0E1717', text: "#FFFFFF" };
const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class InviteEdit extends React.Component<IInviteEdit>{
    state={
        guestEmail:"",
        showInput: true,
    }
    switchField = () => {
        this.setState({showInput: false})
    }
    handleTextChange = (e:any) => {
        this.setState({guestEmail:e.target.value});
    }
    showNotification=(text:string)=>{
        notify.show(text, "custom", 5000, notificationColor);
    }
    handlerAddEmail=(e:any)=>{
        if(e.key && e.key !== ENTER_KEY){
                return;
        }
        if(this.state.guestEmail.length){
            if(emailRegex.test(String(this.state.guestEmail).toLowerCase())){
                axios.put(`http://localhost:8000/api/event/guest`,{
                    id: this.props.eventId,
                    email: this.state.guestEmail
                }).then(result => {
                    console.log("Add guest result: ", result);
                    this.setState({guestEmail:""}, ()=>{
                        this.showNotification("Guest Invited!");
                    });
                }).catch(error => {
                    this.showNotification("Service is not available, please try again later.");
                    console.log("Add guest error: ", error);
                })
            }else{
                console.log("Please enter valid email address!");
                this.showNotification("Please enter a valid email address!");
            }
        }else{
            console.log("Email can not be empty!")
            this.showNotification("Email address cannot be empty!");
        }
        console.log("Add a guest email: ", this.props.eventId, this.state.guestEmail);
    }
    render(){
        return(
            <div className="message-container message-container-user-edit">
                <Notifications options={{top: '56px', width:'80%'}}/>
                <Paper className={`message-content-container message-edit-field invite-edit-border ${this.props.lightTheme ? 'host-invite-light' : 'host-invite-dark'}`}>
                    {
                        this.state.showInput ? 
                        <span onClick={this.switchField}
                            className="message-content typographic-color-light">{ this.props.message }</span>
                        :
                        <TextField
                            placeholder="Guest email address."
                            value={this.state.guestEmail}
                            onChange={(e)=>this.handleTextChange(e)}
                            onKeyUp={(e) => this.handlerAddEmail(e)}
                            type="email"
                            className={`invite-guest-edit-field ${this.props.lightTheme ? 'typographic-color-light' : 'typographic-color-light'}`}
                        />
                    }
                </Paper>
                <div className="message-avatar-container edit-avatar-container"
                    onClick={this.handlerAddEmail}>
                    <CustomAvatar 
                        themeColor={`${this.props.lightTheme ? 'host-invite-avatar-light' : 'host-invite-avatar-dark'} invite-edit-border`}
                        avatarName="botAdd"
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(InviteEdit);