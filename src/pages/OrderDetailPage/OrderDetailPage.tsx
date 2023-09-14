import { useDispatch, useSelector } from "react-redux";
import style from './OrderDetailPage.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import loader from '../../images/loader.gif'
import { wsConnecting } from "../../services/middlewareReducer";
import { IngredientGlobalType } from "../../utility/types";
import { ChildrenType, WebSocketState, AppState, OrderType } from "../../utility/types";
import { DetailsState, IngredientProps } from "./OrderDetailPageTypes";



function ScrollBarBlock(props: ChildrenType) {
    return (
        <div className={`${style.scrollBar} mb-10`}>
            {props.children}
        </div>
    )
}

function Ingredient(props:IngredientProps) { 
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


    const connected = useSelector((state: WebSocketState) => state.webSocket.connected)  
    const idModal = useSelector((state: DetailsState) => state.orderDetails.id)
    const {id} = useParams()
    const [data, setData] = useState<IngredientGlobalType[]>([])
    const orders = useSelector((state: WebSocketState) => state.webSocket.orders.orders) || [];
    const [order, setOrder] = useState<OrderType | null>(null)
    const [ingredients, setIngredients] = useState<string[]>([])
    const mainData = useSelector((state: AppState) => state.app.data.data)


    
    useEffect(() => {
        if (connected) {
            const order: OrderType | null = orders?.find(order => order._id === idModal || id) || null;

            setOrder(order!)

            const ingredients = (order as OrderType).ingredients || null

            setIngredients(ingredients)

            const newData = ingredients.flatMap(ingredient => 
                mainData.filter(item => item._id === ingredient)
            );
            

            setData(newData);
                
        }
        },[ingredients, orders])



    

        let statusText = '';

        if (order !== null) {
        if ('status' in order) {
            if(order.status === 'done') {
            statusText ='Выполнен';
            } else if (order.status === 'pending') {
            statusText = 'Готовится';
            } else if (order.status === 'created') {
            statusText = 'Создан';
            }
        } else {
            statusText = '';
        }
        }


        let number = order?.number ?? '';
        let name = order?.name ?? '';

        if (order !== null) {
            ({ number, name } = order as OrderType);
          }

        
    const repeatedIngredients: React.ReactNode[] = []
    const singleIngredients: React.ReactNode[] = []
    const orderPrice =  data.reduce((sum, item) => sum + item.price, 0)
    const date = order ? new Date(order.createdAt).toLocaleString() : null;


    if(order) {
        const uniquIngredients = Array.from(new Set(data))
        

                    uniquIngredients.forEach((ing) => {
                        const count = ingredients.filter(item => item === ing._id).length

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