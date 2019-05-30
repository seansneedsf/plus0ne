export const fetchEvents = () => {
    return {
        type: "FETCH_USER_FULFILLED",
        payload:["event 1", "event2"]
    };
};
export const addEvents = (event:string) => {
    return {
        type: "ADD_EVENTS",
        payload: event
    };
};
