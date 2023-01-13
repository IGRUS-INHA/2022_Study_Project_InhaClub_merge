import { ReactComponentElement, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addKeyword, setIsSearch, subKeyword } from '../store/store'


const keywordList = ['헬스','달리기', '운동동아리', '운동하는남자']

const Header = ():any => {

    const navigate = useNavigate()
    // const [keyword, setKeyword]: any = useState([])
    const dispatch = useDispatch()
    const keyword = useSelector((state:any) => state.keyword)

    const [nowKeywordList, setNowKeywordList] = useState(['null'])

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
                                    dispatch(subKeyword(a))
                                }}>
                                    X
                                </div>
                            </div>
                        })
                    }

                    <input type="text" onChange={(e)=>{

                        let nowKeyword = e.target.value;
                        console.log(nowKeyword);

                        if(nowKeyword === ""){
                            setNowKeywordList(['null'])
                        }else{
                            console.log(keywordList);
                            let temp = keywordList.filter(keyword => keyword.startsWith(nowKeyword))
                            setNowKeywordList(temp)
                        }

                        if(nowKeyword.endsWith(" ")){
                            nowKeyword = nowKeyword.trim();
                            console.log(nowKeyword);
                            e.target.value = "";

                            if(nowKeyword != " " && nowKeywordList.includes(nowKeyword)){
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
                {
                    nowKeywordList[0] === "null" || <div className="recommend-keyword">
                    {
                        nowKeywordList.map(keyword => {
                            return <div>{keyword}</div>
                        })
                    }
                </div>
                }
            </div>
        </div>
    </header>
    </>
}

export default Header;