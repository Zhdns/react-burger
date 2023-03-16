    import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
    import React, { useEffect } from 'react'
    import style from './BurgerConstructor.module.css'
    import PropTypes from 'prop-types';
    import OrderDetails from '../OrderDetails/OrderDetails.jsx'
    import { bunType, mainType, sauceType } from '../../utils/types.js'


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
                    <p className='text text_type_digits-medium'>{props.price}</p>
                    <CurrencyIcon type='primary'/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={props.onClick}>
                    Оформить заказ
                </Button>
            </div>
        )
    }






    function BurgerConstructor({data}) {

        
        const [bun, setBun] = React.useState([])
        const [main, setMain] = React.useState([]);
        const [sauce, setSauce] = React.useState([]);
        const [totalPrice, setTotalPrice] = React.useState(0)
        const [isOpen, setIsOpen] = React.useState(false)
        const [orderNumber, setOrderNumber] = React.useState(1)



        useEffect(() => {
            const bun = data.filter(item => item.type === 'bun').slice(0,1)
            const main = data.filter(item => item.type === 'main')
            const sauce = data.filter(item => item.type === 'sauce')
            const totalPrice = [...bun, ...sauce, ...main].reduce((sum, item) => sum + item.price, 0)
            setBun(bun)
            setMain(main)
            setSauce(sauce)
            setTotalPrice(totalPrice)
    }, [data])


    const togglePopup = () => {
        setOrderNumber(prev => prev + 1)
        setIsOpen(true)
    }

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
                        thumbnail={item.image}/>
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
                            thumbnail={item.image}/>
                            </li>
                        ))}
                        {sauce && sauce.map(item => (
                            <li className={style.main} key={item._id}>
                            <DragIcon type='primary'/>
                            <ConstructorElement
                            key={item._id}
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}/>
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
                        thumbnail={item.image}/>
                        </li>
                        
                    ))}
                </Cart>
                <Total price={totalPrice} onClick={togglePopup}/>
                <OrderDetails 
                isOpen={isOpen}
                isCLose={() => setIsOpen(false)}
                orderNumber={orderNumber}
                gifKey={orderNumber}/>
                </div>
            )
        }

        BurgerConstructor.propTypes = {
            totalPrice: PropTypes.number,
            bun: bunType,
            main: mainType,
            sauce: sauceType,
        }

    export default BurgerConstructor