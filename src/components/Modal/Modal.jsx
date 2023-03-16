import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'
import style from './Modal.module.css'
import PropTypes from 'prop-types';

function Modal({main, title, isOpen, isClose}) {


    return (
        <ModalOverlay isOpen={isOpen} isClose={isClose}>
            <div className={style.modal}>
                <div className={style.modalTop}>
                    {title && <h2 className={`${style.title} text text_type_main-large`}>{title}</h2>}
                    <CloseIcon type="primary" onClick={isClose}/>
                </div>
                {main}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    main: PropTypes.node,
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    isClose: PropTypes.func,
};


export default Modal