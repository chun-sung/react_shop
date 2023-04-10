import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import MarginTop from "../component/MarginTop";

function NotAccess () {
    
    let navigate = useNavigate();
    
    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
    },[])

    return (<>
        <MarginTop />
        <div style={{width:'360px', minHeight: '550px', margin:'0 auto'}}>
            <h5 className="mt-5 mb-4">로그인 권한이 필요합니다</h5>
            <div className="notAccess"></div>
            <BlueBtn className='YelloBtn mx-1 mt-3' onClick={()=> navigate('/member')}><b>회원가입</b></BlueBtn>
            <BlueBtn className='YelloBtn ms-1' onClick={()=> navigate('/login')}><b>로그인</b></BlueBtn>
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
export default NotAccess;