    import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
    import React, { useEffect, useContext } from 'react'
    import style from './BurgerConstructor.module.css'
    import PropTypes from 'prop-types';
    import OrderDetails from '../OrderDetails/OrderDetails.jsx'
    import Modal from '../Modal/Modal.jsx';
    import {CartContext} from '../App/App.jsx'
    import { url } from '../../utils/constants.js';
    import { checkResponse } from '../../utils/utils.js';



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
                <Button htmlType="button" type="primary" size="medium" onClick={props.onClick} disabled={props.disabled}>
                    Оформить заказ
                </Button>
            </div>
        )
    }






    function BurgerConstructor({}) {

        
        const [bun, setBun] = React.useState([])
        const [main, setMain] = React.useState([]);
        const [sauce, setSauce] = React.useState([]);
        const [totalPrice, setTotalPrice] = React.useState(0)
        const [onOpen, setOnOpen] =React.useState(false)
        const [orderNumber, setOrderNumber] = React.useState(1)

        const {cartItems, clearCart, removeItem} = useContext(CartContext)
        const bunIsEmpty = bun.length === 0


        useEffect(() => {
            
            if(cartItems) { 
                
            const bun = cartItems.filter(item => item.type === 'bun').slice(0,1)
            const main = cartItems.filter(item => item.type === 'main')
            const sauce = cartItems.filter(item => item.type === 'sauce')
            const totalPrice = 
            (bun[0]?.price * 2 || 0) + 
            main.reduce((sum, item) => sum + item.price, 0) +
            sauce.reduce((sum, item) => sum + item.price, 0);
            setBun(bun)
            setMain(main)
            setSauce(sauce)
            setTotalPrice(totalPrice)
        }
    }, [cartItems])



    async function submitOrder() {
        const ingredientsIds = [...bun, ...main, ...sauce].map(item => item._id);
        console.log(ingredientsIds)

            const response = await fetch(`${url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsIds }),
        });

        const data = await response.json();
            
        checkResponse(response, () => {
            console.log(data)
            setOrderNumber(data.order.number);
            setOnOpen(true);
        })
            clearCart()
    }

            return (
                <div className={style.shell}>
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
                            thumbnail={item.image}
                            handleClose={()=>removeItem(item.newId)}/>
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
                            handleClose={()=>removeItem(item.newId)}/>
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
                <Total price={totalPrice} onClick={submitOrder} disabled={bunIsEmpty}/>
                {onOpen && <Modal  handleClose={()=>setOnOpen(false)}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>}
                </div>
            )
        }

        

    export default BurgerConstructor