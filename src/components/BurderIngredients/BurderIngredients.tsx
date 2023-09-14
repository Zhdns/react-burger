import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.css'
import { TitleType, SecondTitleType, ProductType, itemTypes, RootState, AppState} from './BurgerIngredientsTypes'
import { RefObject, MutableRefObject, useEffect, RefCallback, useState} from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { IngredientGlobalType } from '../../utility/types';
import { INGREDIENTMODAL, IDFORMODAL } from '../../utility/constants';
import Modal from '../Modal/Modal'
import IngredientsDetails from '../IngredientsDetails/IngredientsDetails';
import { showDetails } from '../../services/ingredientDetails-slice';
import { ChildrenType, Ref } from '../../utility/types';





const  Title = ({text} : TitleType) => {
    return (
        <h1 className={`${style.title} text text_type_main-large mb-5`}> {text} </h1>
    )}
    
const SecondTitle = React.forwardRef<HTMLHeadingElement, SecondTitleType>(({text, id, setCurrent}, ref: Ref) => {
    const [innerRef, inView] = useInView ({
        threshold: 1
    });

    useEffect(() => {
        if(inView) {
            setCurrent(id)
        }
    }, [inView, setCurrent, id]);

    const combinedRef = (i: HTMLHeadingElement | null) => {
        innerRef(i);
        if (ref) {
            if (typeof ref === 'function') {
                (ref as RefCallback<HTMLHeadingElement>)(i);
            } else {
                (ref as MutableRefObject<HTMLHeadingElement | null>).current = i;
            }
        }
    };

    return (
    <h2 className={`${style.secondTitle} text text_type_main-medium`} ref={combinedRef} id={id}>
        {text}
    </h2>
    );
});
    
const ScrollBarBlock = ({children} : ChildrenType) => {
    return ( 
        <div className={style.scrollBar}>
            {children}
        </div>    
    )
}

const List = ({children} : ChildrenType) => {
    return (
        <ol className={style.list}>
            {children}
        </ol>
        )
}

const Product = (props: ProductType) => {
    const ingredient = props.item

    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemTypes.INGREDIENT,
        item: { ingredient },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
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

    const [current, setCurrent] = React.useState<string>('Булки');
    const [bun, setBun] = React.useState<IngredientGlobalType[]>([]);
    const [main, setMain] = React.useState<IngredientGlobalType[]>([]);
    const [sauce, setSauce] = React.useState<IngredientGlobalType[]>([]);
    // const [onOpen, setOnOpen] = React.useState<boolean>(JSON.parse(localStorage.getItem(INGREDIENTMODAL) || "false"));
    const [onOpen, setOnOpen] = React.useState<boolean>(false);
    const data = useSelector((state: AppState) => state.app.data.data);
    const items = useSelector((state: RootState) => state.cart.cart.main);
    const bunItems = useSelector((state: RootState) => state.cart.cart.bun);
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const location = useLocation()     
    const bunRef = React.useRef<any>(null);
    const sauceRef = React.useRef<any>(null);
    const mainRef = React.useRef<any>(null);

    // useEffect(() => {
    //     console.log(data)
    //     const bun = data.filter(item => item.type === 'bun')
    //     const main = data.filter(item => item.type === 'main')
    //     const sauce = data.filter(item => item.type === 'sauce')
    //     setBun(bun)
    //     setMain(main)
    //     setSauce(sauce)   
    //     }, [ data])

    useEffect(() => {
        if (Array.isArray(data)) {
          console.log(data);
          const bun = data.filter(item => item.type === 'bun');
          const main = data.filter(item => item.type === 'main');
          const sauce = data.filter(item => item.type === 'sauce');
          setBun(bun);
          setMain(main);
          setSauce(sauce);
          console.log(bun)
        }
      }, [data]);

        const handleTabClick = (value: string, sectionRef: React.RefObject<HTMLHeadingElement>) => { 
            setCurrent(value);
            if (sectionRef.current) {
              sectionRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }

          const togglePopup = (ingredient: IngredientGlobalType) => {

            console.log('isToggle')
            dispatch(showDetails(ingredient._id))
            localStorage.setItem(IDFORMODAL, ingredient._id)
            setOnOpen(true)
            localStorage.setItem(INGREDIENTMODAL, JSON.stringify(true))
            navigate(`/ingredients/${ingredient._id}`, { state: {background: location}}) 
        }

        const handleClosePopup = () => {
            console.log('modalIsClosed')
            localStorage.setItem(INGREDIENTMODAL, JSON.stringify(false))
            setOnOpen(false)
            localStorage.removeItem(IDFORMODAL)
            navigate(`/`)
        }

        const calculateCount = (items: IngredientGlobalType[], id: string) => {
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
            {/* <IngredientsDetails/> */}
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
            { onOpen && <Modal title={'Детали ингредиента'}  handleClose={()=>handleClosePopup()}>
                <IngredientsDetails />
            </Modal>}
        </div>
    )
}



export default BurgerIngredients