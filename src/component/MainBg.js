import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainBg({shoes}) {
   
    let [rItem, setRItem] = useState(false)
    
    let numData = localStorage.getItem('watChed')
    numData = JSON.parse(numData)     
    
    let navigate = useNavigate()

    useEffect(()=> { 
        window.scrollTo(0,0)  // 최상단 이동        
    },[])  

    // 최근 조회한 상품 확인
    useEffect(()=> { 
        let numData = localStorage.getItem('watChed');
        numData = JSON.parse(numData)
        numData.length > 1 ? setRItem(true) : setRItem(false)
    })  
   
    // pwa 설치 코드 (클릭시 installApp함수 호출후 설치 화면 팝업 됨)
    let deferredPrompt
    
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault()
        deferredPrompt = event
    })

    function installApp(){
        if(!deferredPrompt) {
            // alert(`이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다.`)
            alert(`웹브라우저 새로고침후 로딩이 완료된 후 클릭해 보세요.`)
            return
        }

        deferredPrompt.prompt()
        // BeforeInstallPromptEvent.prompt()        
    }

    return (
        <div className='main-bg'>        
            {/* 메인 캐러셀 이미지 / 최근 확인한 상품 / Event 버튼  */}
            {
                rItem === true ?
                <div className='Rview'> 
                    <p className='Rview_title' style={{fontSize: '14px', color:' white'}}>최근 확인한 상품</p>
                    <ul style={{fontSize: '12px'}}>
                        {         
                            numData.map((a, i)=>{
                                return (
                                    <li key={i}><a className='rview_item' onClick={()=> {navigate('/detail/'+shoes[a]?.id)}}>{shoes[a]?.title}</a></li>            
                                )
                            })
                        }
                    </ul>
                </div> : null
            }            
            <div className='installPwa' onClick={installApp}></div>
            <div className='pwa'><b>앱</b>(<span style={{color: 'red'}}>PWA</span>)설치</div>
            <div className='btns'>                
                <div className='mt-3 ms-2 eventItem1' onClick={(e)=>{ e.stopPropagation();navigate('/event/one')}}></div>
                <div className='mt-3 ms-2 eventItem2' onClick={(e)=>{ e.stopPropagation();navigate('/event/two')}}></div>
             </div>
        </div>  
    )
}

export default MainBg;