import userEvent from "@testing-library/user-event";
import axios from "axios";
import { ReactComponentElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "reselect/es/types";
import { setIsSearch } from "../store/store";


const Main = ():any => {

    const [contentNum, setContentNum] = useState();
    const [clubs, setClubs] = useState([]);

    try {
        useEffect(()=>{
            axios.post("/api/clubList").then(response => {
                setClubs(response.data);
                console.log(response.data);
            });
        },[]);
    } catch (exception) {
        alert("Error!");
    }

    return(
        <>
            <div>
                <Lists clubs={clubs}/>
            </div>
        </>
    );
    /*
   return(
    <div className="main">
        <Card></Card>
        {
            contentNum == 3 && <div className="btn">
            <button onClick={()=>{
                setContentNum(list.length);
            }}>더보기</button>
        </div>
        }
    </div>
   );*/
}


const Lists = ({clubs} : any) => {
    return (
        <>
            <div>
                {clubs.clubList && clubs.clubList.map((club:any) => {
                    return (
                        <div id={club.id}>
                            {club.clubName}
                        </div>
                    )
                })}
            </div>
        </>
    );
};


const Card = ({clubs}:any):any => {

    const dispatch = useDispatch()
    const isSearch = useSelector((state:any)=>state.isSearch)
    const [content, setContent] = useState(clubs);
    


    const keyword = useSelector((state:any)=>state.keyword)

    if(isSearch){
        let _content:any = [] 
        let _clubs:any = clubs

        console.log(keyword)

        for (let i = 0; i < keyword.length; i++) {
            _content.push(...clubs.filter((x:any) => x.tags.includes(keyword[i])))
        }
    
        setContent(_content)
        dispatch(setIsSearch(false))
    }else{
    }

    // 만약 검색 상태면 -> key를 가져와서 일치하는 거 보여주기


    //키워드 한 개씩 돌리면서 -> 있으면 nowClubs에 넣고 keyword에 삭제-> 넣기  
    return<>
    {
        content.map((a:any ,i:any)=>{
            
            return<div className="card-container" key={i}>
            <div className="card"/>
            <div className="title">
                {a.name}
            </div>
            </div>
        })
    }
    </>
}

export default Main;