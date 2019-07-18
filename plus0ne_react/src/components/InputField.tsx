import * as React from "react";
import {  DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Input from "@material-ui/core/Input";
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRight from "@material-ui/icons/ChevronRight";

interface IInputFieldProps{
    type: string;
    setUserInput?: any;
    lightTheme: boolean;
}
interface IState{
    name: string;
    open: boolean;
    message: string;
    startDate: any;
    endDate: any;
}

const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

class InputField extends React.Component<IInputFieldProps, IState>{
    state:IState = {
        name: undefined,
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
                        this.handleNameSubmit();
                        break;
                    case "date_picker":
                        this.handleDateSubmit();
                        break;
                    case "address":
                        this.handleAddressSubmit()
                        break;
                    case "email":
                        this.handleEmailSubmit();
                        break;
                }
            }
        });
    }
    handleStartDateChange = (val:any) => {
        this.setState({startDate: val});
    }
    handleEndDateChange = (val:any) => {
        this.setState({endDate: val});
    }
    handleOpen = (msg:string) => {
        this.setState({ message:msg, open: true });  
    };
    handleNameSubmit = () => {
        const name = document.getElementsByTagName("input")[0].value;
        if(name.trim().length===0){
            this.handleOpen("Please enter a name to continue!");
        }else{
            this.props.setUserInput(name);
        }
    }
    handleDateSubmit = () =>{
        const startDateTime = document.getElementsByTagName("input")[0].value;
        const endDateTime = document.getElementsByTagName("input")[1].value;
        if(startDateTime === "Start date" && endDateTime === "End date"){
            this.handleOpen("Please select a start date and date to continue!");
        }else if(startDateTime === "Start date"){
            this.handleOpen("Please select a start date to continue!");
        }else if(endDateTime === "End date"){
            this.handleOpen("Please select an end date to continue!");
        }else{
            const startDate = this.state.startDate;
            const endDate = this.state.endDate;
            if( startDate > endDate) {
                alert("Date should not be before minimal date.")
                return;
            }
            this.props.setUserInput({startDate, endDate});
        }
    }
    handleAddressSubmit = () => {
        const address = document.getElementsByTagName("input")[0].value;
        if(address.trim().length===0){
            this.handleOpen("Please enter an address to continue!");
        }else{
            this.props.setUserInput(address);
            document.getElementsByTagName("input")[0].value = '';
        }
    }
    handleEmailSubmit = () => {
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
    }
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
                                            <div className="create-event__input-submit">
                                                <Fab style={{'width':'44px','height':'44px'}} 
                                                    onClick={this.handleNameSubmit}
                                                    className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                    <ChevronRight style={{'pointerEvents': 'none'}}/>
                                                </Fab>
                                            </div>
                                        </div>
                                    );
                                case "date_picker":
                                    return(
                                        <div className="input-field__start-date input-field__date-pickers-container">
                                            <div className="input-field__date-pickers">
                                                <DateTimePicker
                                                    autoOk={true}
                                                    disableFuture={false}
                                                    disablePast={true}
                                                    hideTabs={false}
                                                    ampm={true}
                                                    value={this.state.startDate}
                                                    onChange={this.handleStartDateChange}
                                                    allowKeyboardControl={false}
                                                    emptyLabel={"Start date"}
                                                    minDate={new Date(Date.now())}
                                                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                                                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                                                />
                                                <DateTimePicker
                                                    autoOk={true}
                                                    disableFuture={false}
                                                    disablePast={true}
                                                    hideTabs={false}
                                                    ampm={true}
                                                    value={this.state.endDate}
                                                    onChange={this.handleEndDateChange}
                                                    allowKeyboardControl={false}
                                                    emptyLabel={"End date"}
                                                    onError={()=>{alert("Date should not be before minimal date.")}}
                                                    minDate={new Date(this.state.startDate)}
                                                    minDateMessage={' '}
                                                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                                                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                                                />
                                            </div>
                                            <div className="create-event__input-submit">
                                                <Fab style={{'width':'44px','height':'44px'}} 
                                                    onClick={this.handleDateSubmit}
                                                    className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                    <ChevronRight style={{'pointerEvents': 'none'}}/>
                                                </Fab>
                                            </div>
                                        </div>
                                    );
                                case "address":
                                    return(
                                        <div className="input-field__text-input">
                                             <Input
                                                autoFocus={true}
                                                placeholder="Enter an address for your event"
                                            />
                                            <div className="create-event__input-submit">
                                                <Fab style={{'width':'44px','height':'44px'}} 
                                                    onClick={this.handleAddressSubmit}
                                                    className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                    <ChevronRight style={{'pointerEvents': 'none'}}/>
                                                </Fab>
                                            </div>
                                        </div>
                                    );
                                case "email":
                                    return(
                                        <div className="input-field__text-input">
                                            <Input
                                                autoFocus={true}
                                                placeholder="Enter your email address"
                                            />
                                            <div className="create-event__input-submit">
                                                <Fab style={{'width':'44px','height':'44px'}} 
                                                    onClick={this.handleEmailSubmit}
                                                    className={`${this.props.lightTheme ? 'avatar-container-light' : 'avatar-container-dark'}`}>
                                                    <ChevronRight style={{'pointerEvents': 'none'}}/>
                                                </Fab>
                                            </div>
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
