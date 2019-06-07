import * as React from 'react';
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

interface IMessageBox{
    isBot: boolean,
    message: string
}

class MessageBox extends React.Component<IMessageBox, {}>{
    static defaultProps={
        isBot: true
    }
    render(){
        return(
            <div style={this.props.message.length?{}:{'display':'none'}}>
                {this.props.isBot ? <BotMessage message={this.props.message}/> : <UserMessage message={this.props.message}/>}
            </div>
        );
    }
}
export default MessageBox;