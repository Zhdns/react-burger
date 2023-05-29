import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD, PROFILE, TOKEN, REFRESH_TOKEN, PASSWORD, ISLOGIN, USER} from "../utils/constants";
import { request, LOGIN_URL, REFRESHTOKEN_URL, LOGOUT_URL, REGISTRATION_IRL } from "../utils/utils";
import { authorization, setUser, resetPasswordAction, setUserEmail, setUserName, logout, resetPassword} from "../services/isLogin";
import { data } from "../utils/data";

function ResetPassword(props) {
    return (
        <div className="main">
            <form noValidate onSubmit={(e) => {
                    e.preventDefault();
                    props.submit();
                    }}>
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
                extraClass="ml-1 mt-8 "
                />
                <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={props.setResetPass} //e => setResetPass(e.target.value)
                value={props.resetPass}
                name={'emailCode'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1 mt-8 mb-8"
                />
                <div className="submitButton">
                    <Button htmlType="submit" type="primary" size="medium" disabled={props.isNewPassValid}>Сохранить</Button>
                </div>
            </form>
            <div className="options">
                <p className="subForLink text text_type_main-small">Вспомнили пароль?</p>
                <Link to='/login' className="link text text_type_main-small">Войти</Link>
            </div>
        </div>
    )
}

function ResetPasswordPage() { 
    const [password, setPassword] = useState('')
    const [revealPass, setRevealPass] = useState(false)
    const [validPass, setValidPass] = useState(true)
    const [errorPass, setErrorPass] = useState('')
    const latinLetters =/^[A-Za-z0-9_.]+$/;
    const [resetPass, setResetPass] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const showPass = () => {
        setRevealPass(!revealPass)
    }

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

    const handleSubmit = async (email, resetPass) => {
        const bodyData = {
            password: password,
            token: resetPass,
        }
        try {
            await dispatch(resetPassword(bodyData)).unwrap()
            navigate('/login')
        } catch (error) {
            console.error("Error:", error)
        }
    }


    return ( 
        <ResetPassword 
        revealPass={revealPass ? "text" : "password"}
        setPass={e => setPassword(e.target.value)}
        pass={password}
        icon={revealPass ? "HideIcon" : 'ShowIcon'}
        validPass={!validPass}
        showPass={showPass}
        errorPass={errorPass}
        setResetPass={e => setResetPass(e.target.value)}
        resetPass={resetPass}
        isNewPassValid={!validPass}
        statusLogIn={() => navigate("/login")}
        submit={() => handleSubmit(password, resetPass)}/>
    )
}

export default ResetPasswordPage