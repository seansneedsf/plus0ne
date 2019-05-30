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
import InviteEdit from "./InviteEditBox";
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

class Preview extends React.Component<IUserProps>{
    state={
        event:{
            date:"",
            time:"",
            location:"",
            name:""
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
                        <BotMessage message={'Here’s your preview! You can customize it to your liking. Then, invite your first guest!'}/>
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
                        <BotMessage 
                            avatarName="bot"
                            message={'Epic hicking trip this weekend. Join soon as spots are filling up fast!'}/>   
                        <div className="margin-top-6 preview-user-eidt-container">
                            <InviteEdit message="Invite your first guest!" eventId={this.state.id}/>
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