import api from './api';
const actions = {
    HOME_DATA: 'HOME_DATA',
}

const actionCreators = {
    getSpaceXData: (data) => {
        debugger;
        return {
            type: 'HOME_DATA',
            payload: api.getSpaceXData(data),
        }
    }
}

export { actions, actionCreators };