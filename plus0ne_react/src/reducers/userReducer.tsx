import { IUser } from "../actions/userActions";
export interface IUserStore{
    name: string;
    age: number;
}
const initialState: IUserStore = {
    name: "Willy",
    age: 25
};
export default (state:IUserStore = initialState, action: IUser):IUserStore => {
    console.log(state, action);
    if (action.type === "SET_USER_AGE") {
        state = { ...state, age: action.age };
    }else if(action.type === "SET_USER_NAME"){
        state = { ...state, name: action.name };
    } 
    return state;
};
