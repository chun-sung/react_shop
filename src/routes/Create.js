import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import MarginTop from "../component/MarginTop";
import { useDispatch, useSelector } from "react-redux";

function Create() {

    let user = useSelector(state => state.user)

    let [title, setTitle] = useState('');
    let [contents, setContents] = useState('');

    let navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
    },[])

    let article = {
        title,
        contents,                        
        regist_userid: user.user_id
    }

    function ajax() {        
        title.length == 0 || contents.length == 0 ? alert('제목/내용을 입력해 주세요')
        : axios.post("https://www.springstar.shop/api/articles/create", article ,)
            .then((r) => {
            if(r.data.msg == '성공') {
                // console.log(r.data)
                alert('등록되었습니다.')
                navigate('/board')
            }
        }).catch((e)=>console.log(e))
    }
    return (<>
        <MarginTop />
        <div className="mt-5 mb-5 board_input" style={{height:'700px',margin:'0 auto'}}>
            <h5>고객 문의 사항</h5>
   
            <Form.Control style={{ width:'100%', margin: '0 auto',fontSize: '16px'}} className="mt-3 mb-2"  type="text" 
                onChange={(e)=> { setTitle(e.target.value) }} placeholder="제목" 
            />
            
            <Form.Control style={{width:'100%', margin: '0 auto', height: '300px', fontSize:'14px'}}
            as="textarea" className="mb-3" placeholder="내용" onChange={(e)=> {setContents(e.target.value)}}
            />

            {/* <BlueBtn className='YelloBtn mx-1' onClick={(e)=> alert('구현중 입니다.')}><b>등록</b></BlueBtn> */}
            <button className='btn btn-primary mx-1' onClick={()=> ajax()}>등록</button>
            <button className='btn btn-danger ms-1' onClick={()=> navigate('/board')}>취소</button>
        </div>

    </>)
}

export default Create;