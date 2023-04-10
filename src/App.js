import React, { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Member from './routes/Member'
import Login from './routes/Login'
// import Cart from './routes/Cart'
// import Board from './routes/Board'
// import Man from './routes/Man'
// import Woman from './routes/Woman'
// import Living from './routes/Living'
// import Detail from './routes/Detail'
import Create from './routes/Create';
import Mypage from './routes/Mypage'
import NotFound from './routes/NotFound'
import NotAccess from './routes/NotAccess';
import Footer from './component/Footer'
import Menubar from './component/Menubar';
import Event from './component/Event';
import MainBg from './component/MainBg';
import Main from './component/Main';
import MobileBottomMenu from './component/MobileBottomMenu';
import MarginBottom from './component/MarginBottom';
import Coupon from './routes/Coupon';
import Event1 from './component/event/Event1';
import Event2 from './component/event/Event2';
import MobileTopMenu from './component/MobileTopMenu';
import SuccessLogin from './function/SuccessLogin'
import Article from './routes/Article';
import Modify from './routes/Modify';
// import Test from './component/Test';
// import Test2 from './component/Test2';
import { Spinner } from 'react-bootstrap';

// 레이지로드 컴포넌트
// const Man  = lazy(()=> import('./routes/Man'));
// const Woman  = lazy(()=> import('./routes/Woman'));
const Test = lazy(()=> import('./component/Test'));
const Test2 = lazy(()=> import('./component/Test2'));
const Living = lazy(()=> import('./routes/Living'));
const Detail = lazy(()=> import('./routes/Detail'));
const Cart = lazy(()=> import('./routes/Cart'));
const Board = lazy(()=> import('./routes/Board'));

function App() {

    // 변경사항이 저장되지 않을 수 있습니다. (새로 고침시 메시지 팝업 뜸)
    const preventClose = (e) => {
        e.preventDefault();
        e.returnValue = "";             //Chrome에서 동작하도록; deprecated
      };
       
    useEffect(() => {
      (() => {
        window.addEventListener("beforeunload", preventClose);
      })();
      
      return () => {
        window.removeEventListener("beforeunload", preventClose);
      };
    },[]);      

    let [shoes, setShoes] = useState([]);     
    let [eCart, setEcart] = useState(false);       
    let [eCoupon, setEcoupon] = useState(false);       
   
    // 최근 조회 상품 정보 초기화 
    useEffect(()=> {                
        localStorage.setItem('watChed', JSON.stringify([]))  
    },[])       

  return (

    // 기능 컴포넌트 SuccessLogin / 토큰의 상태를 확인하고 유효하면 사용자의 정보를 설정한다.
    <div className="App nexon">  
      <SuccessLogin />
      <MobileTopMenu />
      <Menubar eCart={eCart} setEcart={setEcart} eCoupon={eCoupon} setEcoupon={setEcoupon} />

    {/* 라우터 Spinner 처리 */}    
    <Suspense fallback={<div className='mt-3'><Spinner animation="border" variant="secondary" /></div>}>
      <Routes>
          <Route path='/' element={ <>
              <MainBg shoes={shoes} />
              <Main shoes={shoes} setShoes={setShoes}/>
              <div className='main-bg small' />      
              <Footer />
          </> }/>        
          <Route path='/detail/:id'  element={ <Detail className='' shoes={shoes} setShoes={setShoes} eCart={eCart} setEcart={setEcart}/>}/>
          <Route path='/listOne/:id'  element={ <Article className='' />                                   }/>
          <Route path='/man'         element={ <Test />                                                    }/>
          <Route path='/woman'       element={ <Test2 />                                                   }/>
          <Route path='/living'      element={ <Living />                                                  }/>
          <Route path='/cart'        element={ <Cart eCart={eCart} setEcart={setEcart}/>                   }/>
          <Route path='/member'      element={ <Member />                                                  }/>
          <Route path='/login'       element={ <Login />                                                   }/>
          <Route path='/board'       element={ <Board />                                                   }/>
          <Route path='/create'      element={ <Create />                                                  }/>
          <Route path='/modify/:id'  element={ <Modify />                                                  }/>
          <Route path='/mypage'      element={ <Mypage />                                                  }/>
          <Route path='/test'        element={ <Test />                                                    }/>
          <Route path='/test2'       element={ <Test2 />                                                   }/>
          <Route path='/cupon'       element={ <Coupon eCoupon={eCoupon} setEcoupon={setEcoupon}/>         }/>
          <Route path='/notaccess'   element={ <NotAccess />                                               }/>  

          {/* Nested Routes */}
          <Route path='/event'       element={ <Event />                                                   }>
              <Route path='one'      element={ <Event1 eCoupon={eCoupon} setEcoupon={setEcoupon}/>         }/>
              <Route path='two'      element={ <Event2 eCoupon={eCoupon} setEcoupon={setEcoupon}/>         }/>                
          </Route> 

          {/* 404Page */}
          <Route path='*'            element={ <NotFound />                                                }/>
      </Routes>
    </Suspense>
  
      <MarginBottom />
      <MobileBottomMenu />
    </div>

  );
}
export default App;