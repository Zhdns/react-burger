import { useSelector } from "react-redux";
import style from './OrderDetailsPage.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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

function OrderDetailsPage() {

    const order = useSelector((state) => state.orderDetails.order)
    const totalPrice = useSelector((state) => state.orderDetails.orderPrice)
    const date = useSelector((state) => state.orderDetails.date)
    const ingredients = order.ingredients

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

    const {number, name, } = order
    const repeatedIngredients = []
    const singleIngredients = []

    if(ingredients) {
        const uniquIngredients = Array.from(new Set(ingredients))


                    uniquIngredients.forEach((ing) => {
                        const count = ingredients.filter(item => item === ing).length

                        if (count > 1) {
                            repeatedIngredients.push(
                                <Ingredient
                                img={ing.image}
                                name={ing.name}
                                count={count}
                                price={ing.price}/>)
                        } else {
                            singleIngredients.push(
                                <Ingredient
                                img={ing.image}
                                name={ing.name}
                                count={1}
                                price={ing.price}/>)
                        }
                    })
    }

    return (
        <div className={style.shell}>
            <h2 className={`${style.number} text text_type_digits-default`}>{`#${number}`}</h2>
            <h1 className="text text_type_main-medium mb-3">{name}</h1>
            <span className="text text_type_main-small mb-15" 
            style={{color: statusText === 'Выполнен' ? 'rgba(0, 204, 204, 1)' : 'white'}}>
                {statusText}
            </span>
            <h2 className="text text_type_main-default">Состав:</h2>
            <ScrollBarBlock>
            {repeatedIngredients}
            {singleIngredients}
            </ScrollBarBlock>
            <div className={style.info}>
                <p className="text text_type_main-default text_color_inactive">{date}</p>
                <div className={style.price}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage