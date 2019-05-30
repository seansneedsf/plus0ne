import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import { setTheme } from "../actions/themeActions";


export interface IAppBarTitleProps {
    lightTheme: boolean,
    changeTheme: any
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
const mapDispatchToProps = (dispatch: any) => ({
    changeTheme: (lightTheme: boolean) => {
        dispatch(setTheme(lightTheme));
    },
});
class HeaderAppBar extends React.Component<IAppBarTitleProps> {
    render() {
        return (
            <div>
                <AppBar position="static" className={`${this.props.lightTheme ? 'app-bar-light' : 'app-bar-dark'}`}>
                    <Toolbar>
                        <div className='app-bar-icon-container' onClick={()=>this.props.changeTheme(!this.props.lightTheme)}>
                            <img src={require("../assets/plus0ne_logo.png")} style={{'width':'32px', 'height':'32px'}}/>
                        </div>
                        <div className='app-title-container'>
                            { this.props.lightTheme ? <img src={require("../assets/dayIcon.png")}/> : <img src={require("../assets/nightIcon.png")}/> }
                        </div>
                        <div className='app-bar-icon-container'/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderAppBar);