import 'date-fns';
import * as React from "react";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Input from "@material-ui/core/Input";
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface IInputFieldProps{
    type: string;
    setUserInput?: any;
    lightTheme: boolean;
}
interface IState{
    name: string;
    date: any;
    startTime: any;
    endTime: any;
    open: boolean;
    message: string;
    startDate: any;
    endDate: any;
}

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
const PICK_DATE  = "Pick a date";
const PICK_START_TIME = "Pick a time";
const PICK_END_TIME = "Pick a time";

class InputField extends React.Component<IInputFieldProps, IState>{
    state:IState = {
        name: undefined,
        date: null,
        startTime: null,
        endTime: null,
        startDate: null,
        endDate: null,
        open: false,
        message:""
    }
    componentDidMount(){
        document.addEventListener("keyup", (e)=>{
            if(e.keyCode === 13){
                switch(this.props.type){
                    case "name":
                        const name = document.getElementsByTagName("input")[0].value;
                        if(name.trim().length===0){
                            this.handleOpen("Please enter a name to continue!");
                        }else{
                            this.props.setUserInput(name);
                        }
                        break;
                    case "start_date":
                        const startDate = document.getElementsByTagName("input")[0].value;
                        const startTime = document.getElementsByTagName("input")[1].value;
                        if(startDate === PICK_DATE && startTime === PICK_START_TIME){
                            this.handleOpen("Please select a date and time to continue!");
                        }else if(startDate === PICK_DATE ){
                            this.handleOpen("Please select a date to continue!");
                        }else if(startTime === PICK_START_TIME){
                            this.handleOpen("Please select a time to continue!");
                        }else{
                            this.props.setUserInput(`${startDate.replace(` ${new Date().getFullYear()}`, '')} ${startTime.replace(/^0/,'')}`);
                        }
                        break;
                    case "end_date":
                        const endDate = document.getElementsByTagName("input")[0].value;
                        const endTime = document.getElementsByTagName("input")[1].value;
                        if(endDate === PICK_DATE && endTime === PICK_END_TIME){
                            this.handleOpen("Please select a date and time to continue!");
                        }else if(endDate === PICK_DATE){
                            this.handleOpen("Please select a date to continue!");
                        }else if(endTime === PICK_END_TIME){
                            this.handleOpen("Please select a time to continue!");
                        }else{
                            this.props.setUserInput(`${endDate.replace(` ${new Date().getFullYear()}`, '')} ${endTime.replace(/^0/,'')}`);
                        }
                        break;
                    case "address":
                        const address = document.getElementsByTagName("input")[0].value;
                        if(address.trim().length===0){
                            this.handleOpen("Please enter an address to continue!");
                        }else{
                            this.props.setUserInput(address);
                            document.getElementsByTagName("input")[0].value = '';
                        }
                        break;
                    case "email":
                        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        const email = document.getElementsByTagName("input")[0].value;
                        if(email.trim().length===0){
                            this.handleOpen("Please enter your email address to continue!");
                        }else if(!emailRegex.test(String(email).toLowerCase())){
                            this.handleOpen("Please enter a valid email address to continue!");
                        }else{
                            this.props.setUserInput(email);
                            document.getElementsByTagName("input")[0].value = '';
                        }
                        break;
                    
                }
            }
        });
    }
    handleDateChange = (val:any) => {
        this.setState({date: val});
    }
    handleStartDateChange = (val:any) => {
        this.setState({startDate: val});
    }
    handleEndDateChange = (val:any) => {
        this.setState({endDate: val});
    }
    handleStartTimeChange = (val:any) => {
        this.setState({startTime: val});
    }
    handleEndTimeChange = (val:any) => {
        this.setState({endTime: val});
    }
    speech2Text=()=>{
        const recognition = new SpeechRecognition();
        recognition.start();
        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            document.getElementsByTagName("input")[0].value = speechToText;
        }
    }
    handleOpen = (msg:string) => {
        this.setState({ message:msg, open: true });  
    };
    handleClose = () => {
        this.setState({ open: false }, ()=>{
            document.getElementsByTagName("input")[0].focus();
        });
    };
    render(){
        return(
            <div className={`input-field-container ${this.props.lightTheme ? 'typographic-color-light ':'typographic-color-dark'}`}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {
                    (
                        () => {
                            switch(this.props.type){
                                case "name":
                                    return(
                                       <div className="input-field__text-input">
                                            <Input
                                                autoFocus={true}
                                                placeholder="Enter an event name"
                                            />
                                            <Fab style={{'width':'44px','height':'44px'}} 
                                                onClick={this.speech2Text}
                                                className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                <img src={require('../assets/microphone.png')}  style={{'pointerEvents': 'none'}}/>
                                            </Fab>
                                        </div>
                                    );
                                case "start_date":
                                    return(
                                        <div className="input-field__start-date">
                                            <DatePicker
                                                animateYearScrolling={true}
                                                value={this.state.startDate}
                                                onChange={this.handleStartDateChange}
                                                emptyLabel={PICK_DATE}
                                                format="MMM dd, yyyy"
                                                minDate={new Date()}
                                            />
                                            <TimePicker                                        
                                                value={this.state.startTime}
                                                minutesStep={15}
                                                emptyLabel={PICK_START_TIME}
                                                onChange={this.handleStartTimeChange}
                                            />
                                        </div>
                                    );
                                case "end_date":
                                    return(
                                        <div className="input-field__end-date">
                                            <DatePicker
                                                animateYearScrolling={true}
                                                value={this.state.endDate}
                                                onChange={this.handleEndDateChange}
                                                emptyLabel={PICK_DATE}
                                                format="MMM dd, yyyy"
                                                minDate={new Date()}
                                            />
                                            <TimePicker                                        
                                                value={this.state.endTime}
                                                minutesStep={15}
                                                emptyLabel={PICK_END_TIME}
                                                onChange={this.handleEndTimeChange}
                                            />
                                        </div>
                                    );
                                case "address":
                                    return(
                                        <div className="input-field__text-input">
                                             <Input
                                                autoFocus={true}
                                                placeholder="Enter an address for your event"
                                            />
                                            <Fab style={{'width':'44px','height':'44px'}} 
                                                onClick={this.speech2Text}
                                                className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                <img src={require('../assets/microphone.png')}  style={{'pointerEvents': 'none'}}/>
                                            </Fab>
                                        </div>
                                    );
                                case "email":
                                    return(
                                        <div className="input-field__text-input">
                                            <Input
                                                autoFocus={true}
                                                placeholder="Enter your email address"
                                            />
                                            <Fab style={{'width':'44px','height':'44px'}} 
                                                onClick={this.speech2Text}
                                                className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                <img src={require('../assets/microphone.png')}  style={{'pointerEvents': 'none'}}/>
                                            </Fab>
                                        </div>
                                    );
                            }
                            return null;
                        }
                    )()
                }
                </MuiPickersUtilsProvider>
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
                            { this.state.message }
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

export default connect(mapStateToProps)(InputField);
