import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerIngredients.module.css'
import { TitleType, SecondTitleType, ProductType, itemTypes} from './BurgerIngredientsTypes'
import { RefObject, MutableRefObject, useEffect, RefCallback, ReactNode} from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useDrag, DragSourceMonitor } from 'react-dnd';





type Ref = RefObject<HTMLHeadingElement> | RefCallback<HTMLHeadingElement> | null;
type ChildrenType ={
    children: ReactNode;
}

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
            <div className={style.scrollBar}>
                {children}
            </div>
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



