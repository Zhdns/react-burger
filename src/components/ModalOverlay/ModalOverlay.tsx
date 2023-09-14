import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, } from 'react';
import ReactDOM from 'react-dom';
import style  from './ModalOverlay.module.css';
import { ModalOverlayType } from './ModalOverlayTypes';

const ModalOverlay =({children, onClick} : ModalOverlayType) => {

    const modalRoot = document.getElementById('modal') as HTMLElement;
    console.log(modalRoot)

    const clickOverlayClose = (e: React.MouseEvent) => {
        if(e.target === e.currentTarget) {
            onClick()
        }
    }

    const escClose = (e: KeyboardEvent) => {
        if(e.key === 'Escape' ) {
            onClick()
        }
    }

    React.useEffect(()=> {
        document.addEventListener('keydown', escClose)
            return () => {
                document.removeEventListener('keydown', escClose)
            }
    }, [])

    
    

    // return modalRoot
    // ? ReactDOM.createPortal(
    //     <div className={`${style.modalOverlay}`} onClick={clickOverlayClose}>
    //       {children}
    //     </div>,
    //     modalRoot
    //   )
    // : null;

    return ReactDOM.createPortal(
        <div className={`${style.modalOverlay}`} onClick={clickOverlayClose}>
            {children}
        </div>,
        modalRoot
    )
};

export default ModalOverlay

