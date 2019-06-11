import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import CustomAvatar from "./Avatar";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

export interface IInviteEdit {
    message: string;
    lightTheme: boolean;
    eventId: string;
}
const ENTER_KEY = "Enter";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
class InviteEdit extends React.Component<IInviteEdit> {
    state = {
        guestEmail: "",
        showInput: true,
        open: false,
        notificationText: ""
    };
    switchField = () => {
        this.setState({ showInput: false });
    };
    handleTextChange = (e: any) => {
        this.setState({ guestEmail: e.target.value });
    };
    showNotification = (text: string) => {
        this.setState({ open: true, notificationText: text });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handlerAddEmail = (e: any) => {
        if (e.key && e.key !== ENTER_KEY) {
            return;
        }
        if (this.state.guestEmail.length) {
            if (emailRegex.test(String(this.state.guestEmail).toLowerCase())) {
                axios
                    .put(`http://localhost:8000/api/event/guest`, {
                        id: this.props.eventId,
                        email: this.state.guestEmail
                    })
                    .then(result => {
                        console.log("Add guest result: ", result);
                        this.setState({ guestEmail: "" }, () => {
                            this.showNotification("Guest Invited!");
                        });
                    })
                    .catch(error => {
                        this.showNotification(
                            "Service is not available, please try again later."
                        );
                        console.log("Add guest error: ", error);
                    });
            } else {
                console.log("Please enter valid email address!");
                this.showNotification("Please enter a valid email address!");
                this.setState({ guestEmail: "" });
            }
        } else {
            console.log("Email can not be empty!");
            this.showNotification("Email address cannot be empty!");
        }
        console.log(
            "Add a guest email: ",
            this.props.eventId,
            this.state.guestEmail
        );
    };
    render() {
        return (
            <div className="message-container message-container-user-edit">
                <Paper
                    className={`message-content-container message-edit-field invite-edit-border ${
                        this.props.lightTheme
                            ? "host-invite-light"
                            : "host-invite-dark"
                    }`}
                >
                    <TextField
                        placeholder={this.props.message}
                        value={this.state.guestEmail}
                        onChange={e => this.handleTextChange(e)}
                        onKeyUp={e => this.handlerAddEmail(e)}
                        type="email"
                        className={`invite-guest-edit-field ${
                            this.props.lightTheme
                                ? "typographic-color-light"
                                : "typographic-color-light"
                        }`}
                    />
                </Paper>
                <div className="message-avatar-container edit-avatar-container">
                    <CustomAvatar
                        themeColor={`${
                            this.props.lightTheme
                                ? "host-invite-avatar-light"
                                : "host-invite-avatar-dark"
                        } invite-edit-border`}
                        avatarName="botAdd"
                    />
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={
                        <span id="message-id">
                            {this.state.notificationText}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(InviteEdit);
