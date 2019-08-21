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
import TitleBox from "./TitleBox";
import PreviewPic from "./PreviewPic";
// import GuestResponse from "./GuestResponse";
// import HostEdit from "./HostEdit";
import axios from "axios";
import {IEvent} from "./Preview";
import { API_ORIGIN } from "../globals";

interface IUserProps {
    lightTheme: boolean,
    match: any
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});

const mapDispatchToProps = (dispatch: any) => ({
   
});

class Preview extends React.Component<IUserProps, {}>{
    state={
        event: {} as IEvent,
        id: this.props.match.params.id 
    }
    componentWillMount(){
        const eventId = this.state.id;
        axios.get(`${API_ORIGIN}/event/${eventId}`)
        .then( result =>{
            const event = result.data.event;
            this.setState({event:{...event}});
        }).catch(error => {
            console.error("Get event error: ", error);
        })
    }
    toLocaleDate(date:string){
        const dateFormat = require('dateformat');
        return dateFormat(date, "mmmm dS, h:MM TT");
    }
    render(){
        return(
            <MainContainer>
                <AppBarContainer>
                    <AppBar/>
                </AppBarContainer>
                <ContentContainer themeColorClass={`${this.props.lightTheme ? 'app-preview-light':'app-preview-dark'}`}>
                    <PaddingContainer>
                        <div className="margin-top-6">
                            <div className="preview-image-container">
                                <PreviewPic event={this.state.event} noUpload={true}/>
                            </div>
                        </div>    
                        <div className="margin-top-6 date-time-container">
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <span className="detail-item-font typographic-color-dark">{this.toLocaleDate(this.state.event.startDateTime)}</span>
                            </Paper>
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <span className="detail-item-font typographic-color-dark">{this.toLocaleDate(this.state.event.endDateTime)}</span>
                            </Paper>
                        </div>
                        <div className="margin-top-6">
                            <Paper className={`location-container event-detail-item ${this.props.lightTheme ? 'location-light':'location-dark'} `}>
                                <span className="detail-item-font typographic-color-dark">{this.state.event.address}</span>
                            </Paper>  
                        </div>   
                        <div className="margin-top-6">
                            <TitleBox alignCenter={false} title={this.state.event.name}/>
                        </div>   
                        <div className="conversation-section">
                            <div className="conversations">
                                <BotMessage 
                                    messageDelay={0}
                                    avatarName="bot"
                                    message={`Thanks for your response!`}/>   
                                {/* <GuestResponse message="Thanks for the invite!"/> */}
                            </div>
                            {/* <div className={`conversation-input ${this.props.lightTheme ? 'app-preview-light':'app-preview-dark'}`}>
                                <HostEdit placeHolder="Type or tell me your message here!"/>
                            </div> */}
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