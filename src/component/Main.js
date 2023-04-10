import  Spinner  from './Spinner';
import YelloBtn from './YelloBtn';
import axios from 'axios';
import { useQuery } from 'react-query'
import Card from './Card'

function Main({shoes, setShoes}) {
    
    // let [more , setMore] = useState(0)        // 상품 더보기 버튼 초기 값
    
    //ajax 를 이용해서 신발상품 데이터를 받아온다. (비동기)
    let result = useQuery('작명', async() => {
        return await axios.get('https://www.springstar.shop/shoes/items')
            .then((r) =>{
                let copy = [...r.data];
                setShoes(copy);
            })
            .catch((e) => console.log(e))
    }, { retry: false }) // 통신 실패시 재시도 비활성화

    return ( 
        <>
            {/* 신발 상품 표시 */}
            <div className='container'>
                <div className='row'>
                    {
                        result.isLoading === true ? <div className='mt-3'><Spinner animation="border" variant="secondary"/></div> :
                        shoes.map((a, i) => {
                            return <Card shoes={shoes} i={i} key={i} />
                        }) 
                    }
                </div>
            </div>
            <YelloBtn className='mb-5 mt-3 YelloBtn'  onClick={()=>{
                // ★ 리덕스 Toolkit 사용하지 않은 상태에서의 state 의 배열 데이터 값 변경
                // if(more == 0){
                    axios.get('https://www.springstar.shop/shoes/items2')
                    .then((r)=> {
                        if(shoes.length !== 9 ){
                            let copy = [...shoes, ...r.data];
                            setShoes(copy);
                        } else {
                            alert('가져올 상품이 없습니다.')
                        }                        
                    })
                // } 
            }}><b>상품더보기</b><p className='st'>(styled-component)</p></YelloBtn>                                 
        </>
    )
}

export default Main;