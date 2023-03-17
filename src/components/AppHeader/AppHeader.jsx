import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './AppHeader.module.css'



function Button(props) {
    return (
        <button className={`${style.button} pl-5 pr-5` }>
            {props.img}
            <p className="text text_type_main-small ml-2">{props.text}</p>
        </button>
    )
}




    const AppHeader = () =>  {
    
        return (
            <header className={style.header}>
                    <nav className={style.nav}>
                        <Button img={<BurgerIcon type="primary"/>} text={"Конструктор"}/>
                        <Button img={<ListIcon type='primary'/>} text={"Лента заказов"}/>
                    </nav>
                    <div className={style.logo}>
                        <Logo/>
                    </div>
                    <Button img={<ProfileIcon type='primary'/>} text={"Личный кабинет"}/>
            </header>
        )
    }


export default AppHeader
