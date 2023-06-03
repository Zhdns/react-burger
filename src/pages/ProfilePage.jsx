import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD, PROFILE, TOKEN, REFRESH_TOKEN, PASSWORD, ISLOGIN, USER} from "../utils/constants";
import { request, LOGIN_URL, REFRESHTOKEN_URL, LOGOUT_URL, REGISTRATION_IRL } from "../utils/utils";
import { updateToken, setUserEmail, setUserName, logout, editProfile } from "../services/isLogin";
import { data } from "../utils/data";
import { wsConnecting, wsDisconnected } from "../services/middlewareReducer";
import { checkAccess } from "../utils/utils";



function Profile(props) { 
    return (
    <div >
        <div className="main">
            <form noValidate className="formProfile">
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
                icon={props.iconName}
                onIconClick={props.onIconName}
                disabled={props.disabledName}
                />
                <Input
                type={'email'}
                placeholder={'Email'}
                onChange={props.setEmail} //e => setEmail(e.target.value)
                value={props.email}
                name={'email'}
                icon={props.iconEmail}
                onIconClick={props.onIconEmail}
                error={props.validEmail} //validEmail ? false : true
                errorText={props.errorEmail}
                size={'default'}
                extraClass="ml-1 mt-8"
                ref={props.emailRef}
                disabled={props.disabledEmail}
                />
                <Input
                type={props.revealPass} //revealPass ? "text" : "password"
                placeholder={'Пароль'}
                // onChange={props.setPass} //e => setPass(e.target.value)
                // icon={props.icon} //revealPass ? "HideIcon" : 'ShowIcon'
                value={props.pass}
                name={'pass'}
                // error={props.validPass} //!validPass
                // onIconClick={props.showPass}
                // errorText={props.errorPass}
                size={'default'}
                extraClass="ml-1 mt-8 mb-8"
                disabled
                />
                <div className="navProfile">
                <NavLink  to='/profile' end className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'} >
                <p className="text text_type_main-medium">Профиль</p>
                </NavLink>
                <NavLink to='/profile/orders ' className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'} onClick={props.userOrders}>
                <p className="text text_type_main-medium">История заказов</p>
                </NavLink>
                <NavLink  to='/login' onClick={props.logout} className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'}>
                <p className="text text_type_main-medium ">Выход</p>
                </NavLink>
                </div>
                <p className="subProfile text text_type_main-default ">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </form>
            
        </div>
    </div>)
    
}

function ProfilePage() { 
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const emailRef = useRef(null);
    const [errorEmail, setErrorEmail] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const userName = useSelector((state) => state.isLogin.user.name)
    const userEmail = useSelector((state) => state.isLogin.user.email)
    const [newName, setNewName] = useState(false)
    const [newEmail, setNewEmail] = useState(false) 
    const user = useSelector((state) => state.isLogin.user)
    const serverError = useSelector((state) => state.isLogin.error)
    

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
            token: localStorage.getItem(REFRESH_TOKEN)
        }
        try {
            await dispatch(logout(bodyData)).unwrap()
            navigate('/login')
        } catch (error) {
            console.error("Error:", error)
        } 
    }


    const editName = () => {
        setNewName(true)
    }

    const editEmail = () => {
        setNewEmail(true)
    }

    const save = async (email, name) => {
        const bodyData = {
            email: email.toLowerCase(),
            name: name,
        }

        try {
            await dispatch(editProfile(bodyData))
            checkAccess(serverError, async() => {
                const token = {
                    token: localStorage.getItem(REFRESH_TOKEN)
                }
                await dispatch(updateToken(token)).unwrap()
                dispatch(editProfile(bodyData))
            })
            setNewName(false)
            setNewEmail(false)
            setName(user.name)
            setEmail(user.email)
        } catch (error) {
            console.error("Error:", error)
        }
    }
    const connectingToUserOrders = () => {
            dispatch(wsDisconnected())
            // dispatch(updateToken())
            let token = localStorage.getItem(TOKEN)
            token = token.replace('Bearer ', '')
            const url = `wss://norma.nomoreparties.space/orders?token=${token}`
            dispatch(wsConnecting(url))
            // checkAccess(serverError, async() => {
            //     const token = {
            //         token: localStorage.getItem(REFRESH_TOKEN)
            //     }
            //     await dispatch(updateToken(token)).unwrap()
            //     dispatch(wsDisconnected())
            //     dispatch(wsConnecting(url))
            // })
    }


    return (
        <Profile
        name={userName}
        setName={e => dispatch(setUserName(e.target.value))}
        setEmail={e => dispatch(setUserEmail(e.target.value))}
        email={userEmail}
        pass={localStorage.getItem(PASSWORD)}
        revealPass={'password'}
        logout={() => handleSubmit()}
        onIconName={newName ? () => save(userEmail, userName) :  () => editName()}
        onIconEmail={newEmail ? () => save(userEmail, userName) :  () => editEmail()}
        disabledName={!newName}
        disabledEmail={!newEmail}
        iconName={!newName ? 'EditIcon' : "CheckMarkIcon"}
        iconEmail={!newEmail ? 'EditIcon' : "CheckMarkIcon"}
        validEmail={validEmail ? false : true}
        errorEmail={errorEmail}
        emailRef={emailRef}
        userOrders={() => connectingToUserOrders()}
        />
    )
}

export default ProfilePage