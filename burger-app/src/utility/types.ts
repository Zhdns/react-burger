type ListOfIngedientsId = string[]
interface SingleRecivedOrder {
    _id: string;
    ingredients: ListOfIngedientsId;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}


export interface MultipleReceivedOrders {
    success: boolean;
    orders: SingleRecivedOrder[];
    total: number;
    totalToday: number;
}

export interface IngredientGlobalType {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}


