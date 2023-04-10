import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"

// 무한 스크롤 설치
// npm install react-infinite-scroll-component

export default function () {

    const [dataSource, setDataSource] = useState(Array.from({length:5}));

    const [hasMore, setHasMore] = useState(true);
    const [fade, setFade] = useState('');

    useEffect(()=>{        
        setFade('end')
        return () => setFade('') 
    },[])
    
    const fetchMoreData = () => {
        if(dataSource.length < 50) {       // 데이터 50개로 정의/ 50개가 되면 fals가 되어 데이터를 가져 오지 않는다.
            setTimeout(() => {
                setDataSource(dataSource.concat(Array.from({length:5})))
            }, 100);
        }else {
            setHasMore(false);
        }
    }

    return <div  className={"mb-5 start " + fade}>
                <h5 className="man2">남성을 위한 모든 것</h5>
                <InfiniteScroll
                    dataLength={dataSource.length}                      // dataLength 초기값 프롭스 주입 (dataSource.length)
                    next={fetchMoreData}                                // 데이터를 가져올 때 호출할 ajax 함수
                    hasMore={hasMore}                                   // 가져올 데이터가 없을 때 false가 되고 API 호출 중지
                    loader={ <p>Loading...</p>}                          // 데이터가 로딩중일 때 표시할 메시지
                    endMessage={<p>모든 상품을 확인하셨어요!</p>}         // 데이터 마지막 출력 메시지
                    height={600}
                >
                    {dataSource.map((item, index) => {
                            return (<div>
                                <div key={index} id="manBoard">
                                    <p className="pt-5" key={index}>남성 정장 #{index + 1}</p> 
                                </div>
                           </div>)
                    })}
                </InfiniteScroll>
    
    </div>;    
};  