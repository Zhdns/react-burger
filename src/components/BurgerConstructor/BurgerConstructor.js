import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect } from 'react'
import style from './BurgerConstructor.module.css'
import { data } from '../../utils/data.js'
import PropTypes from 'prop-types';


function Cart(props){
    return(
        <ol className={style.cart}>
            {props.children}
        </ol>
    )
}

function Ingredients(props) { 
    return( 
        <ol className={style.ingredients}>
            {props.children}
        </ol>
    )
}

function Total(props) {
    return (
        <div className={style.total}>
            <div className={`${style.totalPrice} mr-10`}>
                <p className='text text_type_main-large'>{props.price}</p>
                <CurrencyIcon type='primary'/>
            </div>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>
    )
}






function BurgerConstructor() {

    
    const [bun, setBun] = React.useState([])
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0)

    useEffect(() => {
        const bun = data.filter(item => item.type === 'bun').slice(0,1)
        const main = data.filter(item => item.type === 'main')
        const sauce = data.filter(item => item.type === 'sauce')
        const totalPrice = [...bun, ...sauce, ...main].reduce((sum, item) => sum + item.price, 0)
        setBun(bun)
        setMain(main)
        setSauce(sauce)
        setTotalPrice(totalPrice)
}, [])


        return (
            <div style={{margin: '0'}}>
            <Cart>
                {bun && bun.map(item => (
                    <li className={style.bun} key={item._id}> 
                    <ConstructorElement
                    key={item._id}
                    type="top"
                    isLocked={true}
                    text={item.name + '(верх)'}
                    price={item.price}
                    thumbnail={item.image}
                    alt={item.name}/>
                    </li>
                    
                ))}
                <Ingredients>
                    {main && main.map(item =>(
                        <li className={style.main} key={item._id}>
                        <DragIcon type='primary'/>
                        <ConstructorElement
                        key={item._id}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        alt={item.name}/>
                        </li>
                    ))}
                    {sauce && sauce.map(item => (
                        <li className={style.main} key={item._id}>
                        <DragIcon type='primary'/>
                        <ConstructorElement
                        key={item._id}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        alt={item.name}/>
                        </li>
                    ))}
                </Ingredients>
                {bun && bun.map(item => (
                    <li className={style.bun} key={item._id}>  
                    <ConstructorElement
                    key={item._id}
                    type="bottom"
                    isLocked={true}
                    text={item.name + '(низ)'}
                    price={item.price}
                    thumbnail={item.image}
                    alt={item.name}/>
                    </li>
                    
                ))}
            </Cart>
            <Total price={totalPrice}/>
            </div>
        )
    }

    BurgerConstructor.propTypes = {
        totalPrice: PropTypes.number,

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

export default BurgerConstructor