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
      console.log(1)
      return actions.payload
    }
  }
})

export let {addKeyword, subKeyword} = keyword.actions;
export let {setIsSearch} = isSearch.actions;

export default configureStore({
  reducer: {
    keyword: keyword.reducer,
    isSearch: isSearch.reducer,
  },
});