import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ReactDOM from 'react-dom';
import style  from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({children, isOpen, isClose}) => {
    const modalRoot = document.getElementById('modal')
    const modalStyle = {
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
    };


    const clickOverlayClose = (e) => {
        if(e.target === e.currentTarget) {
            isClose()
        }
    }

    const escClose = (e) => {
        if(e.key === 'Escape') {
            isClose()
        }
    }

    React.useEffect(()=> {
        document.addEventListener('keydown', escClose)
            return () => {
                document.removeEventListener('keydown', escClose)
            }
    }, [])

    return ReactDOM.createPortal(
        <div className={`${style.modalOverlay}`} style={modalStyle} onClick={clickOverlayClose}>
            {children}
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isClose: PropTypes.func,
};

export default ModalOverlay