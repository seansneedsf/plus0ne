import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import { IStore } from "../reducers";

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

export interface IHostEditProps {
    placeHolder?: string,
    type?: string,
    lightTheme: boolean,
    handleAddEvent?: any,
    handleGuestResponse?: any,
}
const ENTER_KEY = "Enter";
class HostEdit extends React.Component<IHostEditProps, {}>{
    public static defaultProps = {
        placeHolder:'',
        type:'text'
    };
    state={
        inputVal:'',
    }
    speech2Text=()=>{
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            this.setState({inputVal: speechToText})
        }
    }
    handleTextChange=(e:any)=>{
        this.setState({ inputVal: e.target.value});
    }
    handleKeyDown=(e:any)=>{
        if(e.key === ENTER_KEY && this.props.handleAddEvent){
            this.props.handleAddEvent(this.state.inputVal);
            this.setState({ inputVal: ''});
        }
    }
    render(){
        return(
            <div className='user-input-container'>
                <div className="host-message-container">
                    <div className="host-message-content-container">
                        <TextField
                            placeholder={this.props.placeHolder}
                            value={this.state.inputVal}
                            onChange={this.handleTextChange}
                            onKeyDown={(e)=>this.handleKeyDown(e)}
                            type={this.props.type}
                            className={`${this.props.lightTheme ? 'typographic-color-light' : 'typographic-color-dark'}`}
                        />
                    </div>
                    <div className="host-message-avatar-container">
                        <Fab style={{'width':'44px','height':'44px'}} 
                            onClick={this.speech2Text}
                            className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                            <img src={require('../assets/microphone.png')}  style={{'pointerEvents': 'none'}}/>
                        </Fab>
                    </div>
                </div>
            </div>    
        );
    }
}

export default connect(mapStateToProps)(HostEdit);