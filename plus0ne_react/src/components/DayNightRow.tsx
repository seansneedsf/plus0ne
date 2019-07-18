import * as React from 'react';
import { connect } from "react-redux";
import { IStore } from "../reducers";

interface IDayNightRowProps {
    lightTheme: boolean
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
class DayNightRow extends React.Component<IDayNightRowProps>{
    render(){
        return(
            <div className={`day-night-row-container  ${this.props.lightTheme ? 'day-night-row-container-light' : 'day-night-row-container-dark'}`} >
                <div className="sun-moon-container day-night-svg-container">
                    {this.props.lightTheme ?<img src={require('../assets/daySun.png')} style={{'width':'100%', 'height':'135px'}}/> : <img src={require('../assets/nightMoon.svg')} style={{'width':'100%', 'height':'135px'}}/>}
                </div>
                <div className="curve-container day-night-svg-container" style={this.props.lightTheme? {'backgroundColor':'white'} : {}}>
                    {this.props.lightTheme ? <img src={require('../assets/dayCurve.svg')} style={{'width':'100%', 'height':'65px'}}/> : <img src={require('../assets/nightCurve.svg')} style={{'width':'100%', 'height':'65px'}}/>}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(DayNightRow);