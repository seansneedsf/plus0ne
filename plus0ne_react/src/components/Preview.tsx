import * as React from "react";
import MainContainer from "./containers/MainContainer";
import AppBarContainer from "./containers/AppBarContainer";
import ContentContainer from "./containers/ContentContainer";
import PaddingContainer from "./containers/PaddingContainer";
import AppBar from "./AppBar";
import BotMessage from "./BotMessage";
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { IStore } from "../reducers";
import PreviewPic from "./PreviewPic";
import InviteEdit from "./InviteEditBox";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Notifications, {notify} from "react-notify-toast";

interface IUserProps {
    lightTheme: boolean,
    match: any
}
interface IState{
    eventRef: IEvent,
    event: IEvent
    id: string,
    editTextLabel: string
}
export interface IEvent{
    name: string,
    date: string,
    time: string,
    address: string,
    guests: []
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

const mapDispatchToProps = (dispatch: any) => ({
   
});
const apiOrigin = "http://localhost:8000/api";
const notificationColor = { background: '#0E1717', text: "#FFFFFF" };

class Preview extends React.Component<IUserProps, IState>{
    state:IState={
        eventRef: {} as IEvent,
        event: {} as IEvent,
        id: this.props.match.params.id,
        editTextLabel: ''
    }
    componentWillMount(){
        const eventId = this.state.id;
        axios.get(`http://localhost:8000/api/event/${eventId}`)
        .then( result =>{
            const event = result.data.event;
            this.setState({eventRef:{...JSON.parse(JSON.stringify(event))}});
            this.setState({event:{...event}}, ()=>{
                console.log("Guest Number:", this.state.event.guests.length)
                const editLabel = (this.state.event.guests.length===0 ? "Invite your first guest! ":"Add your next guest!");
                this.setState({editTextLabel: editLabel});
            });
        }).catch(error => {
            console.log("Error", "Get event error!");
        })
    }
    handleTextFieldChange=(e:any, name:string)=>{
        const currentVal = e.target.value;
        const oldEvent = this.state.event;
        oldEvent[name] = currentVal;
        this.setState({event: {...oldEvent}});
    }
    handleSave = () =>{
        axios.put(`${apiOrigin}/event`, {...this.state.event})
            .then(result => {
                console.log(result.data);
                this.setState({eventRef: {...this.state.event}},()=>{
                    notify.show("Event detail updated!", "custom", 5000, notificationColor);
                });
            }).catch(error => {
                notify.show("Not able to save, try again later!", "custom", 5000, notificationColor);
            });
    }
    handleCancel = () =>{
        this.setState({event:{...this.state.eventRef}});
    }
    render(){
        return(
            <MainContainer>
                <Notifications options={{top: '56px', width:'80%'}}/>
                <AppBarContainer>
                    <AppBar/>
                </AppBarContainer>
                <ContentContainer themeColorClass={`${this.props.lightTheme ? 'app-preview-light':'app-preview-dark'}`}>
                    <PaddingContainer>
                        <BotMessage message={'Here’s your preview! You can customize it to your liking. Then, invite your first guest!'}/>
                        <div className="margin-top-6">
                            <div className="preview-image-container">
                                <PreviewPic/>
                            </div>
                        </div>    
                        <div className="margin-top-6 date-time-container">
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <Input
                                    value={this.state.event.date}
                                    disableUnderline={true}
                                    className={"edit-event-textfield"}
                                    onChange={(e)=>this.handleTextFieldChange(e, 'date')}
                                />
                            </Paper>
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <Input
                                    value={this.state.event.time}
                                    disableUnderline={true}
                                    className={"edit-event-textfield"}
                                    onChange={(e)=>this.handleTextFieldChange(e, 'time')}
                                />
                            </Paper>
                        </div>
                        <div className="margin-top-6">
                            <Paper className={`location-container event-detail-item ${this.props.lightTheme ? 'location-light':'location-dark'} `}>
                                <Input
                                    value={this.state.event.address}
                                    disableUnderline={true}
                                    className={"edit-event-textfield"}
                                    onChange={(e)=>this.handleTextFieldChange(e, 'address')}
                                />
                            </Paper>  
                        </div>   
                        <div className="margin-top-6">
                            <Input
                                className={`title-item ${this.props.lightTheme ? 'event-title-light':'event-title-dark'}`}
                                value={this.state.event.name}
                                disableUnderline={true}
                                onChange={(e)=>this.handleTextFieldChange(e, 'name')}
                            />
                        </div>   
                        <BotMessage 
                            avatarName="bot"
                            message={'Epic hicking trip this weekend. Join soon as spots are filling up fast!'}/>   
                        <div className="margin-top-6 preview-user-eidt-container">
                            <InviteEdit message={this.state.editTextLabel} eventId={this.state.id}/>
                        </div>     
                        <div className="save-cancel-row"
                            style={{'display':`${(JSON.stringify(this.state.eventRef)===JSON.stringify(this.state.event))?'none':'flex'}`}}>
                            <Button variant="contained"
                                onClick={this.handleSave}>
                                Save
                            </Button>
                            <Button variant="contained"
                                onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        </div>          
                    </PaddingContainer> 
                </ContentContainer>
            </MainContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);