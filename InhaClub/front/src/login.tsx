import React, { useState } from "react";
import Logo from "./img/inha_logo.png";
import Biryong from "./img/biryong.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { couldStartTrivia } from "typescript";
function Login()
{
    const [userID, setID] = useState("");
    const [userPW, setPW] = useState("");
    let dispatch = useDispatch();
    let login = useSelector((state)=>state);
    const navigate = useNavigate();
    return (
        <div className="outer mx-auto" style={{marginTop:'13%'}}>
            <img className="biryong mt-5 col-lg-1 d-none d-sm-block" src={Biryong}></img>
            <div className="container mx-0 mt-5 col-lg-6 col-md-4">
                <img className="logo mb-2 col-lg-3 col-sm-5" src={Logo}></img>
                <input className="inputBox_1 my-2 col-lg-8" placeholder="ID : " onChange={(e)=>{setID(e.target.value)}}></input>
                <input className="inputBox_1 mb-2 col-lg-8" type="password" placeholder="Password : " onChange={(e)=>{setPW(e.target.value)}}></input>
                <div className="joinText mt-3" style={{marginLeft:'46%'}}>
                    <span style={{cursor:'pointer'}} onClick={()=>doLogin()}>로그인</span>
                    <span> / </span>
                    <span style={{cursor:'pointer'}} onClick={()=>navigate("/join")}>회원가입 하기</span>
                </div>
            </div>
            
        </div>
    );

    function doLogin()
    {
        const JWT_EXPIRY_TIME = 180 * 10000;
        if(userID==="")
        {
            alert("아이디를 입력하십시오.");
            return;
        }
        else if(userPW==="")
        {
            alert("비밀번호를 입력하십시오.");
            return;
        }
        return axios.post("/api/doLogin",
        {
            userId:String(userID), userPw:String(userPW)
        }).then(response =>
        {
            const accessToken = response.data;
            if(accessToken==="")
            {
                alert("로그인 실패");
                return;
            }
            axios.defaults.headers.common['ACCESS_TOKEN'] = accessToken.access_TOKEN;
            axios.defaults.headers.common['REFRESH_TOKEN'] = accessToken.refresh_TOKEN;
            dispatch({type:'isLogin'});
            dispatch({type:'token', payload:{accessToken:accessToken.access_TOKEN, refreshToken:accessToken.refresh_TOKEN}});
            setTimeout(()=>{refresh()},JWT_EXPIRY_TIME);
            setTimeout(()=>{navigate("/")}, 3000);
        }).catch(function (error) {
            alert(error.message);
        });
    }
    function refresh()
    {
        const JWT_EXPIRY_TIME = 180 * 10000;
        return axios.post("/api/doLogin",
        {
            userId:String(userID), userPw:String(userPW)
        }).then(response =>
        {
            const accessToken = response.data;
            axios.defaults.headers.common['ACCESS_TOKEN'] = accessToken.access_TOKEN;
            axios.defaults.headers.common['REFRESH_TOKEN'] = accessToken.refresh_TOKEN;
            dispatch({type:'token', payload:{accessToken:accessToken.access_TOKEN, refreshToken:accessToken.refresh_TOKEN}});
            setTimeout(()=>{},JWT_EXPIRY_TIME);
        })
    }
}

export default Login;

