import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { Children, useEffect } from 'react'
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx'
import style from './Modal.module.css'
import PropTypes from 'prop-types';

function Modal({title, onClose, children, handleClose}) {

    


    return (
        <ModalOverlay onClose={onClose} onClick={handleClose}>
            <div className={style.modal}>
                <div className={style.modalTop}>
                    {title && <h2 className={`${style.title} text text_type_main-large`}>{title}</h2>}
                    <CloseIcon type="primary" onClick={handleClose}/>
                </div>
                {children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
};


export default Modal