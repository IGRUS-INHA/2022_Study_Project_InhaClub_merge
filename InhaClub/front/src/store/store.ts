import { configureStore, createSlice } from "@reduxjs/toolkit";
import { convertCompilerOptionsFromJson } from "typescript";


let keyword : any = createSlice({
  name: "keyword",
  initialState : ['인하대'],
  reducers: {
    addKeyword(state,actions){
      state.push(actions.payload);
    },
    subKeyword(state,actions){
      return state.filter(x=>x !== actions.payload)
    },
  }
});

let isSearch : any = createSlice({
  name: "isSearch",
  initialState: false,
  reducers: {
    setIsSearch(state, actions){
      return actions.payload
    }
  }
})
let isLogin : any = createSlice({
  name: "isLogin",
  initialState:
  {
    login:false
  },
  reducers : {
    setIsLogin(state, actions)
    {
      state.login=true;
    }
  }
})
let token : any = createSlice({
  name: "token",
  initialState: {
    accessToken: "",
    refreshToken: ""
  },
  reducers: {
    setToken(state, actions)
    {
      state.accessToken=actions.payload.accessToken;
      state.refreshToken=actions.payload.refreshToken;
    }
  }
})
export let {addKeyword, subKeyword} = keyword.actions;
export let {setIsSearch} = isSearch.actions;
export let {setIsLogin}  = isLogin.actions;
export let {setToken} = token.actions;

export default configureStore({
  reducer: {
    keyword: keyword.reducer,
    isSearch: isSearch.reducer,
    isLogin: isLogin.reducer,
    token: token.reducer
  },
});