import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import Modal from '../Modal/Modal.jsx'
import style from './IngredientsDetails.module.css'
import PropTypes from 'prop-types';

const IngredientsDetails = ({ingredient, isOpen, isCLose}) => {

    if (!ingredient) {
        return null;
    }

    const {image, name ,calories, proteins, fat, carbohydrates} = ingredient



    const main = (
        <div className={style.main}>
            <img src={image} className={style.img} alt={name}/>
            <h3 className={`${style.title} text text_type_main-medium mb-8`}>{name}</h3>
            <div className={style.spec}>
                <div className={style.calories}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default">{calories}</p>
                </div>
                <div className={style.calories}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{proteins}</p>
                </div>
                <div className={style.calories}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{fat}</p>
                </div>
                <div className={style.calories}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{carbohydrates}</p>
                </div>
            </div>
        </div>
    )

    return (
        <Modal title='Детали ингредиента' main={main}  isOpen={isOpen} isClose={isCLose}/>
    )
}

IngredientsDetails.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string,
        price: PropTypes.number,
        name: PropTypes.string,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
    }),

    isOpen: PropTypes.bool,
    isCLose: PropTypes.func,
};


export default IngredientsDetails