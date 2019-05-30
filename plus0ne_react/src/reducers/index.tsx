import { combineReducers } from "redux";
import events from "./eventsReducer";
import user from "./userReducer";
import theme from "./themeReducer";


export interface IStore{
    user:{
        name: string;
        age: number;
    },
    events: [],
    theme:{
        light: boolean
    }
}
export default combineReducers({
    events,
    user,
    theme,
});