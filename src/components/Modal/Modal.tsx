import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { Children, useEffect, FC} from 'react'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import style from './Modal.module.css'
import { ModalType } from './ModalTypes'



function Modal ({title, children, handleClose} : ModalType)  {

    console.log(children)

    return (
        <ModalOverlay  onClick={handleClose}>
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

export default Modal