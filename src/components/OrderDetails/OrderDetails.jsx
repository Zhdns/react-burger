import React, { useEffect } from 'react'
import Modal from '../Modal/Modal.jsx'
import style from './OrderDetails.module.css'
import orderConfirmGIF from '../../images/orderConfirm.gif'
import PropTypes from 'prop-types';

const OrderDetails = ({orderNumber}) => {
    

    return (
        <div className={style.main}>
        <h1 className={` ${style.number} text text_type_digits-large`}>{String(orderNumber).padStart(6, '0')}</h1>
        <h2 className={style.title}>идентификатор заказа</h2>
        <img className={style.img} src={orderConfirmGIF} alt="confirmaton"/>
        <span className='text text_type_main-small'>Ваш заказ начали готовить</span>
        <span className={`${style.span} text text_type_main-small`}>Дождитесь готовности на орбитальной станции</span>
    </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number,
};

export default OrderDetails