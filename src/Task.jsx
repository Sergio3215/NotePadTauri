import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { containerGeneral, listManagerContainer } from "./Task.module.css"


function Task() {

    const [listItem, setListItem] = useState([]);
    const [itemIndex, setItemIndex] = useState(-1);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [value, setValue] = useState("");


    // async function greet() {
    //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    //   setGreetMsg(await invoke("greet", { name }));
    // }

    useEffect(() => {
        getWindowSize();
        window.addEventListener("resize", () => {
            getWindowSize();
        })
    }, []);

    async function getWindowSize() {
        try {
            const size = await invoke('get_window_size');
            // console.log('Window size
            setWidth(size[0] - 150);
            setHeight(size[1] - 40)
            return size;
        } catch (error) {
            console.error('Error getting window size:', error);
            return null;
        }
    }


    function addItem() {
        let arr = listItem;
        arr.push({
            title: "sin titulo",
            text: "",
            backgroundColor: "transparent"
        })
        setListItem([...arr]);
    }

    function updateItem(text) {
        let arr = listItem;
        arr[itemIndex].title = text.length >= 5? text.substring(0, 4)+"...": text.substring(0, text.length);
        if(text.length == 0){
            arr[itemIndex].title = "sin titulo";
        }
        arr[itemIndex].text = text;
        setValue(text);
        setListItem([...arr]);
    }

    function selectItem(index) {

        listItem.map((lst, ii)=>{
            if(ii == index){
                lst.backgroundColor = "rgba(0,0,0,0.5)";
            }
            else{
                lst.backgroundColor = "transparent";
            }
        });
        
        setListItem([...listItem]);

        setItemIndex(index);
        setValue(listItem[index].text);
    }

    function removeItem(index){
        let arr = [];

        listItem.map((a, ii)=>{
            if(ii != index){
                a.backgroundColor = "transparent";
                arr.push(a);
            }
        })
        setListItem([...arr]);

        setValue("");
        setItemIndex(-1);
    }


    return (
        <>
            <div className={containerGeneral}>
                <div className={listManagerContainer}>
                    <button onClick={() => addItem()}>Nueva Nota</button>
                    {
                        (listItem.length > 0) ?

                            listItem.map((lst, index) => {
                                return (
                                    <div style={{
                                        backgroundColor: lst.backgroundColor
                                    }}>
                                        <label  onClick={() => selectItem(index)}>
                                            {lst.title}
                                        </label>
                                        <label onClick={()=>removeItem(index)}>x</label>
                                    </div>
                                )
                            })
                            :
                            <span>No se ha creado nada aun</span>
                    }
                </div>
                <div>
                    {

                        (itemIndex > -1) ?
                            <textarea style={{
                                minWidth: width + "px",
                                minHeight: height + "px",
                                maxWidth: width + "px",
                                maxHeight: height + "px",
                            }} onChange={(e) => {
                                updateItem(e.target.value);
                            }} value={value}>
                            </textarea>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    );
}

export default Task;  