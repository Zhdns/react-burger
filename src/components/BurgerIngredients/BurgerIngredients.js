import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import style from './BurgerIngredients.module.css'
import { data } from '../../utils/data.js'
import PropTypes from 'prop-types';




function Title(props) {
    return (
        <h1 className={`${style.title} text text_type_main-large mb-5`}>{props.text}</h1>
    )
}

function SecondTitle(props) {
    return (
    <h2 className={`${style.secondTitle} text text_type_main-medium`}>{props.text}</h2>
    )
}


function ScrollBarBlock(props) {
    return (
        <div className={style.scrollBar}>
            {props.children}
        </div>
    )
}

function List(props) {
    return (
    <ol className={style.list}>
        {props.children}
    </ol>
    )
}

function Product(props) {
    return (
    <li className={style.product} >
        <div className={style.counter}>
        <Counter count={1} size="default" />
        </div>
        <img className={style.productImage} src={props.image} alt={props.alt}></img>
        <div className={`${style.productPrice} text text_type_main-medium`}>
            <span className={style.price}>{props.price}</span>
            <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
        <p className={`${style.productName} text text_type_main-default`}>{props.name}</p>
    </li>
    )
}


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('Булки');
    const [bun, setBun] = React.useState([]);
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);
    
    useEffect(() => {
                const bun = data.filter(item => item.type === 'bun')
                const main = data.filter(item => item.type === 'main')
                const sauce = data.filter(item => item.type === 'sauce')
                setBun(bun)
                setMain(main)
                setSauce(sauce)
                
    }, [])

    const handleTabClick = (value) => { 
        setCurrent(value);
    }

    return(
        <div className={style.main}>
            <Title text="Соберите бургер"/>
            <div style={{ display: 'flex', marginBottom: '40px'}}>
                <Tab value="Булки" active={current === 'Булки'} onClick={() => handleTabClick('Булки')}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleTabClick('Соусы')}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleTabClick('Начинки')}>
                    Начинки
                </Tab>
            </div>
            <ScrollBarBlock>
                <SecondTitle text="Булки"/>
                <List>
                    {bun && bun.map(item => (
                        <Product key={item._id}  image={item.image} price={item.price} name={item.name} alt={item.name}/>
                    ))}
                </List>
                <SecondTitle text="Соусы"/>
                <List>
                    {sauce && sauce.map(item => (
                        <Product key={item._id}  image={item.image} price={item.price} name={item.name} alt={item.name}/>
                    ))}
                </List>
                <SecondTitle text="Начинки"/>
                <List>
                {main && main.map(item => (
                    <Product key={item._id}  image={item.image} price={item.price} name={item.name} alt={item.name}/>
                ))}
                </List>
            </ScrollBarBlock>
        </div>
    )
}

BurgerIngredients.propTypes = {
    handleTabClick: PropTypes.func,
    
    current: PropTypes.string,
    
    bun: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
    })),
    
    main: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
    })),

    sauce: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
    })),
}

export default BurgerIngredients 
