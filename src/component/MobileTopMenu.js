import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../store/user";
import axios from "axios";

function MobileTopMenu() {

    let user = useSelector(state => state.user);

    let navigate = useNavigate();
    let dispatch = useDispatch();
    
    return (
    <>
        <div className="mobileTopMenu__wrapper">
            <div>
                {
                    user.nickName ? <div onClick={()=> navigate('/')} className="title_topMenu2"></div>
                    : <div onClick={()=> navigate('/')} className="title_topMenu"></div>                    
                }
                
                <ul className="mobile_TopMenu">                
                    <li onClick={() => navigate('/man')}>
                        <div>Man</div>
                        <div className="man_icon"></div>
                    </li>              
                    <li onClick={() => navigate('/woman')}>
                        <div>Woman</div>
                        <div className="person_icon"></div>
                    </li>                
                    <li onClick={() => navigate('/living')}>
                        <div>Living</div>
                        <div className="living_icon"></div>  
                    </li>
                    {
                        user.nickName ? 
                        <li onClick={()=> {
                            let choice = window.confirm('로그아웃 하시겠습니까?')                        
                            if(choice == true) {
                                // localStorage.removeItem('springStar');
                                // localStorage.removeItem('springStar_nick');
                                localStorage.setItem('watChed', JSON.stringify([]));
                                axios({
                                    url:"https://www.springstar.shop/logout2",
                                    method: "POST",
                                    withCredentials: true,
                                }).then((res) => {
                                    if(res.status === 200) {
                                        dispatch(logout());
                                        navigate('/');
                                    }
                                })
                            }
                        } }><div>Logout</div><div className="logout_icon"></div></li> 
                        :
                        <>
                            <li onClick={() => navigate('/member')}>
                                <div>회원가입</div>
                                <div className="member_icon"></div>  
                            </li>
                            <li onClick={() => navigate('/login')}>
                                <div>로그인</div>
                                <div className="login_icon"></div>  
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    
    </>
    )
}

export default MobileTopMenu;