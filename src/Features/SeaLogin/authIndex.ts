import * as authSelectors from './AuthSelectors'
import {asyncActions, slice} from './SeaAuthReducer'
import SeaLogin from './SeaLogin'

const asyncAuthActions = {
    ...asyncActions,
    ...slice.actions
}

const seaAuthReducer = slice.reducer
export {
    authSelectors,
    SeaLogin,
    asyncAuthActions,
    seaAuthReducer
}