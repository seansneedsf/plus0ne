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

interface IContentRowProps {
    lightTheme: boolean;
}
interface IState {
    conversations: IMessage[];
    event: {};
    conversationIdx: number;
    open: boolean;
    eventName: string;
    eventAddress: string;
    eventId: string;
    eventDate: string;
    eventTime: string;
    inputType: string;
    showMiniPreview: boolean;
}
interface IMessage {
    isBot: boolean;
    message: string;
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
const apiOrigin = "http://localhost:8000/api";
class ContentRow extends React.Component<IContentRowProps, IState> {
    state: IState = {
        conversations: [],
        event: {},
        conversationIdx: 0,
        open: false,
        eventAddress: "",
        eventName: "",
        eventId:"",
        eventDate:"",
        eventTime:"",
        inputType: "name",
        showMiniPreview: false,
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
    setEventDetail = (detail: string) => {
        if (!detail.trim().length) {
            return;
        }
        switch (this.state.conversationIdx) {
            case 1:
                // set event name
                this.setState(
                    { event: { ...this.state.event, name: detail }, eventName: detail, inputType: "start_date" },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 2:
                // set event date
                this.setState(
                    { event: { ...this.state.event, date: detail }, eventDate: detail, inputType: "end_date" },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 3:
                // set event time
                this.setState(
                    { event: { ...this.state.event, time: detail }, eventTime: detail,  inputType: "address" },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 4:
                // set address for the event
                this.setState(
                    { event: { ...this.state.event, address: detail }, eventAddress: detail,  inputType: "email"  },
                    () => {
                        this.setUserResponse(detail);
                    }
                );
                break;
            case 5:
                // set host email
                this.setState(
                    { event: { ...this.state.event, email: detail } },
                    () => {
                        this.saveEvent();
                        this.setUserResponse(detail);
                        this.handleOpen();
                    }
                );
                break;
        }
    };
    saveEvent = () => {
        axios
            .post(`${apiOrigin}/event`, { ...this.state.event })
            .then(result => {
                console.log(result.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };
    getNextDialog() {
        const newConversationIdx = this.state.conversationIdx + 1;
        this.setState({ conversationIdx: newConversationIdx }, () => {
            axios
                .get(`${apiOrigin}/dialog/${newConversationIdx}`)
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
                    console.log("Error", error);
                });
        });
    }
    handleOpen = () => {
        this.setState({ open: true }, ()=>{
            setTimeout(() => {
                this.setState({showMiniPreview: true}, ()=>{
                    this.scrollConversation();
                })
            }, 1000);
        });  
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentWillMount() {
        axios({
            url: `${apiOrigin}/event`,
            method: "get"
        })
            .then(result => {
                console.log("Event: ", result.data.event);
                this.setState({ event: result.data.event, eventId: result.data.event.id });
            })
            .catch(err => {
                console.log("error", err);
            });
        axios
            .get(`${apiOrigin}/dialog/${this.state.conversationIdx}`)
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
                console.log("Error", error);
            });
    }
    componentDidMount() {
        this.scrollConversation();
        setTimeout(() => {
            this.getNextDialog();
        }, 200);
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
                    {this.state.conversationIdx===6 && this.state.showMiniPreview?
                        <PreviewMini
                            name= { this.state.eventName   } 
                            address={ this.state.eventAddress }
                            eventId ={ this.state.eventId }
                            eventDate = {this.state.eventDate }
                            eventTime = {this.state.eventTime }
                        /> : null
                    }
                </div>
                <InputField
                    type={this.state.inputType}
                    setUserInput={this.setEventDetail}
                />
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
