import { EmailInput, Input, ShowIcon, HideIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState, useEffect, useRef } from 'react';
import '../styles.css'
import style from './ProfileFeedPage.module.css'
import { Link, useNavigate, useLocation, NavLink} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {TOKEN, REFRESH_TOKEN, ORDERID, ORDERMODAL} from "../../utils/constants";
import { authorization, setUser, resetPasswordAction, setUserEmail, setUserName, logout, editProfile, updateToken } from "../../services/isLogin";
import { wsConnecting } from "../../services/middlewareReducer";
import loader from '../../images/loader.gif'
import { addDetails } from "../../services/orderDetails-slice";
import Modal from "../../components/Modal/Modal";
import OrderDetailsPage from "../OrderDetailPage/OrderDetailsPage";


function Nav(props) { 
    return (
    <div >
        <div className={style.navProfile}>
        <NavLink  to='/profile' className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'} end>
            <p className="text text_type_main-medium">Профиль</p>
        </NavLink>
        <NavLink to='/profile/orders ' className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'}>
        <p className="text text_type_main-medium">История заказов</p>
        </NavLink>
        <NavLink  to='/login' onClick={props.logout} className={({isActive}) => isActive ? 'buttonProfileActive' : 'buttonProfile'}>
        <p className="text text_type_main-medium ">Выход</p>
        </NavLink>
        </div>
        <p className={`${style.subProfile} text text_type_main-default`} >
            В этом разделе вы можете
            изменить свои персональные данные
        </p>    
    </div>
)}


function Order(props) {
    let statusText 

    if(props.status === 'done') {
        statusText ='Выполнен'
    } else if (props.status === 'pending') {
        statusText = 'Готовится'
    } else if (props.status === 'created') {
        statusText = 'Создан'
    } else {
        statusText = ''
    }


    return (
        <div className={style.order}  onClick={() => { props.onClick(props)}}>
            <div className={style.orderInfo}>
                <p className="text text_type_digits-default">{props.orderId}</p>
                <p className="text text_type_main-small text_color_inactive">{props.orderDate}</p>
            </div>
            <h2 className={`text ${style.orderName} text_type_main-medium`}>
                {props.name}
            </h2>
            <h3 className="text text_type_main-default pl-6 mt-4" style={{color: statusText === 'Выполнен' ? 'rgba(0, 204, 204, 1)' : 'white'}}>{statusText}</h3>
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



    function Loader() {
        return (
            <img src={loader} className={style.loader}/>
        )
    }

function ProfileFeedPage() { 
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const orders = useSelector((state) => state.webSocket.orders)
    const mainData = useSelector((state) => state.app.data)
    const connected = useSelector(state => state.webSocket.connected) 
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(JSON.parse(localStorage.getItem(ORDERMODAL)) || false)
    const location = useLocation()



    const handleSubmit = async () => {
        const bodyData = {
            token: localStorage.getItem(REFRESH_TOKEN)
        }
        try {
            await dispatch(logout(bodyData)).unwrap()
            navigate('/login')
        } catch (error) {
            console.error("Error:", error)
        } 
    }

    



    useEffect(() => {
        if (connected) {
            // const newData = orders.orders.map(order => {
            //     const ingredients = order.ingredients.map(ingredient => {
            //         return mainData.find(item => item._id === ingredient)
            //     })
    
            //     return {
            //         ...order,
            //         ingredients,
            //     }
            // })
            // const refreshToken = localStorage.getItem(REFRESH_TOKEN)
            // dispatch(updateToken(refreshToken))
            const newData = orders && orders.orders.map(order => {
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
            // const refreshToken = {
            //     token: localStorage.getItem(REFRESH_TOKEN)
            // }
            // console.log(refreshToken)
            // dispatch(updateToken(refreshToken))
            let token = localStorage.getItem(TOKEN)
            token = token.replace('Bearer ', '')
            let url = `wss://norma.nomoreparties.space/orders?token=${token}`
            dispatch(wsConnecting(url))
        }
        

    }, [orders])

    const handleClick = (details) => {
        dispatch(addDetails(details))
        localStorage.setItem(ORDERID, details)
        localStorage.setItem(ORDERMODAL, JSON.stringify(true))
        setIsOpen(true)
        navigate(`/profile/orders/${details}`, { state: {background: location}})
    } 

    const handleClose = () => {
        localStorage.removeItem(ORDERID)
        localStorage.setItem(ORDERMODAL, JSON.stringify(false))
        navigate(`/profile/orders`)
        let token = localStorage.getItem(TOKEN)
        token = token.replace('Bearer ', '')
        const url = `wss://norma.nomoreparties.space/orders?token=${token}`
        dispatch(wsConnecting(url))
        setIsOpen(false)
    }
    



    return (
        <div className={style.main}>
            <div className={style.feed}>
                    <ScrollBarBlock>
                    {!connected ? 
                    (<Loader/>) : 
                    (data && [...data].reverse().map((order, index) => {
                        const uniqueIngredients = Array.from(new Set(order.ingredients))

                        const repeatedIngredients = []
                        const singleIngredients = []

                        uniqueIngredients.forEach((ingredient, ingredientIndex) => {
                            const count = order.ingredients.filter(item => item === ingredient).length

                            if(count > 1) {
                                repeatedIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: 20 -ingredientIndex }}
                                    imageOpacity={{opacity: 0.5}}
                                    count={`+${count}`}/>
                                )
                            } else {
                                singleIngredients.push (
                                    <IngredientPicture key={`${ingredient._id}`} 
                                    img={ingredient.image} 
                                    style={{ zIndex: 20 -ingredientIndex }}/>
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
                                status={order.status}
                                onClick={() => {
                                    handleClick(order._id)
                                }}
                            />
                        )
                    }))}
                    </ScrollBarBlock> 
                    <Nav logout={() => handleSubmit()}/>
                </div>
                {isOpen && <Modal handleClose={()=>handleClose()}>
                <OrderDetailsPage/>
                    </Modal>}
        </div>
    )
}

export default ProfileFeedPage