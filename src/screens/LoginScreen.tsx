import * as React from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import { Button, Form, Container } from 'react-bootstrap';
import * as _ from 'lodash'
import config from '../constants/config';
import { connect, useSelector, useDispatch } from "react-redux";

import ButtonLoading from '../components/ButtonLoading';
import { InstanceAxios } from '../utils/RequestMethods';
import { loginSuccess, updateUserData } from '../redux/actions/authActions';
import { IAppState } from '../redux/reducers';

interface Props {

}

const LoginScreen: React.FunctionComponent<Props> = (): JSX.Element => {
    const auth = useSelector((state:IAppState) => state.auth)

    const dispatch = useDispatch()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showLoginErrorMessage, setShowLoginErrorMessage] = React.useState(false)
    let btnLogin = React.useRef(null)

    const login = async (event): Promise<string> => {
        event.preventDefault();

        let params = {
            email: email,
            password: password,
        };
        try {

            let res = await InstanceAxios.post(`${config.url.wpJson}/wp/v2/token`, params)
            if (res && res.data) {
                let msg = res.data.message ? res.data.message : "";
                dispatch(loginSuccess(res.data)).then(() => {
                    updateUserData()
                })

                return "Success Login"
            }

            throw new Error("Unknown error")

        } catch (error) {
            throw error
        }


    };

    const removeErrorStyling = () => {
        setShowLoginErrorMessage(false)
    }


    if (auth.token) {
        return <Redirect to='/' />
    }
    return (
        <Container className="App mb-5">
            <h1>Login</h1>
            <Form onSubmit={login}>
                <Form.Group controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className='input-material'
                        value={`${email}`}
                        type="email" required placeholder="Enter email"
                        onChange={(event: any) => {
                            setEmail(event.target.value)
                        }}
                        onClick={removeErrorStyling} />
                </Form.Group>
                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='input-material' type="password"
                        value={`${password}`}
                        required
                        placeholder="Password"
                        onChange={(event: any) => {
                            setPassword(event.target.value)
                        }}
                        onClick={removeErrorStyling} />
                </Form.Group>
                {showLoginErrorMessage &&
                    <p className='red'>
                        <strong>
                            Invalid email and/or password.
                        </strong>
                    </p>
                }

                <ButtonLoading className="btn-primary btn-block" style={{ color: "#fff" }} type="submit"
                    onClickFetching={login}
                >
                    Login
                </ButtonLoading>

            </Form>

            {/* <a href="/forgot-password">Forgot password?</a> */}
        </Container>
    );

}


export default LoginScreen;
//export { LoginScreen };