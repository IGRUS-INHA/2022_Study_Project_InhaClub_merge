import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoAnnyeong from "../../img/img_info_annyeong.png";
import Annyeong from "../../img/img_annyeong.png";
import { Link, useParams } from 'react-router-dom';

export type todoType = {
    id: number,
    clubId: number,
    clubName: string,
    clubCount: number,
    startDate: string,
    dueDate: string,
    clubTag: string,
    clubRecruit: boolean,
    clubDescription: string,
    headName: string,
    headNumber: string,
    headEmail: string,
    clubImage: string
};

function Clubs() {

    // URL 파라미터 받기 ( ClubID 구분 )
    const { clubId } = useParams();

    //const [Data, setData] = useState<todoType[]>([]);
    const [clubData, setClubData] = useState();

    useEffect(() => {
        axios.post('/api/club/' + clubId)
        .then((response) => {
            setClubData(response.data);
            alert(response.data);
        })
        .catch(function(error) {
            console.log("Error!");
        })
    }, []);

    console.log(clubData);

    return (
        <div id="wrap">
            <div className="blue_txt_space">
                <div className="uord_box">
                    <Link to="/edit">
                        <button className="btn">수정</button>
                    </Link>
                </div>
                <div className="info_box">
                    <div className="tit01">인덕이</div>
                    <div className="tit01"></div>
                    <div className="info_img">
                        <div className="inputimage_box">
                            <img src={InfoAnnyeong} alt="안뇽" />
                        </div>
                    </div>
                    <div className="info_desc">
                        <div>
                            <ul>
                                <li>
                                    <div className="tit02"></div>
                                    <div className="txt">환영합니다.</div>
                                </li>
                                <li>
                                    <div className="tit02">인원</div>
                                    <div className="txt">13명</div>
                                </li>
                                <li>
                                    <div className="tit02">모집 여부</div>
                                    <div className="txt">모집 중</div>
                                </li>
                                <li>
                                    <div className="tit02">모집 기간</div>
                                    <div className="txt">00~00</div>
                                </li>
                                <li>
                                    <div className="tit02">관심 분야</div>
                                    <div className="txt">태그</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="txt_box">
                <div className="tit02">활동</div>
                <div className="txt">
                    가장 오랜 역사를 간직한 안뇽 동아리는 인하대의 명물인 안뇽을 따라 인경호의 비밀을 파헤친다. 안뇽이가 귀엽고요ㅠ 인덕이를 만날 수 있어요. 좀 길게 쓰고 싶은데 뭘 써야 할 지 몰라서 복붙하겠습니다. 가장 오랜 역사를 간직한 안뇽 동아리는 인하대의 명물인  안뇽을 따라 인경호의 비밀을. 파헤친다. 인덕이가 귀여운 동아리 많관부 많관부 많관부 그냥 레퍼런스로 주신 거를 참고할게요.
                </div>
                <div className="txt">
                    청소년과 청년이 함께 만들어 가는 어쩌구 4기 기자단을 모집합니다.\n
                    작성한 기사는 대충 유명한 미디어그런곳에 송출됩니다. 전국 기자들과의 네트워크도 형성
                </div>
                <div className="txt">
                    <ul>
                        <li>1. 대한민국청소년 의회 사이트 기사 작성</li>
                        <li>2. 24시간 내 송고 시스템 운영</li>
                        <li>3. 언론인 멘토강연 참여</li>
                    </ul>
                </div>
            </div>

            <div className="blue_txt_space">
                <div className="txt_box">
                    <div className="tit02">담당자 정보</div>
                    <div className="txt">
                        <div>
                            <ul>
                                <li>담당자 : 홍길동</li>
                                <li>연락처 : 000-0000-0000</li>
                                <li>이메일 : abc@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="img_box">
                    <div className="tit01">동아리 사진</div>
                    <div className="img_wrap">
                        <div>
                            <img src={Annyeong} alt="안뇽이" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clubs;
