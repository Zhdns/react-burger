import { IngredientGlobalType } from '../../utility/types';

export type TitleType = {
    text: string; 
    className?: string;
}

export type SecondTitleType = {
    text: string;
    id: string;
    setCurrent: (id: string) => void;
}

export type ProductType = {
    item: IngredientGlobalType;
    onIngredientClick: (props: ProductType) => void;
    count: number;
    image: string;
    alt: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    price: number;
    name: string;
}

export const itemTypes = {
    INGREDIENT: 'ingredient',
    MAIN: 'main'
}

export type RootState = {
    app: {
        data: IngredientGlobalType[];
    };
    cart: { 
        cart:{ 
            main: IngredientGlobalType[];
            bun: IngredientGlobalType[];
        };
    }

}

export type AppState = {
    app: {
        data: {
            succses: boolean;
            data: IngredientGlobalType[]
        }
    }
}