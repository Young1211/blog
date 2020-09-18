import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),  //connectRouter를 router라고 명명함 
   })

export default createRootReducer;


//combineReducers로 reducer를 하나로 모아줌


/*

*향수 router를 불러오게 된다면 history를 사용한 connectRouter
를 사용할 수 있게 됨




*/
