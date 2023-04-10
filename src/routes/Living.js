import { useEffect, useState } from "react";
import MarginTop from "../component/MarginTop";

function Living() {

    const [fade, setFade] = useState('')

    useEffect(()=>{
        window.scrollTo(0,0)  // 최상단 이동
        setFade('end')
        return () => setFade('')
    },[])

    return (<>
        <MarginTop />
        <div className={"start " +fade} style={{height:' 700px'}}>
            <h5 className="mt-5">Star Living</h5>
            <img src="https://asf.scene7.com/is/image/ASF/8wk3-lrs-lp-hero-all_M?fmt=jpeg&lossy&qlt=73"
            style={{width: '350px'}}></img>
        </div>
    </>)
}

export default Living;