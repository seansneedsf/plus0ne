import { combineReducers } from "redux";
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
    theme,
});