import React,{ createContext, useContext, useEffect, useState } from "react";

const clientID = process.env.REACT_APP_ACCESS_KEY
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

export const AppContext = createContext();

const AppProvider = ({children})=>{
    const [loading,setLoaindg]=useState(false)
    const [list,setList]=useState([])
    const [page,setPage]=useState(1)
    const [value,setValue]=useState('')
    const urlPage = `&page=${page}`
    const searchQuery=`&query=${value}`

    const getData = async()=>{
        setLoaindg(true)
        let dataApi;
        if(value){
            dataApi =`${searchUrl}?client_id=${clientID}${urlPage}${searchQuery}`;
        }else{
            dataApi =`${mainUrl}?client_id=${clientID}${urlPage}`
        }
        try{
            const response = await fetch(dataApi)
            const data = await response.json(); 
            setList((old)=>{
                if(value && page ===1){
                    return data.results;
                }
                else if(value){
                    return[...old,...data.results]
                }else{
                    console.log(value,"있나요?")
                    return [...old,...data]
                }
            })
        }catch{
            throw new Error("hohoho");
        }finally{
            setLoaindg(false)
        }
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[page])
    useEffect(() => {
        const event = window.addEventListener("scroll",()=>{
            if(window.scrollY+window.innerHeight >= document.body.clientHeight){
                setPage((old)=>{
                    return old+1;
                })
            }
        })
        return()=>{
            window.removeEventListener("scroll",event);
        }
    },[])

    return(
        <AppContext.Provider value={{setPage,loading,list,getData,value,setValue,getData}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext =()=> useContext(AppContext)

export default AppProvider;