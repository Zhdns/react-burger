import { type } from '@testing-library/user-event/dist/type'
import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import style from './BurgerIngredients.module.css'
import { data } from '../../utils/data.js'




function Title(props) {
    return (
        <h1 className={`${style.title} text text_type_main-large mb-5`}>{props.text}</h1>
    )
}

function SecondTitle(props) {
    return (
    <h2 className={`${style.secondTitle} text text_type_main-medium`}>{props.text}</h2>
    )
}


function ScrollBarBlock(props) {
    return (
        <div className={style.scrollBar}>
            {props.children}
        </div>
    )
}

function List(props) {
    return (
    <ol className={style.list}>
        {props.children}
    </ol>
    )
}

function Product(props) {
    return (
    <li className={style.product} >
        <div className={style.counter}>
        <Counter count={1} size="default" />
        </div>
        <img className={style.productImage} src={props.image}></img>
        <div className={`${style.productPrice} text text_type_main-medium`}>
            <span className={style.price}>{props.price}</span>
            <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
        <p className={`${style.productName} text text_type_main-default`}>{props.name}</p>
    </li>
    )
}


class BurgerIngredients extends React.Component {
    
        state = {
            current:'Булки',
            bun: [],
            main: [],
            sauce: [],
        } 
    

    
    componentDidMount() {
                const bun = data.filter(item => item.type === 'bun')
                const main = data.filter(item => item.type === 'main')
                const sauce = data.filter(item => item.type === 'sauce')
                this.setState({bun, main, sauce})
    }

    setCurrent = (value) => { 
        this.setState({ current: value });
    }

    render() {
        const {bun, main, sauce} = this.state
    
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '600px',
            margin: ' 0 auto',
        }}>
            <Title text="Соберите бургер"/>
            <div style={{ display: 'flex', marginBottom: '40px'}}>
                <Tab value="Булки" active={this.state.current === 'Булки'} onClick={this.setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={this.setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={this.setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ScrollBarBlock>
                <SecondTitle text="Булки"/>
                <List>
                    {bun && bun.map(item => (
                        <Product key={item._id}  image={item.image} price={item.price} name={item.name}/>
                    ))}
                </List>
                <SecondTitle text="Соусы"/>
                <List>
                    {sauce && sauce.map(item => (
                        <Product key={item._id}  image={item.image} price={item.price} name={item.name}/>
                    ))}
                </List>
                <SecondTitle text="Начинки"/>
                <List>
                {main && main.map(item => (
                    <Product key={item._id}  image={item.image} price={item.price} name={item.name}/>
                ))}
                </List>
            </ScrollBarBlock>
        </div>
    )
}
}

export default BurgerIngredients 
