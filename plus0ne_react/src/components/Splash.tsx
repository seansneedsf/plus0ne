import * as React from "react";
export default class About extends React.Component{
    render(){
        return(
            <div className="splash-screen">
                <img className="splash-screen-image" src={require("../assets/plus0ne_logo.png")}/>
            </div>
        );
    }
}