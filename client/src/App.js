import React from 'react';
import { Provider } from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import store, {history} from "./store";
import MyRouter from './routes/Router';

//부트스트랩(css 프레임워크) 사용
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

//화살표 함수로 바꾸기
const App = () => {
  return (
    <Provider store={store}> 
      <ConnectedRouter history={history}>
        <MyRouter/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;


//redux store와 router 결합시키기 
//최상위의 store를 달게 됨


/*

//*connected-react-router! connect가 아님!

*/
