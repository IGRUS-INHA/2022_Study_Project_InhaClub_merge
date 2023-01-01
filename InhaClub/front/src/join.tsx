import React, { useState } from "react";
import Logo from "./img/inha_logo.png";
import Biryong from "./img/biryong.png";
import axios from "axios";
function Join()
{
    const [userId, setID] = useState("");
    const [userPw, setPW] = useState("");
    const [userNickname, setName] = useState("");
    const [userEmail, setEmail] = useState("");
    const [code, setCode] = useState("");

    var mailchk : boolean = false;

    return (
        <div className="outer mx-auto">
            <img className="biryong mt-5 col-lg-1 d-none d-sm-block" src={Biryong}></img>
            <div className="container mx-0 mt-5 col-lg-6 col-md-4">
                <img className="logo mb-2 col-lg-3 col-sm-5" src={Logo}></img>
                <input className="inputBox_1 my-2 col-lg-8" placeholder="ID : " onChange={(e)=>{setID(e.target.value)}}></input>
                <input className="inputBox_1 mb-2 col-lg-8" type="password" placeholder="Password : " onChange={(e)=>{setPW(e.target.value)}}></input>
                <input className="inputBox_1 col-lg-8" placeholder="닉네임 : " onChange={(e)=>{setName(e.target.value)}}></input>
                <div className="mt-2">
                    <input className="inputBox_1 col-lg-6" placeholder="E-mail : " onChange={(e)=>{setEmail(e.target.value)}}></input>
                    <button className="inputBox_1 mx-2" style={{width:'15.4%', textAlign:'center'}} onClick={()=>{EmailConfifm()}}>인증하기</button>
                </div>
                <div className="mt-2">
                    <input className="inputBox_2 mb-2 col-lg-5" placeholder="인증번호 : " onChange={(e)=>{setCode(e.target.value)}}></input>
                    <button className="inputBox_2 mx-2" style={{width:'15.4%', textAlign:'center'}} onClick={()=>{EmailConfifmChk()}}>확인</button>
                </div>
                <div className="joinText mt-3" onClick={()=>{Register()}}>회원가입 하기</div>
            </div>
            
        </div>
    );

    function EmailConfifm()
    {
        return axios.post("/api/auth/mailConfirm",
        {userEmail}).then(function(response)
        {
            if(response.data) alert("인증 이메일을 전송했습니다.");
            else alert("중복된 이메일입니다.");
        });
    }

    function EmailConfifmChk() : void
    {
        axios.post("/api/auth/mailConfirmChk",
        {code}).then(function(response)
        {
            mailchk = response.data;
            if (mailchk) alert("인증되었습니다.");
            else alert("인증 실패");
        });
    }

    function Register()
    {
        if (mailchk)
        {
            return axios.post("/api/auth",
            {
                userId, userPw, userNickname, userEmail
            }).then(function()
            {
                alert("회원가입 완료");
            })
        }
        else return alert("Error!");
    }


}

export default Join;

