import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './user'
import cart from './cart'
import coupon from './coupon'
import board from './board'

let stock = createSlice({       
    name: 'stock',
    initialState: [10, 11, 22]
})

export default configureStore({        //생성한 state 등록
  reducer: {
      user: user.reducer,
     stock: stock.reducer,
      cart: cart.reducer,
      coupon: coupon.reducer,
      board: board.reducer,
   }
}) 