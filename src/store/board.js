import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let board = createSlice({
    name: 'board',
    initialState: [],
    reducers: {
        initBoard(state, action) {
            return state = action.payload;
        },
        deleteArticle(state, action) {
            // console.log(action.payload)
            // action.payload  {id: 91}
            axios.post('https://www.springstar.shop/deletearticle', action.payload )
            .then((r) => {
                if(r.data.msg == 'delete'){
                    // console.log('삭제 되었습니다.')
                }
            }) 
            .catch((e)=>console.log(e))
            return state
        },
        updateArticle(state, action) {
            axios.post(`https://www.springstar.shop/update/${action.payload.id}`, action.payload)
            .then((r)=>{
                if(r.data.msg == 'updated') {
                    // alert('수정되었습니다.')
                }
            })
            .catch((e)=>console.log(e))
        },
    }    
})

export let { initBoard, deleteArticle, updateArticle } = board.actions
export default board;