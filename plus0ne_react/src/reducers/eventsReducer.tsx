const initialState = {
    events:["event 1"]
}
export default (state=initialState, action:any) => {
    console.log(state, action);
    return state;
}
