import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({shoes, i}) {

    let [fade, setFade] = useState('');

    let navigate = useNavigate();
    
    useEffect(()=> {
        setFade('end')
        return () => setFade('')
    },[])
        
  return (
        <div className={'col-md-4 mt-4 Card start '+fade}>
            <img onClick={()=> navigate(`/detail/${shoes[i].id}`)}
             src={"https://www.springstar.shop/img/shoes/shoes"+(i+1)+".jpg"} width="80%" alt="shoes"/>
            <h4>{shoes[i].title}</h4>
            <p>{shoes[i].content}</p>
        </div>
  )
}

export default Card;