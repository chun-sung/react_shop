import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { recieve } from "../../store/coupon";

function Event2({eCoupon, setEcoupon}) {
    
    let user = useSelector(state => state.user);
    let dispatch = useDispatch();

    return (
        <>                
            <h5 className='mt-3 event'>10% 할인 쿠폰</h5>
            {
                user.nickName == undefined ? 
                <button className='mt-1 event_btn' onClick={()=> {alert('로그인 후 이용 가능합니다');}}>받기</button> :
                <button className='mt-1 event_btn' onClick={()=>{ 
                    try {
                        let eventInfo ={
                            user_id: user.user_id,
                            event_origin: 'event2',
                            eventName: '10% 할인 쿠폰',
                        }
                        axios.post('https://www.springstar.shop/eventItem', eventInfo).then((res) => {

                            if(res.data.msg == 'success') {
                                alert('쿠폰함에 담았습니다.')
                                // console.log(res.data)
                                dispatch(recieve(res.data));
                                setEcoupon(!eCoupon);
                            } else {
                                alert('해당 쿠폰을 이미 받으셨습니다.')
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }}>받기</button>    
            }           
        </>
    )
}

export default Event2;