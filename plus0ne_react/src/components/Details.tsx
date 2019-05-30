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
import GuestResponse from "./GuestResponse";
import HostEdit from "./HostEdit";
import axios from "axios";

export interface IUserProps {
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
        event:{
            name:"",
            date:"",
            time:"",
            location:"",
            email:""
        },
        id: this.props.match.params.id 
    }
    componentWillMount(){
        const eventId = this.state.id;
        axios.get(`http://localhost:8000/api/event/${eventId}`)
        .then( result =>{
            console.log("Result", result);
            const event = result.data.event;
            this.setState({event:{...event}});
        }).catch(error => {
            console.log("Error", "Get event error!");
        })
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
                                <PreviewPic/>
                            </div>
                        </div>    
                        <div className="margin-top-6 date-time-container">
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <span className="detail-item-font typographic-color-dark">{this.state.event.date}</span>
                            </Paper>
                            <Paper className={`date-time-item event-detail-item ${this.props.lightTheme ? 'date-time-item-light':'date-time-item-dark'}`}>
                                <span className="detail-item-font typographic-color-dark">{this.state.event.time}</span>
                            </Paper>
                        </div>
                        <div className="margin-top-6">
                            <Paper className={`location-container event-detail-item ${this.props.lightTheme ? 'location-light':'location-dark'} `}>
                                <span className="detail-item-font typographic-color-dark">{this.state.event.location}</span>
                            </Paper>  
                        </div>   
                        <div className="margin-top-6">
                            <TitleBox alignCenter={false} title={this.state.event.name}/>
                        </div>   
                        <div className="conversation-section">
                            <div className="conversations">
                                <BotMessage 
                                    avatarName="bot"
                                    message={`Epic hicking trip this weekend. Join soon as spots are filling up fast! (${this.props.match.params.id})`}/>   
                                <GuestResponse message="Thanks for the invite!"/>
                            </div>
                            <div className={`conversation-input ${this.props.lightTheme ? 'app-preview-light':'app-preview-dark'}`}>
                                <HostEdit placeHolder="Type or tell me your message here!"/>
                            </div>
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