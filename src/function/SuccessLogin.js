import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/user";

// login/success 로 요청을 보내는 로직(토큰 전송 /사용자 구분)
function SuccessLogin() {
    
    let [isLogin, setIsLogin] = useState(false);
    let dispatch = useDispatch();
    let user = useSelector(state => state.user)
    
        // useEffect(()=> {

        //     axios({
        //         url: "https://www.springstar.shop/login/success",
        //         method: "GET",
        //         withCredentials: true,
        //     })
        //     .then((result) => {
        //         if(result.data.msg == '성공') {
        //             // console.log(result)                   
        //             dispatch(login(result.data))
        //             return                   
        //         }                      
        //     }).catch( err => {
        //         // console.log(err)
        //         dispatch(logout())
        //     })
               
        // },[])
        
    return (        
        <></>
    )
}

export default SuccessLogin;