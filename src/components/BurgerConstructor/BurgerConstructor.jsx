    import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, LockIcon, DragIcon, DeleteIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
    import React, { useEffect, useCallback } from 'react'
    import style from './BurgerConstructor.module.css'
    import OrderDetails from '../OrderDetails/OrderDetails.jsx'
    import Modal from '../Modal/Modal.jsx';
    import { useDispatch, useSelector } from 'react-redux';
    import { removeItem, addItem, moveItem, submitOrder, emptyCart } from '../../services/burgerCart-slice';
    import {useDrop } from 'react-dnd/dist/hooks/useDrop';
    import { useDrag } from 'react-dnd/dist/hooks/useDrag';
    import { itemTypes } from '../../utils/types';
    import { Navigate, useNavigate } from 'react-router-dom';
    


    function Cart(props){
        return(
            <ol className={style.cart}>
                {props.children}
            </ol>
        )
    }

    const Ingredients = React.forwardRef((props, ref) => { 
        return( 
            <ol className={style.ingredients} ref={ref}>
                {props.children}
            </ol>
        )
    })

    function Total(props) {
        return (
            <div className={style.total}>
                <div className={`${style.totalPrice} mr-10`}>
                    <p className='text text_type_digits-medium'>{props.price}</p>
                    <CurrencyIcon type='primary'/>
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={props.onClick} disabled={props.disabled}>
                    {props.children}
                </Button>
            </div>
        )
    }

    function Product(props) {
        const originalId = props.findIndex
        const newId = props.newId
        const [{isDragging} ,drag] = useDrag(() => ({
            type: itemTypes.MAIN,
            item: {newId, originalId},
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: (item, monitor) => {
                const {newId: droppedId, originalId} = item 
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    //console.log(originalId)
                    props.moveIngredient(droppedId, originalId)
                }
            }
        }), [newId, originalId, props.moveIngredient])

        const [, drop] = useDrop(() => ({
            accept: itemTypes.MAIN,
            hover({newId: draggetId}) {
                if(draggetId !== newId) {
                    const {index: overIndex} = props.findId(newId)

                    props.moveIngredient(draggetId, overIndex)
                }
            }
        }), [props.findId, props.moveIngredient])

        const opacity = isDragging ? 0 : 1

        return (
        <li className={props.style} ref={(node) => drag(drop(node))} style={{opacity}}>
            <DragIcon type='primary'/>  
            <ConstructorElement
                type={props.type}
                isLocked={false}
                text={props.name}
                price={props.price}
                thumbnail={props.image}
                handleClose={props.remove}/>
        </li>
        )
    }

    function ConstructorTemplate(props) {

        return (
            <div className={props.style}>
                <p className={style.constructorElementText} >Выберите булочку</p>
            </div>
        )
    }




    function BurgerConstructor() {

        
        const [bun, setBun] = React.useState([])
        const [items, setItems] = React.useState([])
        const [totalPrice, setTotalPrice] = React.useState(0)
        const [onOpen, setOnOpen] =React.useState(false)
        const bunItems = useSelector((state) => state.cart.cart.bun)
        const mainItems = useSelector((state) => state.cart.cart.main)
        const orederNumber = useSelector((state) => state.cart.orderNumber)
        const dispatch = useDispatch()
        const bunIsEmpty = bun.length === 0
        const isLogin = useSelector((state) => state.isLogin.isLogin)
        const navigate = useNavigate()
        

        const findId = useCallback((id) => {
            const ingredient = mainItems.filter((i) => `${i.newId}` === id)[0]
            
            return {
                ingredient,
                index: mainItems.indexOf(ingredient)
            }
        }, [mainItems])

        

        const moveIngredient = useCallback((id, atIdex) => {
            const {ingredient, index} = findId(id)

            const newCartItems = [
                ...mainItems.slice(0, index),
                ...mainItems.slice(index + 1)
            ]

            newCartItems.splice(atIdex, 0, ingredient)
            

            dispatch(moveItem(newCartItems))
            

        }, [findId, mainItems])

        const [{ canDrop, isOver }, add] = useDrop(() => ({
            accept: itemTypes.INGREDIENT,
            drop: (item, monitor) => {
                dispatch(addItem({...item.ingredient}));
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }));

        const dropZoneClass = canDrop ? `${style.shell} ${style.canDrop}` : style.shell;
        
        const [, drop] = useDrop(() => ({
            accept: itemTypes.MAIN, 

        }))


        useEffect(() => {
            const totalPrice = 
                (bunItems[0]?.price * 2 || 0) + 
                    mainItems.reduce((sum, item) => sum + item.price, 0)
                    setTotalPrice(totalPrice)
            if (bunItems) {
                const bun = bunItems.filter((item) => item.type === "bun").slice(0, 1);
                setBun(bun);
            }
            if (mainItems) {
                setItems(mainItems);
            }
        }, [bunItems, mainItems]);

        // const handleSubmitOrder = () => {
        //     dispatch(submitOrder())
        //     setOnOpen(true)
        // }

        const handleSubmitOrder = async() => {
            try {
                dispatch(submitOrder()).unwrap()
                setOnOpen(true)
                dispatch(emptyCart())
            } catch (error) {
                console.error("Error:", error)
            }
        }

            return (
                <div className={dropZoneClass} ref={add}>
                    <Cart>
                    {bun.length === 0 ? (
                <li className={style.bun} >
                    <ConstructorTemplate style={`${style.constructorElement} ${style.constructorElementTop}`}
                    text = 'Выберете булку'/>
                </li>
                ) : bun.map(item => (
                    <li className={style.bun} key={item._id}> 
                    <ConstructorElement
                    key={item.newId}
                    type="top"
                    isLocked={true}
                    text={item.name + '(верх)'}
                    price={item.price}
                    thumbnail={item.image}/>
                    </li>
                    ))}
                    <Ingredients ref={drop}>
                        {items && items.map(item =>(
                            <Product
                            style={style.main} 
                            key={item.newId}
                            price={item.price}
                            name={item.name}
                            image={item.image}
                            findIndex={findId(item.newId).index}
                            moveIngredient={moveIngredient}
                            findId={findId}
                            newId={item.newId}
                            remove={()=>dispatch(removeItem(item.newId))}/>
                        ))}
                    </Ingredients>
                    {bun.length === 0 ? (
                    <li className={style.bun} >
                        <ConstructorTemplate style={`${style.constructorElement} ${style.constructorElementBottom}`}
                            text = 'Выберете булку'/>
                    </li> ) : bun.map(item => (
                    <li className={style.bun} key={item._id}> 
                        <ConstructorElement
                            key={item.newId}
                            type="bottom"
                            isLocked={true}
                            text={item.name + '(низ)'}
                            price={item.price}
                            thumbnail={item.image}/>
                    </li>
                    ))}
                </Cart>
                {isLogin ?<Total price={totalPrice} onClick={handleSubmitOrder} disabled={bunIsEmpty} children={'Оформить заказ'}/>  : 
                <Total price={totalPrice} onClick={() => navigate('/login')}  children={'Войти'}/> }
                {onOpen && <Modal  handleClose={()=>setOnOpen(false)}>
                    <OrderDetails/>
                </Modal>}
                </div>
            )
        }

        

    export default BurgerConstructor