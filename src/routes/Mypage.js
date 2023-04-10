import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MarginTop from "../component/MarginTop";
import SuccessLogin from "../function/SuccessLogin";

function Mypage() {

    let coupon = useSelector((state) => state.coupon)
    let cart = useSelector((state) => state.cart)
    let user = useSelector((state) => state.user)

    let [fade, setFade] = useState('');

    let navigate = useNavigate();

    window.scrollTo(0,0)  // 최상단 이동 
    useEffect(()=>{
        setFade('end')
        return () => setFade('') 
    },[])

    return (<>
        <MarginTop />
        <SuccessLogin />
        <div style={{minheight: '570px', margin:'0 auto'}} className={"mypageWrapper start "+ fade}>
            <h5><b style={{color:'palevioletred'}}>{ user.nickName }</b> 님 의 MyPage</h5>
            <div className="wrapper mt-3">
                {/* <div>주문/배송조회</div> */}
                <div className="delevery">                
                    <div>
                        <div>0</div>
                        <div>주문접수</div>
                    </div>
                    <span>{'>'}</span>
                    <div>
                        <div>0</div>
                        <div>결제확인</div>
                    </div>
                    <span>{'>'}</span>
                    <div>
                        <div>0</div>
                        <div>상품준비</div>
                    </div>
                    <span>{'>'}</span>
                    <div>
                        <div>0</div>
                        <div>배송중</div>
                    </div>
                    <span>{'>'}</span>
                    <div>
                        <div>0</div>
                        <div>배송완료</div>
                    </div>                
                </div>
            </div>
            <div className="point">
                <div className="btnCursur" onClick={() => navigate('/cupon')}>
                    <div >내쿠폰</div>
                    <div><b style={{color: 'red'}}>{coupon.length} </b>장</div>
                </div>
                <div className="btnCursur">
                    <div>포인트</div>
                    <div>1004 점</div>
                </div>
            </div>
            <div className="middle">
                <div className="btnCursur bg" >배송 조회</div>
                <div className="btnCursur bg" >반품/교환 내역</div>
                <div className="btnCursur bg" >정기배송관리</div>
                <div className="btnCursur bg" >최근 본 상품</div>
                <div className="btnCursur bg" onClick={() => navigate('/cart')}>장바구니 상품  <b style={{color: 'red'}}>{cart.length}</b> 개</div>
                <div className="btnCursur bg" >위시리스트</div>
                <div className="btnCursur bg" >배송지</div>
                <div className="btnCursur bg" >환불내역</div>
            </div>
            <div className="middle2">
                <div className="btnCursur" >1:1문의 관리</div>
                <div className="btnCursur" >상품평</div>
                <div className="btnCursur" >회원정보 수정</div>
                <div className="btnCursur" >회원 탈퇴</div>                
            </div>
            <p>불편사항은 고객 게시판에 남겨주세요.</p>            
        </div>        
        </>)
}

export default Mypage;