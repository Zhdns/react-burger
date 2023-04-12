import {Icons, Logo, Box, Typography, BurgerIcon, ListIcon, ProfileIcon, CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useEffect} from 'react'
import style from './BurgerIngredients.module.css'
import IngredientsDetails from '../IngredientDetails/IngredientDetails.jsx';
import Modal from '../Modal/Modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { showDetails } from '../../services/ingredientDetails-slice';
import { useDrag } from 'react-dnd/dist/hooks/index.js';
import { itemTypes } from '../../utils/types.js';
import { useInView } from 'react-intersection-observer';



function Title(props) {
    return (
        <h1 className={`${style.title} text text_type_main-large mb-5`}>{props.text}</h1>
    )
}

const SecondTitle = React.forwardRef(({text, id, setCurrent}, ref) => {
    const [innerRef, inView] = useInView ({
        threshold: 1
    })

    useEffect(() => {
        if(inView) {
            setCurrent(id)
        }
    }, [inView, setCurrent, id])

    const combinedRef = (i) => {
    innerRef(i);
        if (ref) {
            if (typeof ref === 'function') {
            ref(i);
        } else {
            ref.current = i;
        }
        }
    };

    return (
    <h2 className={`${style.secondTitle} text text_type_main-medium`} ref={combinedRef} id={id}>
        {text}
    </h2>
    );
});

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

    const ingredient = props.item

    const [{isDragging}, drag] = useDrag(() => ({ 
        type: itemTypes.INGREDIENT, 
        item: {ingredient},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const opacity = isDragging ? 0.4 : 1;

    return (
    <li className={style.product} onClick={() => props.onIngredientClick(props)} ref={drag} style={{opacity}} >
        <div className={style.counter}>
        <Counter count={props.count} size="default" />
        </div>
        <img className={style.productImage} src={props.image} alt={props.alt}></img>
        <div className={`${style.productPrice} text text_type_main-medium`}>
            <span className={`${style.price} text_type_digits-default`}>{props.price}</span>
            <CurrencyIcon type='primary'></CurrencyIcon>
        </div>
        <p className={`${style.productName} text text_type_main-default`}>{props.name}</p>
    </li>
    )
}


function BurgerIngredients() {
    const [current, setCurrent] = React.useState('Булки');
    const [bun, setBun] = React.useState([]);
    const [main, setMain] = React.useState([]);
    const [sauce, setSauce] = React.useState([]);
    const [onOpen, setOnOpen] = React.useState(false)
    const data = useSelector((state) => state.app.data)
    const items = useSelector((state) => state.cart.cart.main)
    const bunItems = useSelector((state) => state.cart.cart.bun)
    const dispatch = useDispatch()
    
    const bunRef = React.useRef()
    const mainRef = React.useRef()
    const sauceRef = React.useRef()   


    useEffect(() => {
                const bun = data.filter(item => item.type === 'bun')
                const main = data.filter(item => item.type === 'main')
                const sauce = data.filter(item => item.type === 'sauce')
                setBun(bun)
                setMain(main)
                setSauce(sauce)
                
    }, [ data])

    const handleTabClick = (value, sectionRef) => { 
        setCurrent(value);
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }


    const togglePopup = (ingredient) => {
        dispatch(showDetails(ingredient))
        setOnOpen(true)
        
    }


    const calculateCount = (items, id) => {
        return items.filter((item) => item._id === id).length 
}



    

    return(
        <div className={style.main} >
            <Title text="Соберите бургер"/>
            <div className={style.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={() => handleTabClick('Булки', bunRef)}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleTabClick('Соусы', sauceRef)}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleTabClick('Начинки', mainRef)}>
                    Начинки
                </Tab>
            </div>
            <ScrollBarBlock>
                <SecondTitle text="Булки" id="Булки" ref={bunRef} setCurrent={setCurrent}/>
                <List>
                    {bun && bun.map(item => (
                        <Product key={item._id}
                        item={item} 
                        image={item.image} 
                        price={item.price} 
                        name={item.name} 
                        alt={item.name} 
                        calories={item.calories}
                        proteins={item.proteins}
                        fat={item.fat}
                        carbohydrates={item.carbohydrates}
                        count={calculateCount(bunItems, item._id) * 2}
                        onIngredientClick={() => {
                            togglePopup(item)
                        }}/>
                    ))}
                </List>
                <SecondTitle text="Соусы" id="Соусы" ref={sauceRef} setCurrent={setCurrent}/>
                <List>
                    {sauce && sauce.map(item => (
                        <Product key={item._id} 
                        item={item}  
                        image={item.image} 
                        price={item.price} 
                        name={item.name} 
                        alt={item.name}
                        calories={item.calories}
                        proteins={item.proteins}
                        fat={item.fat}
                        carbohydrates={item.carbohydrates}
                        count={calculateCount(items, item._id)}
                        onIngredientClick={() => {
                            togglePopup(item)
                        }}/>
                    ))}
                </List>
                <SecondTitle text="Начинки"  id="Начинки" ref={mainRef} setCurrent={setCurrent}/>
                <List>
                {main && main.map(item => (
                    <Product key={item._id}
                    item={item}   
                    image={item.image} 
                    price={item.price} 
                    name={item.name} 
                    alt={item.name} 
                    calories={item.calories}
                    proteins={item.proteins}
                    fat={item.fat}
                    carbohydrates={item.carbohydrates}
                    count={calculateCount(items, item._id)}
                    onIngredientClick={() => {
                        togglePopup(item)
                    }}/>
                ))}
                </List>
            </ScrollBarBlock>
            { onOpen && <Modal title={'Детали ингредиента'}  handleClose={()=>setOnOpen(false)}>
                <IngredientsDetails />
            </Modal>}
        </div>
    )
}

export default BurgerIngredients 



