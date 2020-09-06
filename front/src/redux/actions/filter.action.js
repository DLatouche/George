const { UPDATE_FILTER_ACTION } = require("../reducers/filter.reducer")

export const setFilterAction = (value) => ({
    type: UPDATE_FILTER_ACTION, payload: value
})