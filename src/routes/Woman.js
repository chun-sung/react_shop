import { useEffect, useState } from "react"
import MarginTop from "../component/MarginTop"

function Woman() {
    let [fade, setFade] = useState('')

    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
        setFade('end')
        return () => setFade('')
    },[])

    return (<>
        <MarginTop />
        <div className={"start "+fade} style={{height:' 700px'}}>
            <h5 className="mt-5">여성 정장</h5>
            <img src="https://cdn.artsnculture.com/news/photo/202010/114_185_5927.png"
              style={{width: '350px'}}></img>
        </div>
    </>)
}

export default Woman;