import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux'
import { initCart, addCount, allOrder, dCount, deleteitem, setCheck } from '../store/cart';
// import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom';
import MarginTop from '../component/MarginTop';
import SuccessLogin from '../function/SuccessLogin';

function Cart({eCart, setEcart}) {

    let cart = useSelector((state)=>  state.cart )   
    let user = useSelector((state)=>  state.user )   

    // state: 체크된 아이템을 담을 배열
    const [checkItems, setCheckItems] = useState([]);
    const [fade, setFade] = useState('');
    
    let navigate = useNavigate();
    let dispatch = useDispatch();                     // store.js 에 요청 보내주는 함수
    
    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동 
        setFade('end')
        return () => setFade('') 
    },[])

    //함수: 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems(prev => [...prev, id]);       
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));
        }
    };


    // 함수: 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
        const idArray = [];
        cart.forEach((el) => idArray.push(el.id));
        // console.log(idArray);
        setCheckItems(idArray);
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        setCheckItems([]);
        }
    }

    return (<>
        <MarginTop />
        <SuccessLogin />
        <div className={'cart start ' + fade}>
            <h5 className='cart__title'><b style={{color:'palevioletred'}}>{user.nickName}</b> 님 의 장바구니</h5>
            <Table responsive="md">
                <thead>
                <tr>
                    <th style={{width:'12%'}}>
                        {
                            cart?.length == 0 ? null  
                            : <input type='checkbox' name='select-all'  onClick={(e)=>{ 
                                dispatch(allOrder(e.target.checked));
                                 // console.log('체크된 아이템:',checkItems);
                                 // console.log('아이템 길이:',checkItems.length);
                                }}
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                 // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                checked={checkItems.length == cart.length ? true : false} />                            
                        }
                    </th>
                    <th style={{width:'5%'}}>ID</th>
                    <th style={{width:'20%'}}>상품</th>
                    <th style={{width:'20%'}}>가격</th>
                    <th style={{width:'8%'}}>수량</th>
                    <th style={{width:'18%'}}>변경</th>            
                    <th style={{width:'12%'}}>삭제</th>            
                </tr>
                </thead>
                <tbody>
                    {cart?.length > 0 ?
                        cart?.map((a, i) => { 
                           return <tr key={i}>
                                {/* <td><input onClick={()=>{     
                                    dispatch(setCheck(cart[i].id));
                                }} type={'checkBox'} /></td>      */}
                                <td>
                                    <input type='checkbox' className='cartItemCheck' onClick={()=>{     
                                            dispatch(setCheck(cart[i].id));
                                        }}
                                        onChange={(e) => {
                                            handleSingleCheck(e.target.checked, cart[i].id)
                                            // console.log(checkItems)
                                        }} 
                                        
                                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                        checked={checkItems.includes(cart[i].id) ? true : false}/>
                                </td>
                                <td>{cart[i].id}</td>

                                <td className='itemHover' onClick={()=> {                                    
                                    navigate(`/detail/${a?.id}`)
                                }}>{cart[i].title}</td>

                                <td>{cart[i].price}원</td>
                                
                                <td>{cart[i].count}</td>
                                
                                <td>
                                    <button className='plusBtn btn btn-secondary' onClick={()=>{
                                        dispatch(addCount(cart[i].id))
                                    }} >+</button>
                                    <button className='plusBtn btn btn-secondary' onClick={()=>{
                                        dispatch(dCount({id: cart[i].id, price: cart[i].price}))
                                    }} >-</button>
                                </td>       
                                     
                                <td>
                                    <button className='plusBtn btn btn-danger' onClick={()=> {
                                         if( window.confirm(`"${cart[i].title}" 을 삭제 하시겠습니까?`)){
                                            dispatch(deleteitem({id: a.id, useridx: a.useridx}))  
                                            setCheckItems([])    // 선택된 아이템 삭제후 배열 초기화
                                            setEcart(!eCart)
                                        } else { 
                                            return null 
                                        }       
                                    }}>del</button>
                                </td>
                            </tr>
                        })
                        : null 
                    }                    
                    
                </tbody>
            </Table>      
                {
                    cart?.length > 0 ? 
                    <button className='orderBtn btn btn-primary mt-3 mb-5' onClick={()=> {

                        let items = cart.filter((a, i) => {
                            return a.checked == true;
                        })
                        // console.log('items', items)           //[{ *checked: true, idx: 67, id: 0, title: 'White and Black',…}]

                         let deleteItem = items.map(a => {
                            return {idx: a.idx}
                         })
                        //  console.log(deleteItem);

                        if(items == false) {                  // map 조건에 맞지 않으면 false 리턴(선택된 것 없다면 false)
                            alert('상품을 선택해 주십시오')
                        } else{
                            // let count = items.length;
                            alert(`결제 페이지로 이동합니다  (구매 상품 ${items.length}건)`)                            
                            // dispatch(order())
                            dispatch(deleteitem(deleteItem))                            
                            setCheckItems([])                  // 선택 아이템 주무(삭제)후 배열 초기화
                            setEcart(!eCart)
                            // console.log('주문후 아이템',checkItems)
                        }
                        }}>주문하기
                    </button>
                    : <><div className="search_cart"></div><h3 className="couponMsg">선택한 상품이 없습니다!</h3></>
                }                
        </div>
        
    </>)
}

export default Cart;