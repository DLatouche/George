export const UPDATE_FILTER_ACTION = "UPDATE_FILTER_ACTION"

export const filterReducer = (state = null, action) => {
    switch (action.type) {
        case UPDATE_FILTER_ACTION:
            return action.payload
        default:
            return state;
    }
}