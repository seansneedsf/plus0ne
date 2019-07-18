import * as React from "react";
import MainContainer from "./containers/MainContainer";
import AppBarContainer from "./containers/AppBarContainer";
import ContentContainer from "./containers/ContentContainer";
import PaddingContainer from "./containers/PaddingContainer";
import {  DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppBar from "./AppBar";
import BotMessage from "./BotMessage";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import PreviewPic from "./PreviewPic";
import InviteEdit from "./InviteEditBox";
import axios from "axios";
import Input from "@material-ui/core/Input";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API_ORIGIN } from "../globals";

interface IUserProps {
    lightTheme: boolean;
    match: any;
}
interface IState {
    eventRef: IEvent;
    event: IEvent;
    id: string;
    open: boolean;
    notificationText: string;
    readOnly: boolean;
    openDialog: boolean;
    showFirstBotMessage: boolean;
    startDateTimeString: string;
    endDateTimeString: string;
    formatedStartDateTime: string;
    formatedEndDateTime: string;
}

export interface IEvent {
    name: string;
    date: string;
    time: string;
    address: string;
    guests: [];
    startDateTime: string;
    endDateTime: string;
    description: string;
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

const mapDispatchToProps = (dispatch: any) => ({});
class Preview extends React.Component<IUserProps, IState> {
    state: IState = {
        eventRef: {} as IEvent,
        event: {} as IEvent,
        id: this.props.match.params.id,
        open: false,
        notificationText: "",
        readOnly: true,
        openDialog: false,
        showFirstBotMessage: true,
        startDateTimeString: "",
        endDateTimeString: "",
        formatedStartDateTime: "",
        formatedEndDateTime: ""
    };
    showNotification = (text: string) => {
        this.setState({ open: true, notificationText: text });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    switchEditEvent = () => {
        this.setState({readOnly: false}, ()=>{
            this.showNotification("You can edit your event now!");
        });
    }
    handleDialogClose = () => {
        this.setState({openDialog: false})
    }
    handleStartDateChange = (val: any) => {
        const newEvent = {...this.state.event, startDateTime: val.toString()};
        this.setState({ event: newEvent }, ()=>{
            const dateFormat = require('dateformat');
            this.setState({
                formatedStartDateTime: dateFormat(this.state.event.startDateTime, "mmmm dS, h:MM TT"),
            });
        });
    }
    handleEndDateChange = (val: any) =>{
        const newEvent = {...this.state.event, endDateTime: val.toString()};
        this.setState({ event: newEvent }, ()=>{
            const dateFormat = require('dateformat');
            this.setState({
                formatedEndDateTime: dateFormat(this.state.event.endDateTime, "mmmm dS, h:MM TT"),
            });
        });
    }
    componentWillMount() {
        const eventId = this.state.id;
        axios
            .get(`${API_ORIGIN}/event/${eventId}`)
            .then(result => {
                const event = result.data.event;
                this.setState({
                    eventRef: { ...JSON.parse(JSON.stringify(event)) }
                });
                this.setState({ event: { ...event } }, () => {
                    this.setState({
                        startDateTimeString: event.startDateTime,
                        endDateTimeString: event.endDateTime
                    }, ()=>{
                        const dateFormat = require('dateformat');
                        this.setState({
                            formatedStartDateTime: dateFormat(this.state.startDateTimeString, "mmmm dS, h:MM TT"),
                            formatedEndDateTime: dateFormat(this.state.endDateTimeString, "mmmm dS, h:MM TT")
                        })
                    });
                });
            })
            .catch(error => {
                console.log("Get event error:", error);
            });
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                showFirstBotMessage: false
            });
        }, 5000);
    }

    handleTextFieldChange = (e: any, name: string) => {
        const currentVal = e.target.value;
        const oldEvent = this.state.event;
        oldEvent[name] = currentVal;
        this.setState({ event: { ...oldEvent } });
    };
    handleSave = () => {
        axios.put(`${API_ORIGIN}/event`, { ...this.state.event })
            .then(result => {
                this.setState({ eventRef: { ...this.state.event }, readOnly: true }, () => {
                    this.showNotification("Event detail updated!");
                });
            })
            .catch(error => {
                this.showNotification("Not able to save, try again later!");
            });
    };
    handleCancel = () => {
        this.setState({ event: { ...this.state.eventRef }, readOnly: true }, () => {
            const dateFormat = require('dateformat');
            this.setState({
                formatedStartDateTime: dateFormat(this.state.event.startDateTime, "mmmm dS, h:MM TT"),
                formatedEndDateTime: dateFormat(this.state.event.endDateTime, "mmmm dS, h:MM TT")
            });
            this.showNotification("Event detail reset!");
        });
    };
    handleNotifyGuests = () =>{
        this.setState({openDialog: true});
    }
    handleYes = () =>{
        this.setState({openDialog: false}, ()=>{
            axios.get(`${API_ORIGIN}/event/notify-guests/${this.state.id}`);
        });
    }
    render() {
        return (
            <MainContainer>
                <AppBarContainer>
                    <AppBar 
                        showRightIcon={true} 
                        saveChanges={this.handleSave}
                        cancelChanges={this.handleCancel}
                        readOnly={this.state.readOnly}
                        handleRightIconClick={this.switchEditEvent}
                        handleNotifyGuests={this.handleNotifyGuests}/>
                </AppBarContainer>
                <ContentContainer
                    themeColorClass={`${
                        this.props.lightTheme
                            ? "app-preview-light"
                            : "app-preview-dark"
                    }`}
                >
                    <PaddingContainer>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {
                                this.state.showFirstBotMessage ?
                                <BotMessage
                                    message={
                                        "Here’s your preview! You can customize it to your liking. Then, invite your first guest!"
                                    }
                                    messageDelay={0}
                                />
                                :
                                null
                            }
                            
                            <div className="margin-top-6">
                                <div className="preview-image-container">
                                    <PreviewPic event={this.state.event}/>
                                </div>
                            </div>
                            <div className="margin-top-6 date-time-container">
                                <Paper
                                    className={`date-time-item event-detail-item ${
                                        this.props.lightTheme
                                            ? "date-time-item-light"
                                            : "date-time-item-dark"
                                    }`}
                                >
                                    {
                                        
                                        this.state.readOnly ?
                                            <span>{ this.state.formatedStartDateTime }</span>
                                            :
                                            this.state.event.startDateTime ? 
                                                <DateTimePicker
                                                    autoOk={true}
                                                    disableFuture={false}
                                                    disablePast={true}
                                                    hideTabs={false}
                                                    ampm={true}
                                                    value={new Date(this.state.event.startDateTime)}
                                                    onChange={this.handleStartDateChange}
                                                    allowKeyboardControl={false}
                                                    emptyLabel={"Start date"}
                                                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                                                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                                                />
                                                :
                                                null
                                    }
                                </Paper>
                                <Paper
                                    className={`date-time-item event-detail-item ${
                                        this.props.lightTheme
                                            ? "date-time-item-light"
                                            : "date-time-item-dark"
                                    }`}
                                >
                                    {   
                                        this.state.readOnly ?
                                            <span>{ this.state.formatedEndDateTime }</span>
                                            :
                                            this.state.event.endDateTime ?
                                                <DateTimePicker
                                                    autoOk={true}
                                                    disableFuture={false}
                                                    disablePast={true}
                                                    hideTabs={false}
                                                    ampm={true}
                                                    value={new Date(this.state.event.endDateTime)}
                                                    onChange={this.handleEndDateChange}
                                                    allowKeyboardControl={false}
                                                    emptyLabel={"End date"}
                                                    minDate={new Date(this.state.event.startDateTime)}
                                                    onError={()=>{alert("Date should not be before minimal date.")}}
                                                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                                                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                                                />
                                                :
                                                null
                                    }
                                </Paper>
                            </div>
                            <div className="margin-top-6">
                                <Paper
                                    className={`location-container event-detail-item ${
                                        this.props.lightTheme
                                            ? "location-light"
                                            : "location-dark"
                                    } `}
                                >
                                    <Input
                                        value={this.state.event.address}
                                        disableUnderline={true}
                                        readOnly={this.state.readOnly}
                                        className={"edit-event-textfield"}
                                        onChange={e =>
                                            this.handleTextFieldChange(e, "address")
                                        }
                                    />
                                </Paper>
                            </div>
                            <div className="margin-top-6">
                                <Input
                                    className={`title-item ${
                                        this.props.lightTheme
                                            ? "event-title-light"
                                            : "event-title-dark"
                                    }`}
                                    readOnly={this.state.readOnly}
                                    value={this.state.event.name}
                                    disableUnderline={true}
                                    onChange={e =>
                                        this.handleTextFieldChange(e, "name")
                                    }
                                />
                            </div>
                            <BotMessage
                                avatarName="bot"
                                withInput={true}
                                readOnly={this.state.readOnly}
                                message={
                                    this.state.event.description ? this.state.event.description : "Event description."
                                }
                                changeListener={this.handleTextFieldChange}
                                messageDelay={0}
                            />
                            <div className="margin-top-6 preview-user-eidt-container">
                                <InviteEdit
                                    eventId={this.state.id}
                                />
                            </div>
                        </MuiPickersUtilsProvider>
                    </PaddingContainer>
                </ContentContainer>
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
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleDialogClose}>
                    <DialogTitle>{"Comfirm Send Notification"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        You are about to send notifications to your guests on the event update. 
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleDialogClose}>
                        No
                    </Button>
                    <Button onClick={this.handleYes}>
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </MainContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);
