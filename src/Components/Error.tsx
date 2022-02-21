import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {reducerType} from "../App/store";
import {setSeaAppError} from "../App/SeaAppReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Error() {
    const errorMessage = useSelector<reducerType, string | null>(state => state.app.seaError)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSeaAppError(null))
    };

    return (
        <Snackbar open={errorMessage !== null} autoHideDuration={3000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}