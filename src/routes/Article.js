import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MarginTop from "../component/MarginTop";
import user from "../store/user";
import { deleteArticle } from "../store/board";

function Article() {
    let board = useSelector(state => state.board);
    let user = useSelector(state => state.user);
    let [article, setArticle] = useState({});
    
    let idx = useParams();    
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state.page)
    
    
    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
        let list = axios.get(`https://www.springstar.shop/listOne/${idx.id}` )        
        .then((r) => setArticle(r.data) )
        .catch((e) => console.log(e))
    },[])


    return (
        <div className="article__wrapper">
            <MarginTop />
            <h5 style={{color:'palevioletred', display:'inline-block'}}>StarMall </h5> <h5 style={{display:'inline-block'}}> 게시글</h5>
            <div className="article_head mt-3">
                <div className="title">제목: <b>{article.title}</b></div>
                <div className="title_user">ID: {article.regist_userid}</div>
            </div>
            <hr className="mt-2 board__hr" style={{border: '2px solid black', maxWidth: '850px', margin: '0 auto'}}/>
            <div className="contents" style={{ textAlign: 'left',
                padding: '30px',
                }}>{article.contents}
            </div>
            <button className="btn btn-primary mt-0" onClick={() => navigate('/board', {state: {page: location.state?.page} })}>이전</button>
            {
                article.regist_userid !== user.user_id ?  <>
                <button className="btn btn-success mt-0 ms-2" onClick={() => navigate(`/modify/${idx.id}`, {state: {page: location.state?.page}})} disabled>수정</button>
                <button className="btn btn-danger mt-0 ms-2" onClick={() => {
                    let choice = window.confirm('삭제하시겠습니까?')
                    if(choice) {
                        dispatch(deleteArticle(idx));
                        navigate('/board');
                    } else {
                        
                    }
                    }}disabled>삭제
                </button></>       
                : <>
                <button className="btn btn-success mt-0 ms-2" onClick={() => navigate(`/modify/${idx.id}`)}>수정</button>
                <button className="btn btn-danger mt-0 ms-2" onClick={() => {
                    let choice = window.confirm('삭제하시겠습니까?')
                    if(choice) {
                        dispatch(deleteArticle(idx));
                        navigate('/board');
                    } else {
                        
                    }
                    }}>삭제
                </button></>            
            }
        </div>
    )
};

export default Article;

