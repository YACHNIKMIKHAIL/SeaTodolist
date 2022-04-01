import * as appSelectors from '../../App/AppSelectors'
import {asyncAppActions, slice} from './SeaApplicationReducer'

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...asyncAppActions
}
export {
    appSelectors,
    appReducer,
    appActions
}