// 实现简易的redux

// actionType.js
const actionType = {
    INSREMENT: 'INSREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
  }
  export default actionType
  
  // actions.js
  import actionType from './actionType'
  const add = (num) => ({
      type: actionType.INSREMENT,
      payload: num
  })
  
  const dec = (num) => ({
      type: actionType.DECREMENT,
      payload: num
  })
  
  const getList = (data) => ({
      type: actionType.GETLIST,
      payload: data
  })
  export {
      add,
      dec,
      getList
  }
  
  // reducer.js
  function init(initialCount) {
    return {
      count: initialCount,
      total: 10,
      user: {},
      article: []
    }
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case actionType.INSREMENT:
        return {count: state.count + action.payload};
      case actionType.DECREMENT:
        return {count: state.count - action.payload};
      case actionType.RESET:
        return init(action.payload);
      default:
        throw new Error();
    }
  }
  
  export { init, reducer }
  
  // redux.js
  import React, { useReducer, useContext, createContext } from 'react'
  import { init, reducer } from './reducer'
  
  const Context = createContext()
  const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, props.initialState || 0, init);
      return (
        <Context.Provider value={{state, dispatch}}>
          { props.children }
        </Context.Provider>
      )
  }
  
  export { Context, Provider }
  
// 参考链接：https://juejin.cn/post/6844904074433789959#heading-4