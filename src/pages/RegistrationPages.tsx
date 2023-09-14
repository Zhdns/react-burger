import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD, PROFILE, TOKEN, REFRESH_TOKEN, PASSWORD, ISLOGIN, USER} from "../utility/constants";
import { authorization, setUser, resetPasswordAction, setUserEmail, setUserName, registration } from "../services/isLogin";
import { AppDispatch } from "../index";

type RegistrationProps = {
    submit: () => void;
    setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    validName: boolean;
    errorName: string;
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    validEmail: boolean;
    errorEmail: string;
    emailRef: React.Ref<HTMLInputElement>;
    revealPass: "text" | "password"; 
    setPass: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: any; 
    pass: string;
    validPass: boolean;
    errorPass: string;
    showPass: () => void;
    isRegistrationValid: boolean;
    statusLogIn: () => void;
  };


function Registration(props: RegistrationProps)  {

    return (
        <div className="main">
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <form noValidate onSubmit={(e) => {
                    e.preventDefault();
                    props.submit();
                    }}>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={props.setName} //e => setName(e.target.value)
                value={props.name}
                name={'name'}
                error={props.validName} //!validName
                errorText={props.errorName} 
                size={'default'}
                extraClass="ml-1 mt-8"
                />
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
                icon={props.icon} //revealPass ? "HideIcon" : 'ShowIcon'
                value={props.pass}
                name={'pass'}
                error={props.validPass} //!validPass
                onIconClick={props.showPass}
                errorText={props.errorPass}
                size={'default'}
                extraClass="ml-1 mt-8 mb-8"
                />
                <div className="submitButton">
                    <Button htmlType="submit" type="primary" size="medium"  disabled={props.isRegistrationValid}>Зарегистрироваться</Button> 
                </div>
            </form>
            <div className="options">
                <p className="subForLink text text_type_main-small">Уже зарегистрированы?</p>
                <Link to='/login' className="link text text_type_main-small" onClick={props.statusLogIn}>Войти</Link>
            </div>
        </div>
    )
}


function RegistrationPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [revealPass, setRevealPass] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const emailRef = useRef<HTMLInputElement>(null)
    const [errorEmail, setErrorEmail] = useState('')
    const [name, setName] = useState('')
    const [validPass, setValidPass] = useState(true)
    const [validName, setValidName] = useState(true)
    const [errorPass, setErrorPass] = useState('')
    const [errorName, setErrorName] = useState('')
    const [isRegistrationValid, setIsRegistrationValid] = useState(false)
    const latinLetters =/^[A-Za-z0-9_.]+$/;
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const [isNewPassValid, setIsNewPassValid] = useState(true)
    


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

    useEffect(() => {
        
        if (password.length > 0) {
            if (!latinLetters.test(password)) {
                setValidPass(false);
                setErrorPass('Только латинские буквы и цифры');
            
            } else if (password.length < 6) {
                setValidPass(false);
                setErrorPass('Длинна пароля меньше 6 символов');
            } else {
                setValidPass(true);
                setErrorPass('');
            }
        } else {
            setValidPass(true);
            setErrorPass('');
        }
    }, [password]);


    useEffect(() => {
        if (name.length > 10) {
            setValidName(false)
            setErrorName('Длинна не больше 10 символов')
        }
        else {
            setValidName(true)
            setErrorName('')
        }
    })

    useEffect(() => {
        if (validEmail
            && validName 
            && password.length > 6 
            && latinLetters.test(password) 
            && name.length > 0 
            && email.length > 0) 
            {
            setIsRegistrationValid(true)
        }
        else {
            setIsRegistrationValid(false)
        }
    }, [password, name, email, validEmail, validName])

    useEffect(() => {
        if(password.length > 6 && latinLetters.test(password)) {
            setIsNewPassValid(true)
        } else {
            setIsNewPassValid(false)
        }
    })

    const changeStatus = (route: string) => {
        navigate(route);
    }

    const handleSubmit =  async () => {
        const bodyData = {
            "email": email.toLowerCase(), 
            "password": password, 
            "name": name,
        }
        
        try{
            await dispatch(registration(bodyData)).unwrap()
            navigate('/')
        } catch (error) {
            console.error("Error:", error)
        }        
    }

    return (
        <Registration
                setName={e => setName(e.target.value)}
                name={name}
                validName={!validName}
                errorName={errorName}
                setEmail={e => setEmail(e.target.value)}
                email={email}
                validEmail={validEmail ? false : true}
                errorEmail={errorEmail}
                emailRef={emailRef}
                revealPass={revealPass ? "text" : "password"}
                setPass={e => setPassword(e.target.value)}
                pass={password}
                icon={revealPass ? "HideIcon" : 'ShowIcon'}
                validPass={!validPass}
                showPass={showPass}
                errorPass={errorPass}
                isRegistrationValid={!isRegistrationValid}
                statusLogIn={() => changeStatus("/login")}
                submit={() => handleSubmit()}/>
    )
}

export default RegistrationPage