import { EmailInput, Input, ShowIcon, HideIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../../services/setLoginPageStatus";
import { useSelector, useDispatch} from 'react-redux';
import style  from './FeesPage.module.css';
import { setData } from "../../services/app-slice";
import { wsConnecting } from "../../services/middlewareReducer";
import loader from '../../images/loader.gif'


function Order(props) {
    return (
        <div className={style.order}>
            <div className={style.orderInfo}>
                <p className="text text_type_digits-default">{props.orderId}</p>
                <p className="text text_type_main-small text_color_inactive">{props.orderDate}</p>
            </div>
            <h2 className={`text ${style.orderName} text_type_main-medium`}>
                {props.name}
            </h2>
            <div className={style.orderInfo}>
                <div>
                    {props.child}
                </div>
                <div  className={style.orderPrice}>
                    <p className={`${style.price} text text_type_digits-default`}>{props.price}</p>
                    <CurrencyIcon type="primary"></CurrencyIcon>
                </div>
            </div>
        </div>
    )
}

function IngredientPicture(props) {
    return (
        <div className={style.ingredientPictureMain} style={props.style}>
            <img src={props.img} className={style.ingredientPicture} style={props.imageOpacity}/>
            <div className={style.count}>
            {/* <div className={style.count}> */}
                <p className="text text_type_main-default" style={{margin: '0'}}>{props.count}</p>
            </div>
        </div>
    )
}

function ScrollBarBlock(props) {
    return (
        <div className={style.scrollBar}>
            {props.children}
        </div>
    )
}

function OrdersOnProcess(props) {

    return ( 
    
    <div className={style.orpderOnProcess}>
        <h2 className={` ${style.orpderOnProcessTitle} text text_type_main-medium`}>
            {props.title}
        </h2>
        <ul className={style.processList}>
            {props.children}
        </ul>
    </div>
    )}

    function AllOrders(props) {
        return (
            <div>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{props.summ}</p>
            </div>
        )
    }

    function TodayOrders(props) {
        return (
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня::</h2>
                <p className="text text_type_digits-large">{props.summ}</p>
            </div>
        )
    }

    function Loader() {
        return (
            <img src={loader} className={style.loader}/>
        )
    }

function FeedPage() {
    const orders = useSelector((state) => state.webSocket.orders) || { orders: [] }
    const mainData = useSelector((state) => state.app.data)
    const connected = useSelector(state => state.webSocket.connected) 
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    const updateData = useCallback(() => {
        if (connected && orders && orders.orders) {
            const newData = orders.orders.map(order => {
                const ingredients = order.ingredients.map(ingredient => {
                    return mainData.find(item => item._id === ingredient)
                })
    
                return {
                    ...order,
                    ingredients,
                }
            })
            setData(newData)
        }
        else {
            dispatch(wsConnecting('wss://norma.nomoreparties.space/orders/all'))
        }
    }, [orders])
    
    useEffect(() => {
        updateData()
    }, [updateData])


    

    return (

        <div className={style.main}>
            <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
            <div className={style.feedPage}>
                <div className={style.feed}>
                <ScrollBarBlock>
                {!connected ? 
                    (<Loader/>) : 
                    (data && data.map((order, index) => {
                        const uniqueIngredients = Array.from(new Set(order.ingredients))

                        const repeatedIngredients = []
                        const singleIngredients = []

                        uniqueIngredients.forEach((ingredient, ingredientIndex) => {
                            const count = order.ingredients.filter(item => item === ingredient).length

                            if(count > 1) {
                                repeatedIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: -ingredientIndex }}
                                    imageOpacity={{opacity: 0.5}}
                                    count={`+${count}`}/>
                                )
                            } else {
                                singleIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: -ingredientIndex }}/>
                                )
                            }
                        })
                        
                        const ingredients = [...repeatedIngredients, ...singleIngredients]
                        
                        const orderPrice =  order.ingredients.reduce((sum, item) => sum + item.price, 0)
                        const date = order.createdAt && new Date(order.createdAt).toLocaleString();

                        return (
                            <Order 
                                key={`${order._id}-${index}`} 
                                orderId={`#${order.number}`} 
                                orderDate={date} 
                                name={order.name} 
                                price={orderPrice} 
                                child={ingredients}
                            />
                        )
                    }))}
                    </ScrollBarBlock> 
                </div>
                <div className={style.screen}>
                    <div className={style.processScreen}>
                    <OrdersOnProcess
                        title={'Готовы:'}>
                            {data && data
                            .filter(order => order.status === 'done')
                            .slice(0,5)
                            .map((order) => (
                                <li key={order._id} className={` ${style.numberDone} text text_type_digits-default`}>
                                    {order.number}
                                </li>    
                            ))}
                        </OrdersOnProcess>
                        <OrdersOnProcess
                        title={'В работе:'}>
                            {data && data
                            .filter(order => order.status === 'pending')
                            .map((order) => (
                                <li key={order._id} className={` text text_type_digits-default`}>
                                    {order.number}
                                </li>    
                            ))}
                            {data && data.filter((order) => order.status === 'pending').length === 0 &&
                                <p className="text text_type_main-default">Нет заказов в работе!</p>
                            }
                        </OrdersOnProcess>
                    </div>
                    <AllOrders
                    summ={orders.total}/>
                    <TodayOrders
                    summ={orders.totalToday}/>
                </div>
            </div>
        </div>
    )

}

export default FeedPage