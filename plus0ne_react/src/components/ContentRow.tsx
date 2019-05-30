import * as React from 'react';
import HostEdit from './HostEdit';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import PaddingContainer from "./containers/PaddingContainer";
import TitleBox from "./TitleBox";
import MessageBox from "./MessageBox";
import axios from "axios";
export interface IContentRowProps {
    lightTheme: boolean
}

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

class ContentRow extends React.Component<IContentRowProps>{
    state = {
        conversations:[{isBot: true, message:''}],// TODO: Figure out how to pass a empty array
        userInputCount: 0,
        // TODO: temporate solution for generate event(refactor later)
        event:{
            Id:"",
            name:"",
            date:"",
            time:"",
            location:"",
            email:""
        } 
    }
    configEvent = (config:string) =>{
        const oldConversations = this.state.conversations;
        const event = {...this.state.event};
        oldConversations.push({isBot:false, message: config});
        this.setState({conversations: oldConversations});
        // TODO: temporate solution for generate conversation(refactor later)
        // it is not robust 
        if(this.state.userInputCount === 0){
            event.name = config;
            setTimeout(()=>{
                oldConversations.push({isBot: true, message: 'Cool! What date is your event?'});
                this.setState({conversations: oldConversations});
                this.setState({event});
                setTimeout(()=>{
                    const converstaionEle = document.getElementById("conversation-container");
                    converstaionEle.scrollTop = converstaionEle.scrollHeight;
                },0)
            }, 1000);
        }
        else if(this.state.userInputCount === 1){
            event.date = config;
            setTimeout(()=>{
                oldConversations.push({isBot: true, message: 'What time is your event starting at?'});
                this.setState({conversations: oldConversations});
                this.setState({event});
                setTimeout(()=>{
                    const converstaionEle = document.getElementById("conversation-container");
                    converstaionEle.scrollTop = converstaionEle.scrollHeight;
                },0)
            }, 1000);
        }
        else if(this.state.userInputCount === 2){
            event.time = config;
            setTimeout(()=>{
                oldConversations.push({isBot: true, message: 'Great! What is the address for your event?'});
                this.setState({conversations: oldConversations});
                this.setState({event});
                setTimeout(()=>{
                    const converstaionEle = document.getElementById("conversation-container");
                    converstaionEle.scrollTop = converstaionEle.scrollHeight;
                },0)
            }, 1000);
        }
        else if(this.state.userInputCount === 3){
            event.location = config;
            setTimeout(()=>{
                oldConversations.push({isBot: true, message: 'Perfect! Let\'s create a link to your event. What\'s your email address?'});
                this.setState({conversations: oldConversations});
                this.setState({event});
                setTimeout(()=>{
                    const converstaionEle = document.getElementById("conversation-container");
                    converstaionEle.scrollTop = converstaionEle.scrollHeight;
                },0)
            }, 1000);
        }
        else if(this.state.userInputCount === 4){
            event.email = config;
            setTimeout(()=>{
                oldConversations.push({isBot: true, message: "You’re all set! We just sent the link to your email address. Check your spam folder just in case."});
                this.setState({conversations: oldConversations});
                this.setState({event});
                setTimeout(()=>{
                    const converstaionEle = document.getElementById("conversation-container");
                    converstaionEle.scrollTop = converstaionEle.scrollHeight;
                    this.setState({event},()=>{
                        console.log("New Event:", this.state.event);
                        axios.post('http://localhost:8000/api/event',{
                            Id: this.state.event.Id,
                            name: this.state.event.name,
                            date: this.state.event.date,
                            time: this.state.event.time,
                            location: this.state.event.location,
                            email: this.state.event.email,                
                        }).then(result => {
                            console.log("Added!!");
                        }).catch(error=>{
                            console.log("Error!!");
                        })
                    });
                },0)
            }, 1000);
        }
        setTimeout(()=>{
            // TODO: replace this scroll with smooth scroll function
            const converstaionEle = document.getElementById("conversation-container");
            converstaionEle.scrollTop = converstaionEle.scrollHeight;
        },100);
        const oldInputCount = this.state.userInputCount;
        const newInputCount = oldInputCount+1;
        this.setState({userInputCount: newInputCount});
    }
    componentWillMount(){
        axios({
            url: 'http://localhost:8000/api/event',
            method: 'get'
        }).then((result)=>{
            this.setState({event: result.data.event}, ()=>{
                console.log("set state", this.state.event);
            });
        }).catch(err=>{
            console.log('error', err);
        })
    }
    componentDidMount(){
        const converstaionEle = document.getElementById("conversation-container")
        converstaionEle.scrollTop = converstaionEle.scrollHeight;

        const oldConversations = this.state.conversations;
        setTimeout(()=>{
            oldConversations.push({isBot: true, message: 'Welcome! To get started creating your event, simply just text me a few details.'})
            this.setState({conversations: oldConversations},()=>{
                setTimeout(()=>{
                    const conversations = this.state.conversations;
                    conversations.push({isBot: true, message: 'What name do you want to give to your event?'})
                    this.setState({conversations});
                }, 1000);
            });
        }, 100);
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
                    handleAddEvent={this.configEvent}/>
            </PaddingContainer>
        );
    }
}
export default connect(mapStateToProps)(ContentRow);