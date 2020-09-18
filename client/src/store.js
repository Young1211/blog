import {createStore, compose, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {createBrowserHistory} from "history"; //npm i history
import {routerMiddleware} from 'connected-react-router'


import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

//외부 
export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {}; //초기값은 빈값,아무것도 없음

const middlewares = [sagaMiddleware, routerMiddleware(history)]; //향후에 미들웨어를 추가하게 된다면 배열 안에 하나씩 추가 
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancer = 
    process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore( //store를 만들어주세요
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga); //saga 미들웨어를 작동해주세요


export default store;












/*

*
const middlewares = [sagaMiddleware, routerMiddleware(history)]; 
-향후에 리덕스 미들웨어를 추가하게 된다면 배열 안에 하나씩 추가 


*connected-react-router를 사용하지 않는다면 sagaMiddleware만 사용

*devtools
-개발자 도구
-배포 환경에서 redux_devtools가 보이게 되면 앱이 어떻게
작동하는지 다 드러내기 때문에 반드시 개발자 도구를
감추거나,삭제해야 한다!


*initialState
-웹의 모든 상태를 담고있는 초기값
-리액트에서 일반적인 상태관리는 
부모(최상위) -------> 자식(하위)로 상태값을 넘겨줌
부모의 상태값을 사용하고 싶다면 부모의 상태값을 받아옴
---> 대규모의 복잡한 웹을 만들게 된다면 값 확인이 힘들다!
-리덕스는 store 한곳에 모든 상태값을 저장하고 
필요할 때 꺼내쓰는 형태 -> 관리가 용이하다는 장점이 있다!

*sagas
-이러한 상태일 때 어떠한 함수들이 저장이 되는지 저장을 해줌
-saga와 reducer는 한 세트로 작동 
-상태에 따라서 함수를 구분함.정형화된 패턴



*/