
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/user';
import { recieve } from '../store/coupon';
import { initCart } from '../store/cart';

function Menubar({eCart, eCoupon}) {
    
    let user = useSelector(state =>  state.user );
    let coupon = useSelector(state =>  state.coupon );
    let cart = useSelector(state=>  state.cart ); 

    
    let [badge, setBadge] = useState(false);
    let [badgeCart, setBadgeCart] = useState(false); 

    let dispatch = useDispatch(); 
    let navigate = useNavigate();

    useEffect(()=> {
        axios.post('https://www.springstar.shop/mycart', {user_id: user.user_id})
        .then((res) => {
            // console.log('카트 테이블 정보', res.data); 
            // console.log('카트 길이(length)', cart.length);                      
            dispatch(initCart(res.data))   
        }).catch((e) => console.log(e)) 
    },[user, eCart])

    useEffect(()=> {
        axios.post('https://www.springstar.shop/coupon',{user_id: user.user_id})   
        .then((r) => {                     
            dispatch(recieve(r.data))
            // console.log('쿠폰의 알',r.data);
        })
        .catch((e) => console.log(e))
    },[user, eCoupon])

    // console.log('메뉴바의 쿠폰 정보',coupon)

useEffect(()=> {       
        coupon.length > 0 ?  setBadge(true) : setBadge(false)
        cart.length   > 0 ?  setBadgeCart(true) : setBadgeCart(false);        
    },[coupon, cart])

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
            <Navbar.Brand className='logo'>
               <Nav.Link className='logo2 menu' href="#" onClick={()=>{navigate('/')}}>StarMall</Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link className='menu' href="#" onClick={()=>{navigate('/man')}}>남성용품</Nav.Link>
                <Nav.Link className='menu' href="#" onClick={()=>{navigate('/woman')}}>여성용품</Nav.Link>
                <Nav.Link className='menu' href="#" onClick={()=>{navigate('/living')}}>생활용품</Nav.Link>

            {  // ★ 로그아웃 일 때 쿠폰함에 쿠폰이 있어도 badge 안보이게 설정함 (DB 사용하면 이렇게 안해도 됨)
               // 위 setBadge() 함수로 보이지 않게 할 수 있지만 쿠폰 있는 상태로 로그아웃하면 보임                           
                user.nickName == undefined ?
                <Nav.Link className='menu' href="#" onClick={()=>{navigate('/notaccess')}}>
                    장바구니
                </Nav.Link> :
                <Nav.Link className='menu' href="#" onClick={()=>{navigate('/cart')}}>
                    장바구니{ badgeCart == true ? <Badge className="badge_cart2" bg="primary">{cart.length}</Badge> : null }
                </Nav.Link> 
            }
            {  // ★ 로그아웃 일 때 쿠폰함에 쿠폰이 있어도 badge 안보이게 설정함 (DB 사용하면 이렇게 안해도 됨)
               // 위 setBadge() 함수로 보이지 않게 할 수 있지만 쿠폰 있는 상태로 로그아웃하면 보임            
                user.nickName == undefined ?
                <Nav.Link className='menu coupon' href="#" onClick={()=>{ navigate('/notaccess') }}>
                    쿠폰함
                </Nav.Link> :
                <Nav.Link className='menu coupon' href="#" onClick={()=>{ navigate('/cupon') }}>
                    쿠폰함{ badge == true ? <Badge className="badge2" bg="primary">{coupon.length}</Badge> :null } 
                </Nav.Link> 
            }
            <Nav.Link className='menu' href="#" onClick={()=>{ navigate('/board') }}>고객게시판</Nav.Link>
            {
                user.nickName == undefined ? <Nav.Link href="#" onClick={()=>{ navigate('/member') }}>회원가입</Nav.Link>
                : null
            }
            </Nav>
                {
                    user.nickName !== undefined 
                    ? <Nav.Link href="#" className='user logo' style={{color: 'palevioletred', marginLeft: '10px'}} onClick={()=>{navigate('/mypage')}}> {user.nickName +' 님'}</Nav.Link>
                    : <Nav.Link href="#login" style={{color: 'black'}} onClick={()=>{navigate('/login')}}>login</Nav.Link>
                }
                {
                    user.nickName !== undefined ?
                        <Nav.Link href="#" onClick={()=>{
                            let choice = window.confirm('로그아웃 하시겠습니까?')                        
                            if(choice == true) {
                                localStorage.removeItem('springStar');
                                localStorage.removeItem('springStar_nick');
                                localStorage.setItem('watChed', JSON.stringify([]));
                                axios({
                                    url:"https://www.springstar.shop/logout2",  // 서버에서 토큰 초기화:  res.cookie('accessToken', '');  
                                    method: "POST",
                                    withCredentials: true,
                                }).then((res) => {
                                    if(res.status === 200) {
                                        dispatch(logout());
                                        navigate('/');
                                    }
                                })
                            }
                            }}>
                            <span style={{color: 'grey', marginLeft: '10px'}}>logout</span>
                        </Nav.Link>
                    : null
                }
                
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Menubar;