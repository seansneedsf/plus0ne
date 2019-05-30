import * as React from "react";
import Splash from "./Splash";
import AppBar from "./AppBar";
import DayNightRow from './DayNightRow';
import ContentRow from './ContentRow';
import MainContainer from "./containers/MainContainer";
import AppBarContainer from "./containers/AppBarContainer";
import ContentContainer from "./containers/ContentContainer";

class Home extends React.Component{
    state={
        showSplash: true
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({showSplash: false});
        }, 1500);    
    }
    public render() {
        return (
            <MainContainer>
                {this.state.showSplash ? <Splash/>
                :
                    (
                        <div>
                            <AppBarContainer>
                                <AppBar/>
                            </AppBarContainer>
                            <ContentContainer>
                                <DayNightRow/>
                                <ContentRow/>
                            </ContentContainer>
                        </div>
                    ) 
                }
            </MainContainer>
        );
    }
}
export default Home;
