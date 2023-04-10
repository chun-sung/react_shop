import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({       // useState() 역할 임 (state 하나를 slice라고 부름)
    name: 'user',
    initialState: {},
    reducers: {
        login(state, action){
          return  state = action.payload 
        },
        logout(state){            
           return state = {};
        },
        reset(state) {
            return state = state
        }
    }
})

export let { login, logout, reset } = user.actions;
export default user;