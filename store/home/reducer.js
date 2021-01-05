import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
    data: {
      homePageData: [],
    },
}

const homeReducer = typeToReducer({
  [actions.HOME_DATA]: {
    PENDING: state => {
        return Object.assign({},state,{ ui: { loading: true }})
      },
      FULFILLED: (state,action) => {
        return {
          ...state,
          data: {
            ...state.data,
            homePageData: action.payload.data,
          }
        }
      },
      REJECTED: (state,action) => {
        return Object.assign({}, state, { error: 'Api Failure', ui: { loading: false } })
      },
  }
}, initialState);

export default homeReducer;
