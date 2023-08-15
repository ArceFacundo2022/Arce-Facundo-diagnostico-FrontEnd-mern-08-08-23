export const mainReducer = (state, action) => {
    switch (action.type) {
        case "[Reload]":
            return {...state, reload : !action.reload.reload}
        
        default:
            return state
    }
}