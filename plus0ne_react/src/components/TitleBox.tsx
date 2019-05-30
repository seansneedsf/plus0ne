import * as React from 'react';
import { connect } from "react-redux";
import { IStore } from "../reducers";

interface ITitleBox{
    alignCenter?: boolean,
    title?: string,
    lightTheme: boolean
}
const mapStateToProps = (state: IStore) => ({
    lightTheme: state.theme.light
});
class TitleBox extends React.Component<ITitleBox>{
    render(){
        return(
            <div className={`title-container ${this.props.alignCenter ? 'title-center':'title-left'}`}>
                <span className={`title-item ${this.props.lightTheme ? 'typographic-color-light' : 'typographic-color-dark'}`}>{this.props.title}</span>
            </div>
        );
    }
}
export default connect(mapStateToProps)(TitleBox);;