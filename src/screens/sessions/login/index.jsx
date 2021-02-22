import React, { useState, useEffect, useRef } from 'react'
import './login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MessageIcon from '@material-ui/icons/Message';
import { connect } from 'react-redux';
import { logged_User_Action } from '../../../Redux/actions/loggedUserAction';
import { UserLogin } from '../../../apis/loginApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import database from '../../../config/firebase';
import { useHistory } from 'react-router-dom';

const Login_Component = (props) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [verificationMessageTimeOut, setVerificationMessageTimeOut] = useState(false);
    const [errorStateOfPassword, setErrorStateOfPassword] = useState(false);
    const [errorMessageOfPassword, setErrorMessageOfPassword] = useState('')
    const history = useHistory();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const loginBtnRef = useRef(null);


    useEffect(() => {
        console.log('verificationMessageTimeOut', verificationMessageTimeOut);
        if (verificationMessageTimeOut === true) {
            setInterval(() => {
                setVerificationMessageTimeOut(false);
            }, 3000);

        }
        console.log('useEffect');
        emailRef.current.focus();
    }, [verificationMessageTimeOut])

    const handleEmail = (ev) => {
        setUserEmail(ev.target.value);
        let email_isValid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim).test(ev.target.value);
        if (ev.target.value !== '') {
            if (email_isValid) {
                setErrorMessage('');
                setErrorState(false);
            }
            else {
                setErrorMessage('Please provide valid email');
                setErrorState(true);
            }
        }
        else {
            setErrorState(true);
            setErrorMessage('Email is required')
        }
    }

    const handlePassword = (ev) => {
        setUserPassword(ev.target.value);
        if (ev.target.value === '') {
            setErrorStateOfPassword(true);
            setErrorMessageOfPassword('Password is required');
        }
        else {
            setErrorStateOfPassword(false);
            setErrorMessageOfPassword('');
        }
    }
    const emailKeyDown = (event) => {
        console.log('event ', event);
        if (event.key === "Enter") {
            passwordRef.current.focus();
        }
    }
    const passwordKeyDown = (event) => {
        console.log('event ', event);
        if (event.key === "Enter") {
            loginBtnRef.current.focus();
        }
    }
    const loginBtnKeyDown = (event) => {
        if (event.key === "Enter") {
            submitUserLoggedIn(userEmail, userPassword);
        }
    }

    const submitUserLoggedIn = (email, password) => {
        setLoading(true);
        console.log(email);
        console.log(password);
        UserLogin(email, password)
            .then((user) => {
                // if (user.user.emailVerified === true) {
                database.database().ref(`users/${user.user.uid}`).update({
                    online: true
                }).then(() => {
                    database.database().ref(`users/${user.user.uid}`).on('value', (snapShot) => {
                        let value = snapShot.val();
                        console.log('data', value);
                        setUserEmail('');
                        setUserPassword('');
                        setLoading(false);
                        props.setLoggedInUserDetail(value);
                        history.push(`/chatarea`);
                    })
                })
                // }
                // else {

                // setUserEmail('');
                // setUserPassword('');
                // setLoading(false);
                // setVerificationMessageTimeOut(true);
                // setVerificationMessage('Please verify your email address ');

                // }
            })
            .catch((error) => {
                console.log('error', error.message);
                setUserEmail('');
                setUserPassword('');
                setLoading(false);
                alert(`${error.message}`);
            })
    }

    const loginForm = () => {
        return <div className="login-form">
            <h2>Start Chat <MessageIcon className="chat-icon" /></h2>
            <div className="login-fields">
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={userEmail}
                    inputRef={emailRef}
                    onKeyDown={emailKeyDown}
                    onChange={handleEmail}
                    error={errorState ? true : false}
                    helperText={errorState ? <span>{errorMessage}</span> : ''}
                    fullWidth
                />
            </div>
            <div className="login-fields">
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={userPassword}
                    onChange={handlePassword}
                    inputRef={passwordRef}
                    onKeyDown={passwordKeyDown}
                    error={errorStateOfPassword ? true : false}
                    helperText={errorStateOfPassword ? <span>{errorMessageOfPassword}</span> : ''}
                    fullWidth
                />
            </div>
            <div>
                <Button variant="contained"
                    className="login-btn"
                    color="primary"
                    size="large"
                    ref={loginBtnRef}
                    onKeyDown={loginBtnKeyDown}
                    onClick={() => submitUserLoggedIn(userEmail, userPassword)}
                    disabled={userEmail.length === 0 ||
                        userPassword.length === 0
                        || loading === true ||
                        errorState === true ||
                        errorStateOfPassword === true ? true : false}
                    fullWidth>
                    Login
                    <CircularProgress
                        size={20}
                        style={{ display: loading ? 'block' : 'none' }}
                    />
                </Button>
            </div>
            <div className="advice-container">
                <p>If your not registered !</p>
                <div>
                    <Button variant="contained"
                        className="login-btn"
                        color="primary"
                        size="large"
                        onClick={props.onState}
                        fullWidth>
                        signup
                </Button>
                </div>
                <p style={{ color: '#dc3545', fontSize: '16px' }}>
                    {verificationMessageTimeOut ? `${verificationMessage}` : ''}
                </p>
            </div>
        </div>
    }
    return (
        <div className="login-main-container">
            {loginForm()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        setLoggedInUserDetail: (data) => { dispatch(logged_User_Action(data)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login_Component);