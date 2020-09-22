import axios from 'axios';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types'

// 로그인 유저 api
const loginUserAPI = (loginData) =>{ //postman에서 설정해 준 것과 비슷하게!
    console.log(loginData, "LoginData")
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }
    return axios.post("api/auth", loginData, config)

}
function* loginUser(action){ //알아보기 편하게 적기!
    try{
        const result = yield call(loginUserAPI, action.payload)
        console.log(result);
        yield put({
            type: LOGIN_SUCCESS,
            payload: result.data
        })
    }catch(e){
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}
function* watchLoginUser(){
    yield takeEvery(LOGIN_REQUEST, loginUser)
   //매번 로그인 요청이 들어오는지 보고 있어라(감시)
}


export default function* authSaga(){
    yield all([
        fork(watchLoginUser)
    ])
}




/*
세 개가 하나의 패턴이 되어 작동하게 됨!
-> 감시, 감시하게 되면 작동하게 되는 것! 

90% 리덕스 패턴 

*/