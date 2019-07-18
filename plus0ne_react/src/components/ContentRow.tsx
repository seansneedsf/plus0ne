import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import PaddingContainer from "./containers/PaddingContainer";
import TitleBox from "./TitleBox";
import MessageBox from "./MessageBox";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PreviewMini from "./PreviewMini";
import InputField from "./InputField";
import { API_ORIGIN } from "../globals";

interface IContentRowProps {
    lightTheme: boolean;
}
interface IStartEndDateTime{
    startDateTime: string;
    endDateTime: string;
}
interface IState {
    conversations: IMessage[];
    event: {};
    conversationIdx: number;
    open: boolean;
    eventName: string;
    eventAddress: string;
    eventId: string;
    dateTime: IStartEndDateTime;
    inputType: string;
    showMiniPreview: boolean;
    formatedStartDate: string;
    formatedEndDate: string;
    takeUserInput: boolean;
}
interface IMessage {
    isBot: boolean;
    message: string;
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
class ContentRow extends React.Component<IContentRowProps, IState> {
    state: IState = {
        conversations: [],
        event: {},
        conversationIdx: 0,
        open: false,
        eventAddress: "",
        eventName: "",
        eventId:"",
        dateTime: {} as IStartEndDateTime,
        inputType: "name",
        showMiniPreview: false,
        formatedStartDate: "",
        formatedEndDate: "",
        takeUserInput: true
    };
    scrollConversation() {
        const converstaionEle = document.getElementById(
            "conversation-container"
        );
        converstaionEle.scrollTop = converstaionEle.scrollHeight;
    }
    setUserResponse = (response: string) => {
        const oldConversations = [...this.state.conversations];
        oldConversations.push({ isBot: false, message: response });
        this.setState({ conversations: oldConversations }, () => {
            this.scrollConversation();
            this.getNextDialog();
        });
    };
    setEventDetail = (detail: any) => {
        if (typeof detail === "string" ) {
            if(!detail.trim().length){
                return;
            }
        }
        switch (this.state.conversationIdx) {
            case 1:
                // set event name
                this.setState(
                    { event: { ...this.state.event, name: detail }, eventName: detail, inputType: "date_picker" },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 2:
                
                // set event time
                this.setState(
                    { event: { ...this.state.event, startDateTime: detail.startDate , endDateTime: detail.endDate }, dateTime: detail,  inputType: "address" },
                    () => {
                        const dateFormat = require('dateformat');
                        const startDateTime = dateFormat(detail.startDate, "mmmm dS, h:MM TT");
                        const endDateTime = dateFormat(detail.endDate, "mmmm dS, h:MM TT");
                        this.setState({formatedStartDate: startDateTime, formatedEndDate: endDateTime}, ()=>{
                            this.setUserResponse(`${startDateTime} - ${endDateTime}`);
                        });
                    }
                );
                break;
            case 3:
                // set address for the event
                this.setState(
                    { event: { ...this.state.event, address: detail }, eventAddress: detail,  inputType: "email"  },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 4:
                // set host email
                this.setState(
                    { event: { ...this.state.event, email: detail } },
                    () => {
                        this.setUserResponse(detail);
                        this.saveEvent().then(
                            ()=>{
                                this.setState({takeUserInput: false});
                            }
                        );
                    }
                );
                break;
        }
    };
    saveEvent = () => {
        return new Promise((resolve, reject) =>{
            axios
            .post(`${API_ORIGIN}/event`, { ...this.state.event })
            .then(result => {
                setTimeout(() => {
                    this.handleOpen();
                    resolve();
                }, 2000);
            })
            .catch(error => {
                console.error("Save event error: ", error);
                reject();
            });
        })
        
    };
    getNextDialog() {
        const newConversationIdx = this.state.conversationIdx + 1;
        this.setState({ conversationIdx: newConversationIdx }, () => {
            axios
                .get(`${API_ORIGIN}/dialog/${newConversationIdx}`)
                .then((result: any) => {
                    const conversations = [...this.state.conversations];
                    conversations.push({
                        isBot: true,
                        message: result.data.message
                    });
                    setTimeout(() => {
                        this.setState({ conversations }, () => {
                            this.scrollConversation();
                        });
                    }, 120);
                })
                .catch(error => {
                    console.log("Get next conversation error: ", error);
                });
        });
    }
    handleOpen = () => {
        this.setState({ open: true }, ()=>{
            setTimeout(() => {
                this.setState({showMiniPreview: true}, ()=>{
                    this.scrollConversation();
                })
            }, 2000);
        });  
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentWillMount() {
        axios({
            url: `${API_ORIGIN}/event`,
            method: "get"
        })
            .then(result => {
                this.setState({ event: result.data.event, eventId: result.data.event.id });
            })
            .catch(error => {
                console.error("Get event error: ", error);
            });
        axios
            .get(`${API_ORIGIN}/dialog/${this.state.conversationIdx}`)
            .then((result: any) => {
                const conversations = [...this.state.conversations];
                conversations.push({
                    isBot: true,
                    message: result.data.message
                });
                this.setState({ conversations }, () => {
                    this.scrollConversation();
                });
            })
            .catch(error => {
                console.error("Get conversation error: ", error);
            });
    }
    componentDidMount() {
        this.scrollConversation();
        setTimeout(() => {
            this.getNextDialog();
        }, 2000);
    }
    render() {
        return (
            <PaddingContainer
                themeColorClass={`content-row-container ${
                    this.props.lightTheme ? "content-light" : "content-dark"
                }`}
            >
                <TitleBox
                    alignCenter={true}
                    title={`${
                        this.props.lightTheme
                            ? "Good Afternoon!"
                            : "Good Evening!"
                    }`}
                />
                <div className="bot-chat-container" id="conversation-container">
                    {this.state.conversations.map((conversation, idx) => (
                        <MessageBox
                            isBot={conversation.isBot}
                            message={conversation.message}
                            key={`conversation-${idx}`}
                        />
                    ))}
                    {this.state.conversationIdx===5 && this.state.showMiniPreview?
                        <PreviewMini
                            name= { this.state.eventName   } 
                            address={ this.state.eventAddress }
                            eventId ={ this.state.eventId }
                            eventDate = {this.state.formatedStartDate }
                            eventTime = {this.state.formatedEndDate }
                        /> : null
                    }
                </div>
                {
                    this.state.takeUserInput ?
                        <InputField
                            type={this.state.inputType}
                            setUserInput={this.setEventDetail}
                        />
                        :
                        null
                }
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
                            Congurations! You are all set for your event. Click on the preview for more details.
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
            </PaddingContainer>
        );
    }
}
export default connect(mapStateToProps)(ContentRow);
