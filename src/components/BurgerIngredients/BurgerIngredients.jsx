import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect, useContext, useRef} from 'react'
import style from './BurgerIngredients.module.css'
import PropTypes from 'prop-types';
import IngredientsDetails from '../IngredientDetails/IngredientDetails.jsx';
import { ingredientType} from '../../utils/types.js'
import Modal from '../Modal/Modal.jsx';
import {CartContext} from '../App/App.jsx'



function Title(props) {
    return (
        <h1 className={`${style.title} text text_type_main-large mb-5`}>{props.text}</h1>
    )
}

const SecondTitle = React.forwardRef((props, ref) => {
    return (
    <h2 className={`${style.secondTitle} text text_type_main-medium`} ref={ref}>
        {props.text}
    </h2>
    );
});


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
    <li className={style.product} onClick={() => props.onIngredientClick(props)} >
        <div className={style.counter}>
        <Counter count={props.count} size="default" />
        </div>
        <img className={style.productImage} src={props.image} alt={props.alt}></img>
        <div className={`${style.productPrice} text text_type_main-medium`}>
            <span className={`${style.price} text_type_digits-default`}>{props.price}</span>
            <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
        <p className={`${style.productName} text text_type_main-default`}>{props.name}</p>
    </li>
    )
}


function BurgerIngredients({data}) {
    const [current, setCurrent] = React.useState('Булки');
    const [bun, setBun] = React.useState([]);
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);
    const [onOpen, setOnOpen] = React.useState(false)
    const [selectedIngredient, setSelectedIngredient] = React.useState(null)
    
    const bunRef = React.useRef()
    const mainRef = React.useRef()
    const sauceRef = React.useRef()   

    const {cartItems, addItem} = useContext(CartContext)
    
    useEffect(() => {
                const bun = data.filter(item => item.type === 'bun')
                const main = data.filter(item => item.type === 'main')
                const sauce = data.filter(item => item.type === 'sauce')
                setBun(bun)
                setMain(main)
                setSauce(sauce)
                
    }, [ data])

    const handleTabClick = (value, sectionRef) => { 
        setCurrent(value);
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const togglePopup = (ingridient) => {
        setSelectedIngredient(ingridient)
        setOnOpen(true)
        
    }

    const handleIngredientClick = (ingredient) => {
        addItem(ingredient);
    };

    const calculateCount = (items, id) => {
        return items.filter((item) => item._id === id).length 
    }

    

    return(
        <div className={style.main}>
            <Title text="Соберите бургер"/>
            <div className={style.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={() => handleTabClick('Булки', bunRef)}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleTabClick('Соусы', sauceRef)}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleTabClick('Начинки', mainRef)}>
                    Начинки
                </Tab>
            </div>
            <ScrollBarBlock>
                <SecondTitle text="Булки" ref={bunRef}/>
                <List>
                    {bun && bun.map(item => (
                        <Product key={item._id}  
                        image={item.image} 
                        price={item.price} 
                        name={item.name} 
                        alt={item.name} 
                        calories={item.calories}
                        proteins={item.proteins}
                        fat={item.fat}
                        carbohydrates={item.carbohydrates}
                        count={calculateCount(cartItems, item._id) * 2}
                        onIngredientClick={() => {
                            togglePopup(item)
                            handleIngredientClick(item)
                        }}/>
                    ))}
                </List>
                <SecondTitle text="Соусы" ref={sauceRef}/>
                <List>
                    {sauce && sauce.map(item => (
                        <Product key={item._id}  
                        image={item.image} 
                        price={item.price} 
                        name={item.name} 
                        alt={item.name}
                        calories={item.calories}
                        proteins={item.proteins}
                        fat={item.fat}
                        carbohydrates={item.carbohydrates}
                        count={calculateCount(cartItems, item._id)}
                        onIngredientClick={() => {
                            togglePopup(item)
                            handleIngredientClick(item)
                        }}/>
                    ))}
                </List>
                <SecondTitle text="Начинки" ref={mainRef}/>
                <List>
                {main && main.map(item => (
                    <Product key={item._id}  
                    image={item.image} 
                    price={item.price} 
                    name={item.name} 
                    alt={item.name} 
                    calories={item.calories}
                    proteins={item.proteins}
                    fat={item.fat}
                    carbohydrates={item.carbohydrates}
                    count={calculateCount(cartItems, item._id)}
                    onIngredientClick={() => {
                        togglePopup(item)
                        handleIngredientClick(item)
                    }}/>
                ))}
                </List>
            </ScrollBarBlock>
            { onOpen && <Modal title={'Детали ингредиента'}  handleClose={()=>setOnOpen(false)}>
                <IngredientsDetails ingredient={selectedIngredient}/>
            </Modal>}
        </div>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType),
}

export default BurgerIngredients 
