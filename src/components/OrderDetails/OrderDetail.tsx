import React, { useEffect } from 'react'
import Modal from '../Modal/Modal.jsx'
import style from './OrderDetails.module.css'
import orderConfirmGIF from '../../images/orderConfirm.gif'
import loader from '../../images/loader.gif'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ISPENDING } from '../../utility/constants'
import { Cart } from './OrderDetailsTypes.js'


const OrderDetails = () => {
    
    const orderNumber = useSelector((state: Cart) => state.cart.orderNumber)

    const isDone = ` ${style.number} text text_type_digits-large`
    const isPending = ` ${style.number} text text_type_main-large`

    return (
        <div className={style.main}>
        <h1 className={orderNumber === ISPENDING ? isPending : isDone}>{String(orderNumber).padStart(6, '0')}</h1>
        <h2 className={style.title}>{orderNumber === ISPENDING ? 'Ожидайте' : 'Идентификатор заказа'}</h2>
        {orderNumber === ISPENDING ?  
        <img className={style.imgWaiting} src={loader} alt="loader"/> :
        <img className={style.img} src={orderConfirmGIF} alt="confirmaton"/>}
        <span className='text text_type_main-small'>{orderNumber === ISPENDING ? 'Ваш заказ начали готовить' : 'Ваш заказ готов'}</span>
        <span className={`${style.span} text text_type_main-small`}>{orderNumber === ISPENDING ? 'Дождитесь готовности на орбитальной станции' : 'Заберите заказ на орбитальной станции'}</span>
    </div>
    )
}


export default OrderDetails