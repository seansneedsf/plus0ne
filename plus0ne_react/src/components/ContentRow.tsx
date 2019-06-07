import * as React from 'react';
import HostEdit from './HostEdit';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import PaddingContainer from "./containers/PaddingContainer";
import TitleBox from "./TitleBox";
import MessageBox from "./MessageBox";
import axios from "axios";
interface IContentRowProps {
    lightTheme: boolean,
}
interface IState {
    conversations: IMessage[],
    event: {},
    conversationIdx: number
}
interface IMessage{
    isBot: boolean,
    message: string
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
const apiOrigin = "http://localhost:8000/api";
class ContentRow extends React.Component<IContentRowProps, IState>{
    state:IState = {
        conversations:[],
        event:{},
        conversationIdx: 0 
    }
    scrollConversation(){
        const converstaionEle = document.getElementById("conversation-container")
        converstaionEle.scrollTop = converstaionEle.scrollHeight;
    }
    setUserResponse = (response: string) => {
        const oldConversations = [...this.state.conversations];
        oldConversations.push({isBot: false, message: response});
        this.setState({conversations: oldConversations}, ()=>{
            this.scrollConversation();
            this.getNextDialog();
        });
    }
    setEventDetail = (detail:string) =>{
        if(!detail.trim().length){
            return;
        }
        switch(this.state.conversationIdx){
            case 1:
                // set event name
                this.setState({event:{...this.state.event, name: detail}}, ()=>{
                    this.setUserResponse(detail);
                });
                break;
            case 2:
                // set event date
                this.setState({event:{...this.state.event, date: detail}}, ()=>{
                    this.setUserResponse(detail);
                });
                break;
            case 3:
                // set event time
                this.setState({event:{...this.state.event, time: detail}}, ()=>{
                    this.setUserResponse(detail);
                });
                break;
            case 4:
                // set address for the event
                this.setState({event:{...this.state.event, address: detail}}, ()=>{
                    this.setUserResponse(detail);
                });
                break;
            case 5:
                // set host email
                this.setState({event:{...this.state.event, email: detail}}, ()=>{
                    // TODO: send response to server
                    this.saveEvent();
                    this.setUserResponse(detail);
                });
                break;
            this.saveEvent();
        }
    }
    saveEvent = () => {
        axios.post(`${apiOrigin}/event`,{...this.state.event})
        .then(result => {
            console.log(result.data);
        }).catch(error => {
            console.log('error', error);
        })
    }
    getNextDialog(){
        const newConversationIdx = this.state.conversationIdx+1;
        this.setState({conversationIdx: newConversationIdx},()=>{
            axios.get(`${apiOrigin}/dialog/${newConversationIdx}`)
            .then((result:any) =>{
                const  conversations = [...this.state.conversations];
                conversations.push({isBot: true, message: result.data.message});
                setTimeout(()=>{
                    this.setState({conversations},()=>{
                        this.scrollConversation();
                    })
                }, 120);
            }).catch(error => {
                console.log("Error", error);
            });
        });
    }
    componentWillMount(){
        axios({
            url: `${apiOrigin}/event`,
            method: 'get'
        }).then((result)=>{
            console.log("Event: ", result.data.event);
            this.setState({event: result.data.event});
        }).catch(err=>{
            console.log('error', err);
        });
        axios.get(`${apiOrigin}/dialog/${this.state.conversationIdx}`)
        .then((result:any) =>{
            const  conversations = [...this.state.conversations];
            conversations.push({isBot: true, message: result.data.message});
            this.setState({conversations},()=>{
                this.scrollConversation();
            });
        }).catch(error => {
            console.log("Error", error);
        });
    }
    componentDidMount(){
        this.scrollConversation();
        setTimeout(()=>{
            this.getNextDialog();
        }, 200);
    }
    render(){
        return(
            <PaddingContainer themeColorClass={`content-row-container ${this.props.lightTheme ? 'content-light' : 'content-dark'}`}>
                <TitleBox alignCenter={true} title={`${this.props.lightTheme ? 'Good Afternoon!' : 'Good Evening!'}`}/>
                <div className='bot-chat-container' id="conversation-container">
                    {
                        this.state.conversations.map(
                            (conversation, idx) => <MessageBox isBot={conversation.isBot} message={conversation.message} key={`conversation-${idx}`}/>
                        )
                    }
                </div>
                <HostEdit placeHolder="Type or tell me what you want your event to be called."
                    handleAddEvent={this.setEventDetail}/>
            </PaddingContainer>
        );
    }
}
export default connect(mapStateToProps)(ContentRow);