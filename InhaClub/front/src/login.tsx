import React, { useState } from "react";
import Logo from "./img/inha_logo.png";
import Biryong from "./img/biryong.png";
import axios from "axios";
function Login()
{
    const [userID, setID] = useState("");
    const [userPW, setPW] = useState("");
    return (
        <div className="outer mx-auto" style={{marginTop:'13%'}}>
            <img className="biryong mt-5 col-lg-1 d-none d-sm-block" src={Biryong}></img>
            <div className="container mx-0 mt-5 col-lg-6 col-md-4">
                <img className="logo mb-2 col-lg-3 col-sm-5" src={Logo}></img>
                <input className="inputBox_1 my-2 col-lg-8" placeholder="ID : " onChange={(e)=>{setID(e.target.value)}}></input>
                <input className="inputBox_1 mb-2 col-lg-8" type="password" placeholder="Password : " onChange={(e)=>{setPW(e.target.value)}}></input>
                <div className="joinText mt-3" style={{marginLeft:'46%'}}><span>로그인</span><span> / </span><span>회원가입 하기</span></div>
            </div>
            
        </div>
    );



}

export default Login;

