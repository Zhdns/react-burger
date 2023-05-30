import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import Style  from './HomePage.module.css';
import React from 'react';


function HomePage() { 
    
    return (
        <div className={Style.burgerConstructor}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    )

}


export default HomePage