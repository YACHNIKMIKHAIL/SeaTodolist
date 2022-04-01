import * as appSelectors from './AppSelectors'
import {slice} from './SeaAppReducer'

const appActions=slice.actions
export {
    appSelectors,
    appActions
}