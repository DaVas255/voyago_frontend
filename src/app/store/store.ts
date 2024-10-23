import { configureStore } from '@reduxjs/toolkit'

type State = {
  isAuth: boolean;
}

type Action = {
  type: 'changeAuthStatus';
}

const reducer = (state: State = { isAuth: false }, action: Action) => {
  switch (action.type) {
    case 'changeAuthStatus':
      return {
        ...state,
        isAuth: !state.isAuth
      }
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: reducer,
})

