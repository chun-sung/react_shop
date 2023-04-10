import { useEffect, useState } from "react"
import MarginTop from "../component/MarginTop"

function Man() {
    let [fade, setFade] = useState('')

    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
        setFade('end')
        return () => setFade('')
    },[])

    return (<>
        <MarginTop />
        <div className={"start " +fade} style={{height:' 700px'}}>
            <h5 className="mt-5">남성 정장</h5>
            <img src="https://an2-img.amz.wtchn.net/image/v2/FTOeudrFRm09Lmbz9rbz1Q.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk56STVlREV3T0RCeE9EQWlYU3dpY0NJNklpOTJNaTl6ZEc5eVpTOXBiV0ZuWlM4eE5qTXhNREUwTURBeU1qUXpOelk0T1RZekluMC5OOHNUalpnc0w4Z2ZJYjBCaGhEOWRKTko5eUtLVnRkeDFQODNaem5UTHJR"
             style={{width: '350px'}}></img>
        </div>
    </>)
}

export default Man