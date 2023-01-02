import { ReactComponentElement, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addKeyword, setIsSearch, subKeyword } from '../store/store'


const Header = ():any => {

    const navigate = useNavigate()
    // const [keyword, setKeyword]: any = useState([])
    const dispatch = useDispatch()
    const keyword = useSelector((state:any) => state.keyword)

    return<>
    <header>
        <div>
            <div className="biryong"/>
            <div className="header-top">
                <div className="inha-logo" onClick={()=> navigate('/')}></div>
                <div className="flex-wide"></div>
                <div className="nav" onClick={()=>{navigate('/login')}}>
                    로그인/회원가입
                </div>
            </div>
            <div className="header-bottom">
                
                <div className="search">
                    {
                        keyword.map((a:any,i:any)=>{
                            return<div className="keyword" key={i}>
                                {a}
                                <div className="del" onClick={(e)=>{
                                    e.stopPropagation()
                                    // let a = [...keyword]
                                    // a.splice(i,1)
                                    // setKeyword(a)
                                    console.log(a)
                                    dispatch(subKeyword(a))
                                }}>
                                    X
                                </div>
                            </div>
                        })
                    }
                    <input type="text" onChange={(e)=>{

                        let nowKeyword = e.target.value;
                        if(nowKeyword.endsWith(" ")){
                            e.target.value = "";
                            
                            if(nowKeyword != " "){
                                // let a = [...keyword]
                                // a.push(nowKeyword)
                                // setKeyword(a))
                                nowKeyword = nowKeyword.slice(0,-1)
                                console.log(nowKeyword)
                                keyword.includes(nowKeyword) || dispatch(addKeyword(nowKeyword));
                            }
                        }

                        }} placeholder="ex) 음악, 운동, 학술"
                        />
                </div>
                <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" 
                onClick={()=>{
                    dispatch(setIsSearch(true))
                }}/>
            </div>
        </div>
    </header>
    </>
}

export default Header;