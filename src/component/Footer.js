import { useNavigate } from "react-router-dom";

function Footer() {

    let navigate = useNavigate();

    return (
        <footer id="footerType" className="footer__wrap nexon section">
        <h2 className="blind">푸터 영역</h2>
        <div className="footer__inner container">
            <div className="footer__menu">
                <div>
                    <h3>제품 소개</h3>
                    <ul>
                        <li><a href="#" onClick={()=>navigate('/man')}>남성용품</a></li>
                        <li><a href="#" onClick={()=>navigate('/woman')}>여성용품</a></li>
                        <li><a href="#" onClick={()=>navigate('/living')}>생활용품</a></li>
                        <li><a href="#" onClick={()=>navigate('/')}>Shoes</a></li>
                    </ul>
                </div>
                <div>
                    <h3>서비스센터</h3>
                    <ul>
                        <li><a href="#" onClick={()=>navigate('/board')}>불만 상담 코너</a></li>
                        <li><a href="#" onClick={()=>navigate('/board')}>고객은 원한다.</a></li>

                    </ul>
                </div>
                <div>
                    <h3>맴버쉽 운영</h3>
                    <ul>
                        <li><a href="#" onClick={()=>navigate('/member')}>회원가입</a></li>
                        <li><a href="#" onClick={()=>navigate('/mypage')}>MyPage</a></li>
                        <li><a href="#" onClick={()=>navigate('/cupon')}>쿠폰</a></li>
                  
                    </ul>
                </div>
                <div>
                    <h3>전국 지점</h3>
                    <ul>
                        <li><a href="/">대전</a></li>
                        <li><a href="/">대구</a></li>
                        <li><a href="/">서울</a></li>
                        <li><a href="/">강원도</a></li>
                        <li><a href="/">제주도</a></li>
                    </ul>
                </div>
                <div>
                    <h3>제휴사</h3>
                    <ul>
                        <li><a href="/">삼성전자</a></li>
                        <li><a href="/">현대쇼핑</a></li>
                        <li><a href="/">네셔널지오그라피</a></li>                    
                    </ul>
                </div>
                <div>
                    <h3>비전</h3>
                    <ul>
                        <li><a href="/">고객을 고객답게</a></li>
                        <li><a href="/">제품을 신선하게</a></li>
                        <li><a href="/">신기술 적용</a></li>                        
                    </ul>
                </div>
            </div>
            <div className="footer__right">
                2022 SpringStar Portfolio<br />
                All rights reserved.
            </div>
        </div>        
        <div className="topBtn" onClick={()=> { window.scroll(0, 0); }}></div>                          
    </footer>    
    )
}

export default Footer;