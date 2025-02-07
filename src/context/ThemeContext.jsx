import React, {createContext,useState,useEffect} from "react";

const ThemeContext=createContext();

const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState("light");

    const toggleTheme=()=>{
        const newTheme=theme==="light"?"dark":"light";
        setTheme(newTheme);
        sessionStorage.setItem("theme",newTheme);
        document.documentElement.setAttribute("data-theme",newTheme);
    };

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">
            {children}
        </ThemeContext.Provider>
    );
}
export { ThemeContext,ThemeProvider};


