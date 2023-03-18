import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ReactDOM from 'react-dom';
import style  from './ModalOverlay.module.css';
import PropTypes from 'prop-types';



const ModalOverlay = ({children, onClick}) => {
    const modalRoot = document.getElementById('modal')


    const clickOverlayClose = (e) => {
        if(e.target === e.currentTarget) {
            onClick()
        }
    }

    const escClose = (e) => {
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

    

    return ReactDOM.createPortal(
        <div className={`${style.modalOverlay}`} onClick={clickOverlayClose}>
            {children}
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default ModalOverlay