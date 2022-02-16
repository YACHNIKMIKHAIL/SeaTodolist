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

const SeaLogin = () => {
    return (
        <Grid container justify='center'>
            <Grid item xs={5}>
                <LoginCase>
                    <FormControl>
                        <FormLabel>
                            <FormGroup>
                                <TextField
                                    variant="filled"
                                    label='Email'
                                    margin='normal'
                                />
                                <TextField
                                    variant="filled"
                                    label='Password'
                                    margin='normal'
                                />
                                <FormControlLabel
                                    label='RememberMe'
                                    control={<Checkbox name={'RememberMe'}/>}
                                />
                                <Button type={'submit'} variant='contained'
                                        style={{
                                            height: '55px',
                                            backgroundColor: '#1F4B76',
                                            color: 'hotpink'
                                        }}>SeaLogin</Button>
                            </FormGroup>
                        </FormLabel>
                    </FormControl>
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
  flex-direction: column;
  justify-content: center;
`