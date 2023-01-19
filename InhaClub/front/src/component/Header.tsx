import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addKeyword, setIsSearch, subKeyword } from '../store/store'


const keywordList = ['운동', '달리기', '운동동아리', '운동하는남자', '요리조리피하기', '헬스', '대형', '소형', '중앙','연합','인기','신규','종교','예술', '음악', '학술']

const Header = ():any => {

    const navigate = useNavigate()
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

                    <input type="text" className="keyword-input" onChange={(e)=>{

                        let nowKeyword = e.target.value;
                        console.log(nowKeyword);

                        if(nowKeyword === ""){
                            setNowKeywordList(['null'])
                        }else{
                            let temp = keywordList.filter(key => key.startsWith(nowKeyword) && !keyword.includes(key))
                            setNowKeywordList(temp)
                        }

                        if(nowKeyword.endsWith(" ")){
                            nowKeyword = nowKeyword.trim();
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