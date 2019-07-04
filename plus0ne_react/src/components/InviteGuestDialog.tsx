import * as React from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import GuestAvatar from "./guestAvatar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import axios from "axios";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface IGuest{
    email: string;
    response: string;
}
interface IInviteGuestDialogProps{
    eventId: string;
    lightTheme: boolean;
}
interface IState{
    open: boolean;
    email: string;
    guests: IGuest[] ;
    coming: number;
    invited: number;
    notificationText: string;
    snackBaropen: boolean;
}

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
class InviteGuestDialog extends React.Component<IInviteGuestDialogProps, IState>{
    state:IState = {
        open: false,
        email:"",
        guests: [],
        coming:0,
        invited: 0,
        notificationText: "",
        snackBaropen: false,
    }
    handleOk = () => {
        this.setState({open: false});
    }
    setGuests = (result:any) => {
        const event = result.data.event;
        const guestNumber = event.guests.length;
        const comingNumber = event.guests.filter((guest:IGuest) => guest.response.toString() === "1").length;
        this.setState({guests: event.guests, coming: comingNumber, invited: guestNumber});
    }
    handleClickOpen = () => {
        axios.get(`http://localhost:8000/api/event/${this.props.eventId}`)
            .then(result => {
                this.setGuests(result);
            })
            .catch(error => {
                console.log("Error", "Get event error!");
            });
        this.setState({open: true});
    }
    handleEmailChange = (val:string) => {
        this.setState({email: val});
    }
    handleEmailSubmit = (e:any) =>{
        if(e.key === "Enter"){
            if(this.state.email.length){
                if (emailRegex.test(String(this.state.email).toLowerCase())) {
                    axios.put(`http://localhost:8000/api/event/guest`, {
                        id: this.props.eventId,
                        email: this.state.email
                    })
                    .then(result => {
                        console.log("Update email call back result: ",result);
                        this.setState({ email: "" }, () => {
                            this.setGuests(result);
                            this.showNotification("Guest Invited.");
                        });
                    })
                    .catch(error => {
                        this.showNotification(
                            "Service is not available, please try again later."
                        );
                    });
                }else{
                    this.showNotification(
                        "Please enter a correct email to continue."
                    );
                }
            }else{
                this.showNotification(
                    "Please enter an email to continue."
                );
            }
        }
    }
    handleSnackBarClose = () => {
        this.setState({snackBaropen: false});
    }
    showNotification = (text: string) => {
        this.setState({ snackBaropen: true, notificationText: text });
    };
    render(){
        return(
            <div className="invite-guest__dialog">    
                <Button onClick={this.handleClickOpen}>Invite Guest</Button>
                <Dialog
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.open}
                    className={`${this.props.lightTheme ? 'light-theme__dialog':'dark-theme__dialog'}`}
                    >
                    <DialogTitle id="confirmation-dialog-title">Invite Guest</DialogTitle>
                    <DialogContent dividers={true}>
                        <div className="invite-guest__container">
                            <div className="invite-guest__input-container">
                                <Input
                                    placeholder="Enter your guest email"
                                    value={this.state.email}
                                    onChange={e => this.handleEmailChange(e.target.value)}
                                    onKeyUp={this.handleEmailSubmit}
                                    autoFocus={true}
                                />
                            </div>  
                            <div className="invite-guest__guest-detail-container">
                                {
                                    this.state.guests.map(
                                        (guest, idx) => { 
                                            return <GuestAvatar email={guest.email} response={guest.response} key={idx}/>;
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div className="invite-guest__status-container">
                            <span className="status">
                                {`${this.state.coming}/${this.state.invited}`}
                            </span>
                        </div>
                        <Button onClick={this.handleOk}>
                            <span className="status">
                                Done
                            </span>
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={this.state.snackBaropen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackBarClose}
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
                            onClick={this.handleSnackBarClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps)(InviteGuestDialog);