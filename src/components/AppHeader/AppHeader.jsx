import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './AppHeader.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import burger from '../../images/Union.svg'





function Button(props) {
    return (
        <button className={`${style.button} pl-5 pr-5` }>
            {props.img}
            <p className="text text_type_main-small ml-2">{props.text}</p>
        </button>
    )
}




    const AppHeader = () =>  {

        const location = useLocation();
    
        return (
            <header className={style.header}>
                    <nav className={style.nav}>
                        <NavLink to='/' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}> 
                        <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"}/><span className={`text text_type_main-default`}>Конструктор</span> 
                        </NavLink>
                        <NavLink to='/feed' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks} type={({isActive}) => isActive ? 'primary'  : "secondary" }> 
                        <ListIcon type={location.pathname.startsWith('/feed') ? "primary" : "secondary"}/> <span className={`text text_type_main-default `}>Лента заказов</span> 
                        </NavLink>
                    </nav>
                    <div className={style.logo}>
                        <Logo/>
                    </div>
                    <NavLink to='/profile' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}>
                        <ProfileIcon type={location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ?
                        "secondary" : "primary"}/><span className={ location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ? 
                        `text text_type_main-default ${style.navLinks}` : `text text_type_main-default ${style.navLinksActive}`}>Личный кабинет </span>
                        </NavLink>  
            </header>
        )
    }


export default AppHeader
