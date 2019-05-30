import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
import TextField from '@material-ui/core/TextField';
import axios from "axios";


const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

export interface IInviteEdit {
    message: string,
    lightTheme: boolean,
    eventId: string,
}
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
    handlerAddEmail=()=>{
        if(this.state.guestEmail.length){
            axios.post(`http://localhost:8000/api/event/guest`,{
                Id: this.props.eventId,
                email: this.state.guestEmail
            }).then(result => {
                console.log("Add guest result: ", result);
                this.setState({guestEmail:""});
            }).catch(error => {
                console.log("Add guest error: ", error);
            })
        }
        console.log("Add a guest email: ", this.props.eventId, this.state.guestEmail);
    }
    render(){
        return(
            <div className="message-container message-container-user-edit">
                <Paper className={`message-content-container message-edit-field ${this.props.lightTheme ? 'host-invite-light' : 'host-invite-dark'}`}>
                    {
                        this.state.showInput ? 
                        <span onClick={this.switchField}
                            className="message-content typographic-color-light">{ this.props.message }</span>
                        :
                        <TextField
                            placeholder="Add a guest."
                            value={this.state.guestEmail}
                            onChange={(e)=>this.handleTextChange(e)}
                            type="email"
                            className={`${this.props.lightTheme ? 'typographic-color-light' : 'typographic-color-dark'}`}
                        />
                    }
                </Paper>
                <div className="message-avatar-container edit-avatar-container"
                    onClick={this.handlerAddEmail}>
                    <CustomAvatar 
                        themeColor={`${this.props.lightTheme ? 'host-invite-avatar-light' : 'host-invite-avatar-dark'}`}
                        avatarName="botAdd"
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(InviteEdit);