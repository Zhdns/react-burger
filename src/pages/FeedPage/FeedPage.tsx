import { EmailInput, Input, ShowIcon, HideIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import {  setStatusProfile } from "../../services/setLoginPageStatus";
import { useSelector, useDispatch} from 'react-redux';
import style  from './FeedPage.module.css';
import { setData } from "../../services/appSlice";
import { wsConnecting, wsDisconnected } from "../../services/middlewareReducer";
import loader from '../../images/loader.gif'
import { addDetails} from "../../services/orderDetails-slice";
import Modal from "../../components/Modal/Modal";
import OrderDetailsPage from "../OrderDetailPage/OrderDetailPage";
import { ORDERID, ORDERMODAL } from "../../utility/constants";
import { IngredientGlobalType } from "../../utility/types";
import { AppDispatch } from "../../index";
import { AppState, OrderProps, IngredientPictureProps, WebSocketState, NewIdType, ChildrenType } from "../../utility/types";
import { OrdersOnProcessProps, NumberOfOrderProps } from "./FeedPageTypes";





function Order(props: OrderProps) {
    return (
        <div className={style.order}  onClick={() => { props.onClick(props)}}>
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

function IngredientPicture(props: IngredientPictureProps) {
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

function ScrollBarBlock(props: ChildrenType) {
    return (
        <div className={style.scrollBar}>
            {props.children}
        </div>
    )
}

function OrdersOnProcess(props: OrdersOnProcessProps) {

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

    function AllOrders(props: NumberOfOrderProps) {
        return (
            <div>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{props.summ}</p>
            </div>
        )
    }

    function TodayOrders(props: NumberOfOrderProps) {
        return (
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня::</h2>
                <p className={`text text_type_digits-large`}>{props.summ}</p>
            </div>
        )
    }

    function Loader() {
        return (
            <img src={loader} className={style.loader}/>
        )
    }

function FeedPage() {
    const orders = useSelector((state: WebSocketState) => state.webSocket.orders) || { orders: [] }
    const mainData = useSelector((state: AppState) => state.app.data.data)
    const connected = useSelector((state: WebSocketState) => state.webSocket.connected) 
    const [data, setData] = useState<NewIdType[]>([])
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(JSON.parse(localStorage.getItem(ORDERMODAL)!) || false)
    const location = useLocation()

    console.log(localStorage.getItem(ORDERMODAL))

    const updateData = useCallback(() => {
        if (connected && orders && orders.orders) {
            const newData = orders.orders.map(order => {
                const ingredients = order.ingredients
                    .map(ingredient => mainData.find(item => item._id === ingredient))
                    .filter(Boolean);  
                
                    return {
                    ...order,
                    ingredients,
                };
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

    const handleClick = (details: string) => {
        dispatch(addDetails(details))
        localStorage.setItem(ORDERID, details)
        localStorage.setItem(ORDERMODAL, JSON.stringify(true))
        setIsOpen(true)
        navigate(`/feed/${details}`, { state: {background: location}})
    } 

    const handleClose = () => {
        localStorage.removeItem(ORDERID)
        localStorage.setItem(ORDERMODAL, JSON.stringify(false))
        navigate(`/feed`)
        setIsOpen(false)
    }
    

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

                        const repeatedIngredients: ReactNode[] = []
                        const singleIngredients: ReactNode[] = []

                        uniqueIngredients.forEach((ingredient, ingredientIndex) => {
                            if (!ingredient) return
                            const count = order.ingredients.filter(item => item === ingredient).length

                            if(count > 1) {
                                repeatedIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: 20  - ingredientIndex }}
                                    imageOpacity={{opacity: 0.5}}
                                    count={`+${count}`}/>
                                )
                            } else {
                                singleIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: 20 - ingredientIndex }}/>
                                )
                            }
                        })
                        
                        const ingredients = [...repeatedIngredients, ...singleIngredients]
                        
                        const orderPrice =  order.ingredients.reduce((sum, item) => {
                            if (item) {
                              return sum + item.price;
                            }
                            return sum;
                          }, 0);
                          
                        const date = order.createdAt && new Date(order.createdAt).toLocaleString();
                        
                        return (
                            <Order 
                                key={`${order._id}-${index}`} 
                                orderId={`#${order.number}`} 
                                orderDate={date} 
                                name={order.name} 
                                price={orderPrice} 
                                child={ingredients}
                                onClick={() => {
                                    handleClick(order._id)
                                }}/>)}))}
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
            {isOpen && <Modal handleClose={()=>handleClose()}>
                <OrderDetailsPage/>
            </Modal>}
        </div>
    )

}

export default FeedPage