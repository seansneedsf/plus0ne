export interface ISetUserAge{
    type: string;
    age: number;
}
export interface ISetUserName{
    type: string;
    name: string;
}
export const setUserName = (newName:string):ISetUserName => {
    return {
        type: "SET_USER_NAME",
        name: newName
    };
};
export const setUserAge = (newAge:number):ISetUserAge => {
    return{ 
        type: "SET_USER_AGE", 
        age: newAge
}};

export type IUser = ISetUserName & ISetUserAge;