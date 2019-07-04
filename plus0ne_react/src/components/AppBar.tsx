import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { IStore } from "../reducers";
import { setTheme } from "../actions/themeActions";
import BorderColor from "@material-ui/icons/BorderColor";
import Publish from "@material-ui/icons/Publish";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";


interface IAppBarTitleProps {
    lightTheme: boolean,
    changeTheme: any,
    showRightIcon: boolean,
    handleRightIconClick?: any,
    handleNotifyGuests?: any,
    readOnly?:boolean,
    saveChanges?: any,
    cancelChanges?: any
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
const mapDispatchToProps = (dispatch: any) => ({
    changeTheme: (lightTheme: boolean) => {
        dispatch(setTheme(lightTheme));
    },
});
class HeaderAppBar extends React.Component<IAppBarTitleProps, {}> {
    static defaultProps = {
        showRightIcon: false,
        handleRightIconClick:()=>{return;},
        readOnly: true
    }
    render() {
        return (
            <div>
                <AppBar position="static" className={`${this.props.lightTheme ? 'app-bar-light' : 'app-bar-dark'}`}>
                    <Toolbar>
                        <div className='app-bar-icon-container app-bar-icon-container-left' onClick={()=>this.props.changeTheme(!this.props.lightTheme)}>
                            <img src={this.props.lightTheme ? require("../assets/plus0ne_logo_light.png"): require("../assets/plus0ne_logo_dark.png")} style={{'width':'32px', 'height':'32px'}}/>
                        </div>
                        <div className='app-title-container'>
                            { this.props.lightTheme ? <img src={require("../assets/dayIcon.png")}/> : <img src={require("../assets/nightIcon.png")}/> }
                        </div>
                        <div className='app-bar-icon-container app-bar-icon-container-right'>
                            { this.props.showRightIcon ? 
                               <div>
                                   {
                                       this.props.readOnly ?
                                       <div className="app-bar__edit-event">
                                            <IconButton onClick={this.props.handleNotifyGuests}>
                                                <Publish/> 
                                            </IconButton>
                                           <IconButton onClick={this.props.handleRightIconClick}>
                                                <BorderColor/> 
                                            </IconButton>
                                        </div>
                                        :
                                        <div className="save-cancel-container">
                                            <IconButton 
                                                onClick={this.props.saveChanges}
                                                className="accept-button">
                                                <Done/>
                                            </IconButton>
                                            <IconButton
                                                onClick={this.props.cancelChanges}
                                                className="cancel-button">
                                                <Clear/>
                                            </IconButton>
                                        </div>
                                   }
                               </div>
                                : null
                            }
                           
                        </div>
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