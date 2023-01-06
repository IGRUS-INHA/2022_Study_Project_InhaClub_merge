import { ReactComponentElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../store/store";

const clubs = [
    {
        id: 0,
        name: "헬스동아리",
        backgroundImage: "image.png",
        tags: ['운동']
    },
    {
        id: 1,
        name: "노래동아리",
        backgroundImage: "image.png",
        tags: ['음악']
    },
    {
        id: 2,
        name: "짱큰동아리",
        backgroundImage: "image.png",
        tags: ['중앙', '대형']
    },
    {
        id: 3,
        name: "봉사동아리",
        backgroundImage: "image.png",
        tags: ['봉사', '대형']
    },
    {
        id: 4,
        name: "축구동아리",
        backgroundImage: "image.png",
        tags: ['운동', '대형']
    },
    {
        id: 5,
        name: "기독교동아리",
        backgroundImage: "image.png",
        tags: ['종교', '대형']
    },
    {
        id: 6,
        name: "와인동아리",
        backgroundImage: "image.png",
        tags: ['신규', '술']
    },
]

const Main = ():any => {

    const [contentNum,setContentNum] = useState(3);

    return<>
    <div className="main">
        <Card contentNum={contentNum}></Card>
        {/* {
            contentNum == 3 && <div className="btn">
            <button onClick={()=>{
                setContentNum(clubs.length)
            }}>더보기</button>
        </div>
        } */}
    </div>
    </>
}

const Card = (props:any):any => {

    const dispatch = useDispatch()
    const isSearch = useSelector((state:any)=>state.isSearch)
    const [content, setContent] = useState(clubs);
    


    const keyword = useSelector((state:any)=>state.keyword)

    if(isSearch){
        let _content:any = [] 
        let _clubs:any = clubs

        console.log(keyword)

        for (let i = 0; i < keyword.length; i++) {
            _content.push(...clubs.filter(x=> x.tags.includes(keyword[i])))
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