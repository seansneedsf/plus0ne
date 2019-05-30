export interface ITheme{
    type: string;
    theme: boolean;
}

export const setTheme = (themeStyle : boolean) : ITheme => {
    return {
        type: "SET_THEME",
        theme: themeStyle
    };
};
