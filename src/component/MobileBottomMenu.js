import { useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MobileBottomMenu() {
    
    let coupon = useSelector((state)=>  state.coupon ) 
    let user = useSelector((state)=>  state.user ) 
    let cart = useSelector((state)=>  state.cart ) 
    
    let [badge, setBadge] = useState(false);   
    let [badgeCart, setBadgeCart] = useState(false);   
    
    let navigate = useNavigate();

    useEffect(()=> {
        coupon.length > 0 ?  setBadge(true) : setBadge(false);
    },[coupon])

    useEffect(()=> {
        cart.length > 0 ?  setBadgeCart(true) : setBadgeCart(false);
    },[cart])
    
    return (
    <>
        <div className="mobileMenu">
            <ul className="mobileText" style={{fontSize: '12px'}}>
                <li onClick={() => navigate('/')}>
                    <div>홈</div>
                    <div className="home_icon"></div>
                </li>
                {
                    user.nickName ? 
                        <li onClick={() => navigate('/mypage')}>
                            <div>My</div>
                            <div className="person_icon"></div>
                        </li>    
                    : 
                        <li onClick={() => navigate('/notaccess')}>
                            <div>My</div>
                            <div className="person_icon"></div>
                        </li>    
                }              
                { // ★ 로그아웃 일 때 쿠폰함에 쿠폰이 있어도 badge 안보이게 설정함 (DB 사용하면 이렇게 안해도 됨)
                  // 위 setBadge() 함수로 보이지 않게 할 수 있지만 쿠폰 있는 상태로 로그아웃하면 보임
                    user.nickName ?
                    <li className="relative" onClick={() => navigate('/cart')}>
                        <div>장바구니</div><div className="cart_icon"></div> {badgeCart == false ? null : <Badge className="badge_cart" bg="primary">{cart.length}</Badge> }                    
                    </li> :
                    <li className="relative" onClick={() => navigate('/notaccess')}>
                        <div>장바구니</div>
                        <div className="cart_icon"></div>             
                    </li>
                }
                { // ★ 로그아웃 일 때 쿠폰함에 쿠폰이 있어도 badge 안보이게 설정함 (DB 사용하면 이렇게 안해도 됨)
                  // 위 setBadge() 함수로 보이지 않게 할 수 있지만 쿠폰 있는 상태로 로그아웃하면 보임
                    user.nickName ?
                    <li className="relative" onClick={() => navigate('/cupon')}>
                        <div>쿠폰함</div><div className="coupon_icon"></div> {badge == false ? null : <Badge className="badge" bg="primary">{coupon.length}</Badge> }                    
                    </li> :
                    <li className="relative" onClick={() => navigate('/notaccess')}>
                        <div>쿠폰함</div>
                        <div className="coupon_icon"></div>             
                    </li>
                }
                    <li onClick={() => navigate('/board')}>
                        <div>게시판</div>
                        <div className="person_icon"></div>
                    </li>                        
  
            </ul>
        </div>
    
    </>
    )
}

export default MobileBottomMenu;