//라우터 기본이 되는 파일


import React, { Fragment } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"


const MyRouter = ()=>( 
    <Fragment>
        <Header/>
        <h1>hello Body</h1>
        <Footer/>
    </Fragment>
) //{}이 아니라 ()! return이 생략된 형태

export default MyRouter;


/*

//그냥 일반적인 ()는 return이 있음(생략 가능함)
//일반적인 것과 생략된 것을 혼용하기도 함
*const MyRouter = ()=> {return()} <-생략
   ( 
    <Fragment>
     
    </Fragment>
  )

*switch
-주소가 바뀔 때마다 상태를 변화시킴




*/