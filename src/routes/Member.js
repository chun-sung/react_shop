import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MarginTop from '../component/MarginTop';

function Member() {

    let [user_id, setUser_id] = useState('');
    let [psword, setPsword] = useState('');
    let [psword2, setPsword2] = useState('');
    let [nickName, setNickname] = useState('');

    let navigate = useNavigate()
    // window.scrollTo(0,0)  // 최상단 이동 (타이핑시 화면이동 문제 발생 적용 X )
    
    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
    },[])
    
    let member = { user_id, psword, nickName };
    
    function ajax() {
        psword !== psword2 ? alert('비밀번호가 일치하지 않습니다.') 
        :axios.post("https://www.springstar.shop/memberShip", { member }).then((res) => {
            if (res.data.msg == "성공") {
                console.log(res.data.msg);
                alert("회원가입이 완료되었습니다.");
                navigate('/login');
            } else if (res.data.msg == "ID") {
                alert("아이디는 최소 5자 이상이어야 합니다.");
            } else if (res.data.msg == "PW") {
                alert("비밀번호는 최소 5자 이상이어야 합니다.");
            } else if (res.data.msg == "nickName") {
                alert("닉네임은 최소 2자 이상이어야 합니다.");
            } else {
                alert("이미 사용중인 아이디 입니다.");                
            }
        });
    }

    return (<>
        <MarginTop />
        <div className="mt-5" style={{width:'360px', height: '700px', margin:'0 auto'}}>  
            <h3 style={{color:'palevioletred', display:'inline-block'}}>StarMall</h3> 회원가입
            <FloatingLabel 
                controlId="floatingInput"
                label="Email or ID"
                className="mb-3"
            >
                <Form.Control type="email" onChange={(e)=>
                    setUser_id(e.target.value)
                } placeholder="name@example.com"/>
            </FloatingLabel>
            
            <form>
            <FloatingLabel 
                label="Password"
                className='mb-3'
                >
                <Form.Control type="password" onChange={(e)=> {
                    setPsword(e.target.value)
                }} placeholder="Password" autoComplete='on' />
            </FloatingLabel>
            </form>
            
            <form>
            <FloatingLabel 
                label="Password Check"
                className='mb-3'
                >
                <Form.Control type="password" onChange={(e)=> {
                    setPsword2(e.target.value)
                }} placeholder="Password" autoComplete='on' />
            </FloatingLabel>
            </form>

            <FloatingLabel 
                label="Nickname"                
                >
                <Form.Control type="text" onChange={(e)=> {
                    setNickname(e.target.value)
                }} placeholder="Nickname" />
            </FloatingLabel>
            
            <BlueBtn className='YelloBtn mt-3 mx-1' onClick={()=> ajax()}><b>회원가입</b></BlueBtn>
            <BlueBtn className='YelloBtn ms-1' onClick={()=> navigate('/')}><b>취소</b></BlueBtn>
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
export default Member;