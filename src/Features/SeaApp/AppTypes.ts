export type SeaAppInitStateType = {
    seaStatus: seaStatusTypes
    seaError: string | null
    isInitialized: boolean
}
export type seaStatusTypes = 'idle' | 'loading' | 'succesed' | 'failed'