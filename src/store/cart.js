import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

let cart = createSlice({       
    name: 'cart',
    initialState: [
        // {id : 0, title : 'White and Black', price: 120000, count : 2},
       //  {"id":0,"title":"White and Black","price":120000,"count":2} JSON 형태

    ],

    reducers: {
        initCart(state, action) {
            return state = action.payload;
        },
        addCount(state, action) {            
            let idx = state.findIndex( a => a.id === action.payload )                             
            state[idx].count++                           
            state[idx].price = state[idx].count * 120000; 
        },
        dCount(state, action) {
           let idx = state.findIndex( a => a.id === action.payload.id )
           let 초기값 = state[idx].price;
           if(state[idx].count > 1) {
               state[idx].count--
               state[idx].price = state[idx].count * 120000;   
            //    console.log(action.payload)
           }           
        },
        addItem(state, action) {
            let idx = state.findIndex((a) => a.id == action.payload.id )  // 못 찾으면 -1 반환    
            if(idx == -1) {        
                state.push(action.payload);
                alert('장바구니에 담았습니다.'); 
            } else if(idx !== -1){
                alert('이미 목록에 있습니다.') 
            }
        },
        deleteitem(state, action) {
            // action.payload  { id: 1, useridx: 103}
            try {
              axios.post('https://www.springstar.shop/deleteitem', action.payload)
            } catch (error) {
                alert('에러가 발생했습니다.')
                console.log(error)
            }
        },
        // removeItem(state, action) {
        //     let item = state.findIndex((a, i) => {
        //         return a.id == action.payload 
        //     })
        //     state.splice(item, 1)
        // },
        setCheck(state, action){
            let idx = state.findIndex((a, i) => {
                return a.id == action.payload
            })            
            state[idx].checked = !state[idx].checked;
            // state[idx].checked = true;    이렇게 하면 true 값 고정됨   
            // console.log(state[idx].checked)
        },
        allOrder (state, action) {
            let result            
            if(action.payload){
                state.map((a, i) => {
                   state[i].checked = true
                })            
            } else {
                state.map((a, i) => {
                   state[i].checked = false
                })  
            }   
            return state;         
        },
        clear(state, action) {            
            // console.log(state);
            // let findId = action.payload.map((a) => a.id)  // id 값이 들어 있는 배열이 리턴된다. ex> array = [4, 5] 
            // let stateId  = state.map(a => a.id)

            // // 주문한 원소의 id                      ex>  [4, 5]
            // console.log('findId', findId)            

            // // state 모든 원소                       ex>  [0, 1, 4, 5]
            // console.log('stateId', stateId) 

            // // 주문한 id 를 제외한 나머지 원소의 id    ex>  [0, 1]         
            // let result = stateId.filter(a => !findId.includes(a));  // result 에 담긴 id 값의 제품만 배열 재구성 
            // console.log('result', result);

            // state = state.map( a => a.id == result.find(a) )

            
            // copy.map( a => result.includes(a))
            // state = state.map(a => a.id == result.includes(a.id) )

            
            // console.log('result', result)
            // console.log('state[0]', state[0])
            // console.log('state', state)
            state.splice(0) ;       
        }
    }
})
export let { allOrder, initCart,addCount, addItem, clear, dCount, deleteitem, setCheck } = cart.actions
export default cart;