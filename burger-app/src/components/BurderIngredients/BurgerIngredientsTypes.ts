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
    price: number;
    name: string;
}

export const itemTypes = {
    INGREDIENT: 'ingredient',
    MAIN: 'main'
}