import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MarginTop from "../component/MarginTop";
import { recieve, usage } from "../store/coupon";
import SuccessLogin from "../function/SuccessLogin";
import { useNavigate } from "react-router-dom";

function Cupon({eCoupon, setEcoupon}) {
    
    let coupon = useSelector((state) => state.coupon)

    let [fade, setFade] = useState('');
   
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    // console.log('쿠폰함의 쿠폰정보',coupon)

    useEffect(()=> {
        window.scrollTo(0,0)  // 최상단 이동        
        setFade('end')
        return () => setFade('') 
    },[]) 
    
    return (<>
        <SuccessLogin />
        <MarginTop /> 
        <div className={"cupon start " + fade } style={{minHeight:'570px'}}>
    
            <h5 className="mt-5">보유 쿠폰</h5>
            { // 쿠폰이 없을 때 출력
                coupon?.length == 0 ?
                <><div className="search"></div><h3 className="couponMsg">사용 가능한 쿠폰이 없습니다!</h3></>
                : null
            }            
            { coupon.length > 0 
            ?  <ul className="coupon_list mt-3">
                {                    
                    coupon?.map((a, i) => {
                    return   <li className="list_item" key={i}><b className="list_text">{coupon[i]?.eventName}</b>
                                    <button className="btn btn-primary right" 
                                        onClick={() => {  
                                
                                            if( window.confirm(`"${coupon[i]?.eventName}" 을 사용하시겠습니까?`)){
                                                dispatch(usage({event_origin: a?.event_origin, useridx: a?.useridx}))                                               
                                                setEcoupon(!eCoupon)
                                            } else { 
                                                return null 
                                            }                              
                                        }}>사용하기
                                    </button>
                                </li>
                    })
                }
                </ul>
            : null
            }            
        </div>
    </>)
}

export default Cupon;