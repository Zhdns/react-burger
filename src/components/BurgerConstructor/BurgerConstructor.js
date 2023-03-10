import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './BurgerConstructor.module.css'
import { data } from '../../utils/data.js'


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
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: '40px 12px 0 0'
        }}>
            <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }} className='mr-10'>
                <p className='text text_type_main-large'>{props.price}</p>
                <CurrencyIcon type='primary'/>
            </div>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>
    )
}






class BurgerConstructor extends React.Component {

    state = {
        bun: [],
        main: [],
        sauce: [],
        totalPrice: 0,
    }

    componentDidMount() {
        const bun = data.filter(item => item.type === 'bun').slice(0,1)
        const main = data.filter(item => item.type === 'main')
        const sauce = data.filter(item => item.type === 'sauce')
        const totalPrice = [...bun, ...sauce, ...main].reduce((sum, item) => sum + item.price, 0)
        this.setState({bun, main, sauce, totalPrice})
}

    render() {

        const {bun, main, sauce, totalPrice} = this.state


        return (
            <div style={{margin: '0'}}>
            <Cart>
                {bun && bun.map(item => (
                    <li style={{
                        maxHeight: '80px',
                        margin:' 0 0 0 72px',
                        paddingRight: '12px'
                    }}> 
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={item.name + '(верх)'}
                    price={item.price}
                    thumbnail={item.image}
                    key={item._id}/>
                    </li>
                    
                ))}
                <Ingredients>
                    {main && main.map(item =>(
                        <li style={{
                            display: 'flex',
                            listStyleType: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}>
                        <DragIcon type='primary'/>
                        <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        key={item._id}/>
                        </li>
                    ))}
                    {sauce && sauce.map(item => (
                        <li style={{
                            display: 'flex',
                            listStyleType: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                        }}>
                        <DragIcon type='primary'/>
                        <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        key={item._id}/>
                        </li>
                    ))}
                </Ingredients>
                {bun && bun.map(item => (
                    <li style={{
                        maxHeight: '80px',
                        margin:' 0 0 0 72px',
                        paddingRight: '12px'
                    }}> 
                    <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={item.name + '(низ)'}
                    price={item.price}
                    thumbnail={item.image}
                    key={item._id}/>
                    </li>
                    
                ))}
            </Cart>
            <Total price={totalPrice}/>
            </div>
        )
    }
}

export default BurgerConstructor