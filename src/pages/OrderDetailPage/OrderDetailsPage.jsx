import { useDispatch, useSelector } from "react-redux";
import style from './OrderDetailsPage.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loader from '../../images/loader.gif'
import { wsConnecting } from "../../services/middlewareReducer";

function ScrollBarBlock(props) {
    return (
        <div className={`${style.scrollBar} mb-10`}>
            {props.children}
        </div>
    )
}

function Ingredient(props) { 
    return (
        <div className={style.ingredient}>
        <div className={style.ingredientInfo}>
            <img className={style.img} src={props.img} alt={props.name}/>
            <h2 className={` ${style.ingredientName} text text_type_main-default`}>{props.name}</h2>
        </div>
        <div className={style.price}>
            <h2 className="text text_type_digits-default">{props.count + ' x ' + props.price}</h2>
            <CurrencyIcon type="primary"/>
        </div>
    </div> 
    )
}

function Loader() {
    return (
        <img src={loader}  className={style.loader}/>
    )
}

function OrderDetailsPage() {


    const connected = useSelector(state => state.webSocket.connected) 

    const idModal = useSelector((state) => state.orderDetails.id)
    const {id} = useParams()
    //console.log(`modal: ${idModal}, params: ${id}`)
    const [data, setData] = useState([])
    const orders = useSelector((state) => state.webSocket.orders.orders) || [];
    const order = orders.find(order => order._id === idModal || id) || { order: {} };
    const ingredients = order.ingredients || null
    const mainData = useSelector((state) => state.app.data)


    useEffect(() => {
        if (connected) {
                const newData = ingredients.map(ingredient => mainData.find(item => item._id === ingredient))
                setData(newData)
                
        }
        },[ingredients])

    

    let statusText 

    if(order.status === 'done') {
        statusText ='Выполнен'
    } else if (order.status === 'pending') {
        statusText = 'Готовится'
    } else if (order.status === 'created') {
        statusText = 'Создан'
    } else {
        statusText = ''
    }




    const {number, name } = order || {number: '', name: ''};
    const repeatedIngredients = []
    const singleIngredients = []
    const orderPrice =  data.reduce((sum, item) => sum + item.price, 0)
    const date = order.createdAt && new Date(order.createdAt).toLocaleString();

    if(order) {
        const uniquIngredients = Array.from(new Set(data))
        

                    uniquIngredients.forEach((ing) => {
                        const count = ingredients.filter(item => item === ing).length

                        if (count > 1) {
                            repeatedIngredients.push(
                                <Ingredient
                                key={ing._id}
                                img={ing.image}
                                name={ing.name}
                                count={count}
                                price={ing.price}/>)
                        } else {
                            singleIngredients.push(
                                <Ingredient
                                key={ing._id}
                                img={ing.image}
                                name={ing.name}
                                count={1}
                                price={ing.price}/>)
                        }
                    })
    }


    return (
        <div className={style.shell}>
            {!connected ? <Loader/> :
            <div className={style.shell}>
            <h2 className={`${style.number} text text_type_digits-default`}>{`#${number}`}</h2>
            <h1 className="text text_type_main-medium mb-3">{name}</h1>
            <span className="text text_type_main-small mb-15" 
            style={{color: statusText === 'Выполнен' ? 'rgba(0, 204, 204, 1)' : 'white'}}>
                {'Выполнен'}
            </span>
            <h2 className="text text_type_main-default">Состав:</h2>
            <ScrollBarBlock>
            {repeatedIngredients && repeatedIngredients}
            {singleIngredients && singleIngredients}
            </ScrollBarBlock>
            <div className={style.info}>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{orderPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            </div>}
        </div>
            
        
    )
}

export default OrderDetailsPage