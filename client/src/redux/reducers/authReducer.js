const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS } = require("../types")


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null, //인증 여부
    isLoading: false,
    user: "",
    userId:"",
    userName:"",
    userRole:"",
    errorMsg:"",
    sucessMsg:""

}
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state, //... -> 얕은 복사
        errorMsg: "",
        isLoading: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token); //백에서 가져온 걸 저장
      return {
        ...state, //리듀서를 작성할 때는 기존의 상태값을 복사해와야 함
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: "",
      }
    case LOGIN_FAILURE: //로그인 실패
      localStorage.setItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      }
    case CLEAR_ERROR_REQUEST: 
      return {
        ...state,
        errorMsg: null,
      }
    case CLEAR_ERROR_SUCCESS: 
      return {
        ...state,
        errorMsg: null,
      }
    default:
        return state;
  }
};

export default authReducer;

//store에 있는 initialState 이름과 똑같이 맞춰줘야 함
//store에서 빈 값이었던 것을 여기에서 정의해 줌 


/*

*리액트
기존 것, 새로운 것을 비교해서 새로 바뀐 것만을 그려주는 것
비교를 하기 위해서는 얕은 복사(...)가 필요함!


*프론트단 코드를 수정했는데 서버가 재실행되는 문제!
->package.json에서 


*/



