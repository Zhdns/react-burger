import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './AppHeader.module.css'



function Button(props) {
    return (
        <button className={`${styles.button} pl-5 pr-5` }>
            {props.img}
            <p className="text text_type_main-small ml-2">{props.text}</p>
        </button>
    )
}




class AppHeader extends React.Component {
    render() {
        const headerStyle = {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#1C1C21',
            margin: '40px',
            minHeight: '88px',
            alignItems: 'center',
            justifyContent: 'center',
        }
        return(
            <header style={headerStyle}>
                    <nav style={{display: 'flex',}}>
                        <Button img={<BurgerIcon type="primary"/>} text={"Конструктор"}/>
                        <Button img={<ListIcon type='primary'/>} text={"Лента заказов"}/>
                    </nav>
                    <nav style={{margin: '0 311px 0 118px',}}>
                        <Logo/>
                    </nav>
                    <Button img={<ProfileIcon type='primary'/>} text={"Личный кабинет"}/>
            </header>
        )
    }
}

export default AppHeader
