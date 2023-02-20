import React, {useState, useRef} from 'react';
import axios from 'axios';
import DefaultImage from "../../img/default_image.png";
import Editor from './editor';

function Register() {

    // 서버로 보낼 변수들 //
    const [clubName, setCName] = useState("");  // 동아리 이름
    const [clubCount, setCCount] = useState("");  // 동아리 인원 수
    const [clubDescription, setCDes] = useState("");  // 동아리 설명
    const [clubRecruit, setCRec] = useState("");  // 동아리 모집 여부
    const [clubTag, setCTag] = useState(""); // 동아리 관심 분야

    const [startDate, setSDate] = useState("");  // 동아리 모집 시작일
    const [dueDate, setDDate] = useState("");  // 동아리 모집 마감일

    const [headName, setHName] = useState("");  // 담당자 이름
    const [headNumber, setHNumber] = useState("");  // 담당자 번호
    const [headEmail, setHEmail] = useState("");  // 담당자 이메일

    const [content, setContent] = useState("");  // 텍스트 에디터 내용

    const [mainCloudURL, setMCloudURL] = useState("");  // 메인 이미지 URL
    const [contentCloudURL, setCCloudURL] = useState("");  // 콘텐츠 이미지 URL


    // editor 컴포넌트에서 HTML 코드 가져오기
    const editorFunc = (content:any) => {
        setContent(content);
    }

    // 이미지 업로더
    const imageUploader = async (file: any) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "inhaclub");
        data.append("api_key", "499483534542436");

        const res = await fetch('https://api.cloudinary.com/v1_1/jmn5316/image/upload', {
            method: 'POST',
            body: data
        });

        const urll = await res.json();
        return urll.secure_url;
    }

    // 메인 파일 저장
    const [mainFileURL, setMFileURL] = useState("");  // 메인 이미지 로컬 파일 URL
    const [mainFile, setMFile] = useState(null);  // 메인 이미지 로컬 파일 ( 이미지 업로더로 넘길 )

    const mainimgInput = useRef<any>();

    const onClickMImgUpload = () => {
        mainimgInput.current.click();
    };

    const saveMFileImage = (e: any) => {
        setMFileURL(URL.createObjectURL(e.target.files[0]));
        setMFile(e.target.files[0]);
    };

    // 콘텐츠 파일 저장
    const [contentFileURL, setCFileURL] = useState("");  // 콘텐츠 이미지 로컬 파일 URL
    const [contentFile, setCFile] = useState(null);  // 콘텐츠 이미지 로컬 파일 ( 이미지 업로더로 넘길 )

    const conimgInput = useRef<any>();
    
    const onClickCImgUpload = () => {
        conimgInput.current.click();
    };

    const saveCFileImage = (e: any) => {
        setCFileURL(URL.createObjectURL(e.target.files[0]));
        setCFile(e.target.files[0]);
    };

    // // 파일 삭제
    // const deleteFileImage = () => {
    //   URL.revokeObjectURL(fileImage);
    //   setFileImage("");
    // };

    function submitClubData()
    {
        if(window.confirm("동아리를 등록하시겠습니까?")) {
            
            // 이미지를 클라우드로 보낸 뒤 받은 URL 저장
            imageUploader(mainFile).then((geturl) => setMCloudURL(geturl));
            imageUploader(contentFile).then((geturl) => setCCloudURL(geturl));

            //alert("동아리 등록 완료");

            axios.post("/api/club/clubRegister",
                {
                    // 이 밑의 4개만 있어도 spring과 정상적인 통신 가능
                    clubName: clubName,
                    description: clubDescription,
                    representative: headName,
                    inRecruit: clubRecruit,

                    // 이 밑은 비어도 됨 (spring에 또다른 데이터 추가 필요시 추가 가능)
                    // interest: clubTag // 동아리 관심사 
                    // sns:  // 동아리 sns
                    // room:  // 동아리방
                    // recruitTarget:  // 모집 대상
                    // recruitStart: startDate // 시작 날짜
                    // recruitEnd: dueDate // 종료 날짜
                    // applicationConditions:  // 동아리 지원 조건
                    // tags: clubTag // 검색 태그
                    // numOfMem: clubCount // 동아리 인원 수

                }).then(function (response) {
                    if (response.data) {
                        imageUploader(mainFile).then((geturl) => setMCloudURL(geturl));
                        imageUploader(contentFile).then((geturl) => setCCloudURL(geturl));
                        alert("동아리 등록 완료");
                    }
                    else alert("동아리 등록 실패");
                })
        }
    }

    function checkImgURL()
    {
        alert("메인 이미지 URL : " + mainCloudURL + "\n 콘텐츠 이미지 URL : " + contentCloudURL)
    }

  return (
    <div id="wrap">
    <div className="uord_box">
        <button className="btn" onClick={submitClubData}>등록</button>
        <button className="btn" onClick={checkImgURL}>URL 확인하기</button>
    </div>
    <div className="info_box">
        <div className="title_box">
            <input className="box_tit" placeholder="제목을 입력하세요." onChange={(e)=>{setCName(e.target.value)}}></input>
        </div>
        <div className="info_img">
            <div className="inputimage_box">
            <button type="button" onClick={onClickMImgUpload} >
                <img src={mainFileURL ? mainFileURL : DefaultImage} alt="" />
            </button>
            </div>
            <input type="file" accept="image/*" onChange={saveMFileImage} ref={mainimgInput} />
        </div>
        <div className="info_desc">
            <div className="info_box">
            <ul>
            <li>
                    <div className="tit02">동아리 설명</div>
                    <input className="box_1" placeholder="동아리 설명을 입력하세요." onChange={(e)=>{setCDes(e.target.value)}}></input>
                </li>
                <li>
                    <div className="tit02">인원</div>
                    <input className="box_1" type="number" placeholder="0" onChange={(e)=>{setCCount(e.target.value)}}></input>
                </li>
                <li>
                    <div className="tit02">모집 여부</div>
                    <select className="box_1" onChange={(e)=>{e.target.value === "yes" ? setCRec(e.target.value) : setCRec(e.target.value)}}>
                            <option value="true">모집 중</option>
                            <option value="false">모집 마감</option>
                    </select>
                </li>
                <li>
                    <div className="tit02">모집 기간</div>
                    <input className="box_2" type="date" onChange={(e)=>{setSDate(e.target.value)}}></input>
                    <input className="box_2" type="date" onChange={(e)=>{setDDate(e.target.value)}}></input>
                </li>
                <li>
                    <div className="tit02">관심 분야</div>
                    <input className="box_1" placeholder="동아리 설명을 입력하세요." onChange={(e)=>{setCTag(e.target.value)}}></input>
                </li>
            </ul>
            </div>
        </div>
    </div>

    <div className="txt_box">
        <div className="tit02">활동</div>
        <div className="editor_box">
            <Editor content={content} setContent={editorFunc}/>
        </div>
    </div>

    <div className="txt_box">
        <div className="tit02">담당자 정보</div>
        <ul>
        <li>
                <label className="input_txt">담당자 : 
                <input className="box" placeholder="담당자를 입력하세요." onChange={(e)=>{setHName(e.target.value)}}></input>
                </label>
            </li>
            <li>
                <label className="input_txt">연락처 : 
                <input className="box" placeholder="연락처를 입력하세요." onChange={(e)=>{setHNumber(e.target.value)}}></input>
                </label>
            </li>
            <li>
                <label className="input_txt">이메일 : 
                <input className="box" placeholder="이메일을 입력하세요." onChange={(e)=>{setHEmail(e.target.value)}}></input>
                </label>
            </li>
        </ul>
    </div>

          <div className="img_box">
              <div className="tit01">동아리 사진</div>
              <div className="image_attach_box">
                  <div className="inputimage_box">
                      <img src={contentFileURL ? contentFileURL : DefaultImage} alt="" className="cimage-box" />
                      <button type="button" onClick={onClickCImgUpload}>Upload Image</button>
                  </div>
                  <input type="file" accept="image/*" onChange={saveCFileImage} ref={conimgInput} />
              </div>
          </div>
      </div>
 );
}

export default Register;
