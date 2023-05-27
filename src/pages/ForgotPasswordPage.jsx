import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD, PROFILE, TOKEN, REFRESH_TOKEN, PASSWORD, ISLOGIN, USER} from "../utils/constants";
import { request, LOGIN_URL, REFRESHTOKEN_URL, LOGOUT_URL, REGISTRATION_IRL } from "../utils/utils";
import { authorization, setUser, resetPasswordAction, setUserEmail, setUserName, logout, forgotPassword } from "../services/isLogin";
import { data } from "../utils/data";


function ForgotPassword(props) {


    return (
        <div className="main">
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <form noValidate onSubmit={(e) => {
                    e.preventDefault();
                    props.submit();
                    }}>
                <Input
                type={'email'}
                placeholder={'Email'}
                onChange={props.setEmail} //e => setEmail(e.target.value)
                value={props.email}
                name={'email'}
                error={props.validEmail} //validEmail ? false : true
                errorText={props.errorEmail}
                size={'default'}
                extraClass="ml-1 mt-8 mb-8"
                ref={props.emailRef}/>
                <div className="submitButton">
                    <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
                </div>
            </form>
            <div className="options">
                <p className="subForLink text text_type_main-small">Вспомнили пароль?</p>
                <Link to='/login' className="link text text_type_main-small" onClick={props.statusLogIn}>Войти</Link>
            </div>
        </div>
    )
    
}

function ForgotPasswordPage() {

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const emailRef = useRef(null);
    const [errorEmail, setErrorEmail] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        if (emailRef.current && emailRef.current.validity.valid) {
            setValidEmail(true);
            setErrorEmail('')
        } else {
            setValidEmail(false);
            setErrorEmail('Неверный формат электронной почты')
        }
    }, [email])

    const handleSubmit = async () => {
        const bodyData = { 
            email: email.toLowerCase(),
        }
        try {
            await dispatch(forgotPassword(bodyData)).unwrap()
            navigate('/password-reset/reset')
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <ForgotPassword 
        setEmail={e => setEmail(e.target.value)}
        email={email}
        validEmail={validEmail ? false : true}
        errorEmail={errorEmail}
        emailRef={emailRef}
        statusLogIn={() => navigate("/login")}
        submit={() => handleSubmit()}/>
    )
}

export default ForgotPasswordPage