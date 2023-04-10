import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MarginTop from './MarginTop';

function Event() {

    let [fade, setFade] = useState('');    
    let navigate = useNavigate();
    
    useEffect(()=> {
        window.scrollTo(0,0)  // 최상단 이동
        setFade('end')
        return () => setFade('')
    },[])

    return (<>
        <MarginTop />
        <div style={{height: '700px'}}>
            <div className={'box start ' + fade }>
                <h3 className='mt-5'>오늘의 이벤트</h3>
                <Outlet></Outlet>
            </div>
            <button className='btn btn-primary mt-5' onClick={()=> navigate('/')}>Home</button>
        </div>
    </>)
}
export default Event;