import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ReactDOM from 'react-dom';
import style  from './ModalOverlay.module.css';
import PropTypes from 'prop-types';



const ModalOverlay = ({children, onClose, onClick}) => {
    const modalRoot = document.getElementById('modal')

    const [modalStyle, setModalStyle] = React.useState({
        opacity: 1,
        visibility: 'visible',
    });
    
    React.useEffect(() => {
        if (onClose === false) {
            setModalStyle({
                opacity: 1,
                visibility: 'visible',
            });
        } else {
            setModalStyle({
                opacity: 0,
                visibility: 'hidden',
            });
        }
    }, [onClose]);


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
        <div className={`${style.modalOverlay}`} style={modalStyle} onClick={clickOverlayClose}>
            {children}
        </div>,
        modalRoot
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
};

export default ModalOverlay