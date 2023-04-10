import MarginTop from "../component/MarginTop";

function NotFound() {
    return(
        <>
            <MarginTop />
            <h1 className="mt-5" style={{height: '700px'}}>페이지를 찾을 수 없습니다! (404)</h1>
        </>
        
    )
}

export default NotFound;