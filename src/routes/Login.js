import { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MarginTop from '../component/MarginTop';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/user';

function Login() {
    
    let [user_id, setId] = useState('')
    let [password, setPw] = useState('')

    let navigate = useNavigate()
    let dispatch = useDispatch();
    
    // window.scrollTo(0,0)  // 최상단 이동 (타이핑시 화면이동 문제 발생 적용 X )
    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
    },[])

    function ajax() {
        user_id.length == 0 || password.length == 0 
        ? alert('ID 및 PW 를 입력해 주세요') 
        : axios.post("https://www.springstar.shop/login2", { user_id, password }).then((res) => {
            
            if (res.data.msg == "성공") {                
                // alert(`로그인 ${res.data.msg}`);
                // localStorage.setItem('springStar_nick', res.data.nickName);
                // localStorage.setItem('springStar', res.data.jwttoken);
                // console.log(res.data)
                dispatch(login(res.data))
                //{msg: '성공', jwttoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZ…hciJ9.QM5-0nCExpxWV6S_Lc4XBi90HIABZncOf31rN-SgcmA',
                // nickName: '춘성', user_id: 'choonsung'}
                navigate("/mypage");
            } else {
                alert(`로그인 ${res.data.msg}`);
            }
        });
    }

    function loginEnterBtn() {
        ajax();
    }

    return (<>
        <MarginTop />
        <div className="mt-5" style={{width:'350px', height: '700px', margin:'0 auto'}}>  
            <h3 style={{color:'palevioletred', display:'inline-block'}}>StarMall</h3> 로그인
            <FloatingLabel 
                controlId="floatingInput"
                label="Email or ID"
                className="mb-3"
            >
                <Form.Control onChange={(e)=>{setId(e.target.value)}} type="email" placeholder="name@example.com" />
            </FloatingLabel>

            <FloatingLabel 
                controlId="floatingPassword" 
                label="Password"
                className='mb-3'
                >
                <Form.Control onKeyUp={()=>{if(window.event.keyCode==13){loginEnterBtn()}}} onChange={(e)=>{setPw(e.target.value)}} type="password" placeholder="Password" autoComplete='on' />
            </FloatingLabel>         
            
            <BlueBtn className='YelloBtn mx-1' onClick={()=> ajax()}><b>로그인</b></BlueBtn>
            <BlueBtn className='YelloBtn ms-1' onClick={()=> navigate('/')}><b>취소</b></BlueBtn>

            <div className='testAccount' style={{marginTop:'130px'}}>
                <div>
                    <h5>Test 계정:</h5>
                    <div>
                        <p> 아 이 디: <b>test1</b></p>
                        <p> 패스워드: <b>test1</b></p>               
                    </div>
                </div>
            </div>
        </div>
    </>)
}

let BlueBtn = styled.button`
    width: 100px;
    height: 40px;
    background: powderblue;
    color: black;
    padding: 3px;
    border: 0px solid black;
    border-radius: 5px;
`


export default Login;