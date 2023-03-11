import  Style  from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';

function App() {
  return (
    <div>
      <AppHeader/>
      <div className={Style.burgerConstructor}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
    </div>
  );
}

export default App;
