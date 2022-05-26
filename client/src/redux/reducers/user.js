const initialState = {
    userData: { name: 'Фамилия И.О', login: 'root', role: 'ADMIN' },
    isAuth: true
};

export const ACTION_1 = 'ACTION_1'

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_1: {
            return {
                ...state,
                title: 'test123',
            };
        }

        default:
            return state;
    }
};

export const action1 = (data) => {
    return {
        type: ACTION_1,
        payload: data,
    };
};

export default userReducer
