import {useDispatch} from "react-redux";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import {SeaDispatchType} from "../App/AppTypes";

export const useSeaDispatch = () => useDispatch<SeaDispatchType>()

export function useSeaAction<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useSeaDispatch()

    const boundAction = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundAction
}