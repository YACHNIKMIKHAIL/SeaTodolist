import {seaReducerType} from "./AppTypes";

export const selectSeaStatus=(state:seaReducerType) => state.app.seaStatus
export const selectIsInitializedApp=(state:seaReducerType) => state.app.isInitialized