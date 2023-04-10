// 게시글 목록 데이터 요청 API
// https://www.springstar.shop/api/articles/list 

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarginTop from "../component/MarginTop";
import { useDispatch, useSelector } from 'react-redux';
import { initBoard } from '../store/board'
import moment from 'moment';
import SuccessLogin from "../function/SuccessLogin";
import Badge from 'react-bootstrap/Badge';
import Pagination from "react-js-pagination";
import '../component/Pagination.css';


function Board() {
    
    let user = useSelector(state => state.user);
    let board = useSelector(state => state.board);     
    
    // let dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();                // navigate 이동시 인자 값 전달 
    
    const [posts, setPosts] = useState([]);      // 게시글 데이터
    const [limit, setLimit] = useState(8);       // 페이지당 표시할 게시글 수
    const [page, setPage] = useState(location.state?.page == null ? 1 : location.state.page);// 페이지 번호
    let [fade, setFade] = useState('');

    // const [page, setPage] = useState(1);
    const handlePageChange = page => {
        setPage(page);
    };
    const offset = (page - 1) * limit;           // 페이지의 시작점    
    
    useEffect(()=>{
        window.scrollTo(0,0)           // 최상단 이동
        let list = axios.get('https://www.springstar.shop/list')
        .then((r) => setPosts(r.data))
        .catch((e) => console.log(e))
        setFade('end')
        return () => setFade('')         
    },[])

    return (<>        
        <MarginTop />
        <SuccessLogin />
        <div className={"board__wrapper start "+fade} style={{ margin:'0 auto'}}>  
            <h5 style={{color:'palevioletred', display:'inline-block'}}><b>StarMall</b></h5> <h5 style={{display:'inline-block'}}>고객게시판</h5>
       
            <button className='btn btn-primary createBtn' onClick={()=>{ 
                    user.nickName ? navigate('/create') : alert('로그인후 이용 가능합니다');
                }}>글작성
            </button>
           
            <hr className="mt-5" style={{border: '2px solid black', maxWidth: '800px', margin: '0 auto'}}/>

            {
            posts.length !== 0 ?
            <div className="row" style={{margin: '0px'}}>
                <div className="col-sm-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                            <div className="table-responsive">
                                <table className="table table-hover mt-3 mb-5" style={{ 
                                    maxWidth:'800px',
                                    margin: '0 auto'

                                 }}>
                                    <thead>
                                        <tr>
                                            <th width="20%">No</th>
                                            <th width="50%">제목</th>
                                            {/* <th width="10%">내용</th> */}
                                            {/* <th width="10%">등록일시</th> */}
                                            <th width="10%">작성일</th>                                            
                                            <th width="20%" className="">ID</th>                                            
                                        </tr>
                                    </thead>

                                    <tbody >                                    
                                    {                                      
                                        posts?.slice(offset, offset + limit).map(({ title, regist_date, regist_userid }, i) => {
                                           return  <tr key={i}>
                                                        <td style={{fontSize: '12px'}}>
                                                            {offset + i + 1 }
                                                        </td>
                                                        <td className="artcle_title" onClick={()=> {navigate(`/listOne/${posts[offset + i].article_idx}`,{state: {page:page}} )}}>
                                                            {title} { moment(regist_date).format('YY.MM.DD') == moment().format('YY.MM.DD') ? <Badge className="badge_board" bg="danger">New</Badge> : null}
                                                        </td>                                                        
                                                        <td style={{fontSize: '12px'}}>
                                                            {/* {moment(board[i].regist_date).format('YYYY.MM.DD HH:mm:ss')} */}
                                                            {moment(regist_date).format('YY.MM.DD')}
                                                        </td>
                                                        <td className="" style={{fontSize: '12px'}}>
                                                            {regist_userid}
                                                        </td>
                                                    </tr>  
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null }   

            <p style={{fontSize: '12px'}}> {page} <span>Page</span></p>
        </div>
        <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={posts.length}
            pageRangeDisplayed={5}      // 보여줄 페이지 개수            
            prevPageText="‹"
            nextPageText="›"            
            onChange={handlePageChange}
        />

    </>)
}

export default Board;