import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurderIngredients/BurderIngredients';
import Style  from './HomePage.module.css';



function HomePage() { 
    
    return (
        <div className={Style.burgerConstructor}>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </div>
    )

}


export default HomePage