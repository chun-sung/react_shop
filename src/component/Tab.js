import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function Tab({tab, setTab}) {
  
  // Tab클릭에 따라 state값 변경 
  let [fade, setFade] = useState('');

   // UI애니메이션(타이머 설정 해야 동작)
  useEffect(() => {   
    setTimeout(() => { setFade('end') }, 100)    
    return () => {    
      setFade('')
    }
  },[tab])

  return (
    //Bootstrap Tap UI 및 아래쪽 tab state변경에 따른 UI 보여주기 3항 연산자
    <>
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>setTab(0)}>제품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>setTab(1)}>구매후기</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=> setTab(2)}>배송정보</Nav.Link>
        </Nav.Item>
      </Nav>
    
      { tab == 0 ? <div className={'start ' + fade}>제품설명</div> : null }
      { tab == 1 ? <div className={'start ' + fade}>구매후기</div> : null }
      { tab == 2 ? <div className={'start ' + fade}>배송정보</div> : null }     
    </>
  );
}

export default Tab;