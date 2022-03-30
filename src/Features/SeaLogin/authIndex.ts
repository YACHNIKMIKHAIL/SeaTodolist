import * as authSelectors from './AuthSelectors'
import {asyncActions, slice} from './SeaAuthReducer'
import SeaLogin from './SeaLogin'

const asyncAuthActions = {
    ...asyncActions,
    ...slice.actions
}


export {
    authSelectors,
    SeaLogin,
    asyncAuthActions
}