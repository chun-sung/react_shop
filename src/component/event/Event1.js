import { useSelector } from "react-redux";
import axios from "axios";

function Event1({eCoupon, setEcoupon}) {

    let user = useSelector(state => state.user);

    return (
        <>
            <h5 className='mt-3 event'>첫 주문시 사과주스 1box</h5>
            {
                user.nickName == undefined ? 
                <button className='mt-1 event_btn' onClick={()=>{alert('로그인 후 이용 가능합니다')}}>받기</button> :
                <button className='mt-1 event_btn' onClick={()=>{  
                    try {
                        let eventInfo ={
                            user_id: user.user_id,
                            event_origin: 'event1',
                            eventName: '첫 주문시 사과주스 1box',
                            haveEvent: true
                        }
                        axios.post('https://www.springstar.shop/eventItem', eventInfo).then((res) => {
                            if(res.data.msg == 'success') {
                                setEcoupon(!eCoupon);
                               alert('쿠폰함에 담았습니다.');
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

export default Event1;