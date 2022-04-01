import * as appSelectors from '../../App/AppSelectors'
import {slice} from './SeaAppReducer'

const appActions=slice.actions
export {
    appSelectors,
    appActions
}