import { ITheme } from "../actions/themeActions";
export interface IThemeStore{
    light: boolean
}
const initialState: IThemeStore = {
    light: true 
};
export default (state:IThemeStore = initialState, action: ITheme):IThemeStore => {
    if (action.type === "SET_THEME") {
        state = { ...state, light: action.theme };
    }
    return state;
};
