import { ReactComponentElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../store/store";

const meun = [
    '대형',
    '소형',
    '중앙',
    '연합',
    '인기',
    '신규',
    '종교',
    '예술'
]

const Carousel = ():any => {

    const dispatch = useDispatch()
    const keyword = useSelector((state:any) => state.keyword)

    return<>
    <div className="carousel">
        <div className="box">
            <div className="arrow">&lt;</div>
            <div className="flex-wide">
                <div className="meun">
                    <ul>
                        {
                            meun.map((a,i)=>{
                                return<li key={i} onClick={()=>{
                                    keyword.includes(a) || dispatch(addKeyword(a))
                                }}>{a + "동아리"}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="arrow">&gt;</div>
        </div>
    </div>
    </>
}

export default Carousel;