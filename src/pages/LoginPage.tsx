import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import {REFRESH_TOKEN} from "../utility/constants";
import {  login} from "../services/isLogin";
import { AppDispatch } from "../index";
import { IsLogin } from "../utility/types";



type Login = {
    submit: () => void;
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    validEmail: boolean;
    errorEmail: string;
    emailRef: React.Ref<HTMLInputElement>;
    revealPass: any;
    setPass: (e: React.ChangeEvent<HTMLInputElement>) => void;
    revealIcon: any;
    pass: string;
    showPass: () => void;
    statusRegistration: () => void;
    statusForgotPassword: () => void;
}

function Login(props: Login) {
    return (
        <div className="main">
            <h1 className="text text_type_main-medium">Войти</h1>
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
                extraClass="ml-1 mt-8"
                ref={props.emailRef}/>
                <Input
                type={props.revealPass} //revealPass ? "text" : "password"
                placeholder={'Пароль'}
                onChange={props.setPass} //e => setPass(e.target.value)
                icon={props.revealIcon } //revealPass ? "HideIcon" : 'ShowIcon'
                value={props.pass}
                name={'pass'}
                error={false}
                onIconClick={props.showPass}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-8 mb-8"/>
                <div className="submitButton">
                    <Button htmlType="submit" type="primary" size="medium">Войти</Button>
                </div>     
            </form>
            <div className="options">
                <p className="subForLink text text_type_main-small">Вы — новый пользователь?</p>
                <Link to='/register' className="link text text_type_main-small" onClick={props.statusRegistration}>Зарегистрироваться</Link>
            </div>
            <div className="options">
                <p className="subForLink text text_type_main-small">Забыли пароль?</p>
                <Link to='/password-reset' className="link text text_type_main-small" onClick={props.statusForgotPassword}>Восстановить пароль</Link>
            </div>
        </div>
        
    )
}

function LoginPage() { 

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [revealPass, setRevealPass] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const emailRef = useRef<HTMLInputElement>(null);
    const [errorEmail, setErrorEmail] = useState('')
    const serverError = useSelector((state: IsLogin) => state.isLogin.error)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate(); 



    const showPass = () => {
        setRevealPass(!revealPass)
    }

    useEffect(() => {
        if (emailRef.current && emailRef.current.validity.valid) {
            setValidEmail(true);
            setErrorEmail('')
        } else {
            setValidEmail(false);
            setErrorEmail('Неверный формат электронной почты')
        }
    }, [email])


    const handleSubmit = async(email: string, password: string) => {
        const bodyData = {
            'email' : email.toLowerCase(),
            'password': password,
        };
        try {
            await dispatch(login(bodyData))
        } catch (error) {
            console.error("Error:", error)
        }
    }


    return (
        <Login 
        setEmail={e => setEmail(e.target.value)}
        email={email}
        validEmail={validEmail ? false : true}
        errorEmail={errorEmail}
        emailRef={emailRef}
        revealPass={revealPass ? "text" : "password"}
        setPass={e => setPassword(e.target.value)}
        revealIcon={revealPass ? "HideIcon" : 'ShowIcon'}
        pass={password}
        showPass={showPass}
        statusRegistration={() => navigate('/register')}
        statusForgotPassword={() => navigate("/forgot-password")}
        submit={() => handleSubmit(email, password)}/>)
}

export default LoginPage