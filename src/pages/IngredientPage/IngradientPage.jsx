import { useSelector } from 'react-redux';
import style from './ingredientPage.module.css'
import { useParams } from 'react-router-dom';



function IngerdienPage() {

    const {id} = useParams()

    const ingredient = useSelector((state) => state.app.data.find(ing => ing._id === id))
    console.log(ingredient)

    if (!ingredient) {
        return null;
    }

    const {image, name ,calories, proteins, fat, carbohydrates} = ingredient

    return (
        <div className={style.shell}>
            <h1 className={style.mainTitle}>Детали ингредиента</h1>
            <div className={style.main}>
                <img src={image} className={style.img} alt={name}/>
                <h3 className={`${style.title} text text_type_main-medium mb-8`}>{name}</h3>
                <div className={style.spec}>
                    <div className={style.calories}>
                        <p className="text text_type_main-default">Калории,ккал</p>
                        <p className="text text_type_digits-default">{calories}</p>
                    </div>
                    <div className={style.calories}>
                        <p className="text text_type_main-default">Белки, г</p>
                        <p className="text text_type_digits-default">{proteins}</p>
                    </div>
                    <div className={style.calories}>
                        <p className="text text_type_main-default">Жиры, г</p>
                        <p className="text text_type_digits-default">{fat}</p>
                    </div>
                    <div className={style.calories}>
                        <p className="text text_type_main-default">Углеводы, г</p>
                        <p className="text text_type_digits-default">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IngerdienPage