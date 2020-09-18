import {all} from "redux-saga/effects";


export default function* rootSaga(){ //제너레이터 함수
    yield all([]); //[] 안에 여러가지 값을 불러옴
}



/*

*제너레이터 함수
-일반 함수는 값을 하나만 반환할 수 있지만,
 제너레이터는 여러 값을 반환 가능함!(최신 문법 함수)



*/