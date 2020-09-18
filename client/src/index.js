import React from 'react'; //view를 만들기 위한 라이브러리
import ReactDOM from 'react-dom'; // ui를 브라우저에서 실제로 렌더링할 때 사용하는 라이브러리
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



/*렌더링 -> 그려준다!

렌더링하는 도구(ReactDOM)에서 렌더를 가지고 와서 
리액트라는 규격에 맞춰서 앱(app)을 그려줌 

*/