import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.css'
// import { TitleInterFace } from './BurgerIngredientsTypes'



type Titletype = {
    text: string; 
}

const  Title = ({text}: TitleType) => (
        <h1 className={`${style.title} text text_type_main-large mb-5`}> {text} </h1>

    )
