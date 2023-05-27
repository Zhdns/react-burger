import { EmailInput, Input, ShowIcon, HideIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import './LoginPage.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../../services/setLoginPageStatus";
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN, REGISTRATION, FORGOT_PASSWORD, RESET_PASSWORD, PROFILE, TOKEN, REFRESH_TOKEN, PASSWORD, ISLOGIN, USER} from "../../utils/constants";
import { request, LOGIN_URL, REFRESHTOKEN_URL, LOGOUT_URL, REGISTRATION_IRL } from "../../utils/utils";
import { authorization, setUser, resetPasswordAction, setUserEmail, setUserName } from "../../services/isLogin";
import { data } from "../../utils/data";



function Login(props) {
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
                icon={props.revealIcon} //revealPass ? "HideIcon" : 'ShowIcon'
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

function Registration(props)  {

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
                <NavLink  to='/profile' className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'}>
                    <p className="text text_type_main-medium">Профиль</p>
                </NavLink>
                <NavLink to='/profile/orders ' className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'}>
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


function LoginPage() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [revealPass, setRevealPass] = useState(false)
    const [validEmail, setValidEmail] = useState(true)
    const emailRef = useRef(null);
    const [errorEmail, setErrorEmail] = useState('')
    const [name, setName] = useState('')
    const [validPass, setValidPass] = useState(true)
    const [validName, setValidName] = useState(true)
    const [errorPass, setErrorPass] = useState('')
    const [errorName, setErrorName] = useState('')
    const [isRegistrationValid, setIsRegistrationValid] = useState(false)
    const latinLetters =/^[A-Za-z0-9_.]+$/;
    const [resetPass, setResetPass] = useState('')
    const [isNewPassValid, setIsNewPassValid] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state) => state.loginStatus.status)
    const navigate = useNavigate();
    const location = useLocation(); 
    const userName = useSelector((state) => state.isLogin.user.name)
    const userEmail = useSelector((state) => state.isLogin.user.email)
    const [newName, setNewName] = useState(false)
    const [newEmail, setNewEmail] = useState(false) 
    const isLogin = useSelector((state) => state.isLogin.isLogin);
    const isUser = useSelector((state) => state.isLogin.user)

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


    const changeStatus = (route) => {
        navigate.push(route);
    }

    const setToken = (token, refreshToken) => {
        localStorage.setItem(TOKEN, token)
        localStorage.setItem(REFRESH_TOKEN, refreshToken)
    }

    const removeToken = () => {
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
    }


    const register = async(email, password, name) => {
        const bodyData = {
            "email": email.toLowerCase(), 
            "password": password, 
            "name": name,
        };
        
        
        
        return request('/auth/register', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            const token = data.accessToken;
            const refreshToken = data.refreshToken;
            const user = data.user;
    
            setToken(token, refreshToken);
            dispatch(setUser(user));
            dispatch(authorization(true));
            navigate('/');
            localStorage.setItem(PASSWORD, password);
            
            
        }).catch(error => {
            console.error(error);
        });
    }

    const auth = async(email, password) => {
        const bodyData = {
            'email' : email.toLowerCase(),
            'password': password,
        };
    
        return request('/auth/login', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            const token = data.accessToken;
            const refreshToken = data.refreshToken;
            const user = data.user;
            
            console.log('Received data:', data);
    
            setToken(token, refreshToken);
            console.log(localStorage.getItem(TOKEN)); 
    
            localStorage.setItem(USER, JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem(USER))); 
    
            dispatch(setUser(user));
            console.log(isUser); 
    
            localStorage.setItem(ISLOGIN, true);
            console.log(localStorage.getItem(ISLOGIN))

            dispatch(authorization(true));
            console.log(isLogin); 

    
            setName(user.name);
            console.log(name);
    
            setEmail(user.email);
            console.log(email);
                
            navigate('/');
            console.log('Navigation complete'); 
            
            
            
        }).catch(error => {
            console.error(error);
        });
    }


    

    const logout = async(refreshToken) => {
        const bodyData = {
            token: refreshToken
        };
    
        return request('/auth/logout', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            
            const user = {
                email: '',
                password: '',
            };
            
            removeToken();
            dispatch(setUser(user));
            localStorage.setItem(USER, JSON.stringify(user));
            localStorage.setItem(ISLOGIN, false);
            dispatch(authorization(false));
            navigate('/login');
            
        }).catch(error => {
            console.error(error);
        });
    }

    const forgotPassword = async(email) => {
        
        const bodyData = { 
            email: email.toLowerCase(),
        }

        return request('/password-reset', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            dispatch(resetPasswordAction(true))
            navigate('/password-reset/reset')
        })
        
        .catch(error => {
            console.error(error);
        });
    }


    const resetPassword = async(password, emailCode) => {

        const bodyData = {
            password: password,
            token: emailCode,
        }

        return request('/password-reset/reset', {
            method: 'POST',
            headers : {
                "Content-type": 'application/json'
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            navigate('/login')
            dispatch(resetPasswordAction(false))
        })
        .catch(error => {
            console.error(error);
        });
    }


    const saveName = async(email, name) => {

        const bodyData = {
            email: email.toLowerCase(),
            name: name,
        }

        return request('/auth/user', {
            method: 'PATCH',
            headers : {
                "Content-type": 'application/json',
                "Authorization": localStorage.getItem(TOKEN)
            },
            body : JSON.stringify(bodyData)
        }).then(data => {
            const user = data.user
            console.log(data)
            setNewName(false)
            setNewEmail(false)
            setName(data.user.name)
            setEmail(data.user.email)
            localStorage.setItem(USER, JSON.stringify(user));
            dispatch(setUser(user));
        })

    }

    const editName = () => {
        setNewName(true)
    }

    const editEmail = () => {
        setNewEmail(true)
    }

    let content

    switch (status) {
        case LOG_IN:
            content = (
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
                statusRegistration={() => changeStatus('/register')}
                statusForgotPassword={() => changeStatus("/forgot-password")}
                submit={() => auth(email, password)}/>
            )
            
            break;

            case REGISTRATION: 
            content = (
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
                submit={() => register(email, password, name)}/>
            );

            break;

            case FORGOT_PASSWORD:
                content = (
                    <ForgotPassword 
                    setEmail={e => setEmail(e.target.value)}
                    email={email}
                    validEmail={validEmail ? false : true}
                    errorEmail={errorEmail}
                    emailRef={emailRef}
                    statusLogIn={() => changeStatus("/login")}
                    submit={() => forgotPassword(email)}/>
                )

                break;

                case RESET_PASSWORD:
                    content = (
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
                        isNewPassValid={!isNewPassValid}
                        statusLogIn={() => changeStatus("/login")}
                        submit={() => resetPassword(password, resetPass)}/>
                    )
                
                    break;

                    case PROFILE :
                        content = (
                            <Profile
                                name={userName}
                                setName={e => dispatch(setUserName(e.target.value))}
                                setEmail={e => dispatch(setUserEmail(e.target.value))}
                                email={userEmail}
                                pass={localStorage.getItem(PASSWORD)}
                                revealPass={'password'}
                                logout={() => logout(localStorage.getItem(REFRESH_TOKEN))}
                                onIconName={newName ? () => saveName(userEmail, userName) :  () => editName()}
                                onIconEmail={newEmail ? () => saveName(userEmail, userName) :  () => editEmail()}
                                disabledName={!newName}
                                disabledEmail={!newEmail}
                                iconName={!newName ? 'EditIcon' : "CheckMarkIcon"}
                                iconEmail={!newEmail ? 'EditIcon' : "CheckMarkIcon"}
                                validEmail={validEmail ? false : true}
                                errorEmail={errorEmail}
                                emailRef={emailRef}
                                />
                        )
                    default:
                            break;
    }

    useEffect(() => {
        const currentPath = location.pathname;
    
        switch (currentPath) {
            case "/login":
                dispatch(setStatusProfile(LOG_IN));
                break;
            case "/register":
                dispatch(setStatusProfile(REGISTRATION));
                break;
            case "/password-reset":
                dispatch(setStatusProfile(FORGOT_PASSWORD));
                break;
            case "/password-reset/reset":
                dispatch(setStatusProfile(RESET_PASSWORD));
                break;
            case "/profile":
                dispatch(setStatusProfile(PROFILE))
            default:
                break;
        }
    }, [location.pathname, dispatch]);


    return (
        <div>{content}</div>        
    )
}



