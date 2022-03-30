import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from '@material-ui/core';
import React from 'react';
import styled from "styled-components";
import {FormikHelpers, useFormik} from "formik";
import {useSelector} from "react-redux";
import {useSeaAction, useSeaDispatch} from "../../App/store";
import {Navigate} from "react-router-dom";
import {asyncAuthActions, authSelectors} from "./authIndex";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
const SeaLogin = () => {
    const isLoggedInSea = useSelector(authSelectors.selectIsLoginIn)
    const dispatch = useSeaDispatch()
    const {seaLoginTC} = useSeaAction(asyncAuthActions)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {email: 'Invalid email'}
            }
            if (!values.password) {
                return {password: 'Invalid password'}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(seaLoginTC(values))
            if (seaLoginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        }
    })

    if (isLoggedInSea) {
        return <Navigate to={'/'}/>
    }

    return (
        <Grid container justify='center' style={{height: '90vh'}}>
            <Grid item style={{margin: 'auto'}}>
                <LoginCase>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <p>To log in get registered
                                    <a href={"https://social-network.samuraijs.com/"}
                                       target={"_blank"} style={{color: 'hotpink'}}> here
                                    </a>
                                </p>
                                <p>or use common test account credentials:</p>
                                <p>Email: free@samuraijs.com</p>
                                <p>Password: free</p>
                            </FormLabel>
                            <FormLabel>
                                <FormGroup>
                                    <TextField
                                        variant="filled"
                                        label='Email'
                                        margin='normal'
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                    <TextField
                                        type='password'
                                        variant="filled"
                                        label='Password'
                                        margin='normal'
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                    <FormControlLabel
                                        label='RememberMe'
                                        control={<Checkbox
                                            {...formik.getFieldProps('rememberMe')}
                                            checked={formik.values.rememberMe}
                                        />}
                                    />
                                    <Button type={'submit'} variant='contained'
                                            disabled={(formik.errors.email && formik.errors.password) === null}
                                            style={{
                                                height: '55px',
                                                backgroundColor: '#1F4B76',
                                                color: 'hotpink'
                                            }}>SeaLogin</Button>
                                </FormGroup>
                            </FormLabel>
                        </FormControl>
                    </form>
                </LoginCase>
            </Grid>
        </Grid>
    );
};

export default SeaLogin;

export const LoginCase = styled.div`
  padding: 10px;
  background-color: #8AA8D2;
  opacity: 0.95;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`