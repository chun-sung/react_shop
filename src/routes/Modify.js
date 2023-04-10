import MarginTop from "../component/MarginTop";
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArticle } from "../store/board";



function Modify() {

    let user = useSelector(state => state.user);

    let [title, setTitle] = useState('');
    let [contents, setContents] = useState('');

    let idx = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let location = useLocation();

    useEffect(()=>{
        axios.get(`https://www.springstar.shop/listOne/${idx.id}`)
        .then((res)=> {
            // console.log(res.data)  // {article_idx: 132, board_idx: 1, title: '안녕하세요 ', contents: '올만이얌', view_cnt: 0, …}
            setTitle(res.data.title)
            setContents(res.data.contents)})        
        .catch((e) => console.log(e));
    },[])

    let summery = {
        id: idx.id,
        title,
        contents,                        
        regist_userid: user.user_id
    }

    function ajax() { 
        title.length == 0 || contents.length == 0 
        ? alert('제목/내용을 입력해 주세요') 
        : dispatch(updateArticle(summery))        
        navigate(`/listOne/${idx.id}`, {state:{ page: location.state?.page }})        
        alert('수정되었습니다.')
    }
 

    return (<>
        <MarginTop />
        <div className="mt-5 mb-5 board_input" style={{height:'700px',margin:'0 auto'}}>
            <h5>고객 문의 사항</h5>
   
            <Form.Control style={{ width:'100%', margin: '0 auto',fontSize: '14px'}} className="mt-3 mb-2"  type="text" 
                onChange={(e)=> setTitle(e.target.value) } placeholder="제목" 
                value={title}
            />
            
            <Form.Control style={{width:'100%', margin: '0 auto', height: '300px', fontSize:'12px'}}
            as="textarea" className="mb-3" placeholder="내용" onChange={(e)=> setContents(e.target.value) }
            value={contents}
            />

            {/* <BlueBtn className='YelloBtn mx-1' onClick={(e)=> alert('구현중 입니다.')}><b>등록</b></BlueBtn> */}
            <button className='btn btn-primary mx-1' onClick={()=> ajax()}>수정</button>
            <button className='btn btn-danger ms-1' onClick={()=> navigate(`/listOne/${idx.id}`)}>취소</button>
        </div>
    </>)
}

export default Modify;