import {ReactNode, RefObject, RefCallback,} from "react";

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
    newId?: string;
}

export type ChildrenType ={
    children: ReactNode;
}

export type Ref = RefObject<HTMLHeadingElement> | RefCallback<HTMLHeadingElement> | null;


export type OrderProps = { 
    status?: string;
    onClick: (props: OrderProps) => void;
    orderId: string; 
    orderDate: string;
    name: string;
    child: ReactNode;
    price: number;
}

export type IngredientPictureProps = {
    style: React.CSSProperties;
    img: string;
    imageOpacity?: React.CSSProperties;
    count?: string;
    key?: string;
}

export type OrderType = {
    _id: string;
    ingredients: string[];
    status: 'done' | 'pending' | 'created'; 
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  };

export type WebSocketState = { 
    webSocket: {
        orders: {
            success: false,
            orders: OrderType[],
            total: number,
            totalToday: number,
        },
        connected: false,
    }
}

export   type AppState = {
    app: {
        data : {
            data: IngredientGlobalType[]
    }
        }
        
}

export type NewIdType = {
    ingredients: (IngredientGlobalType | undefined)[];
    _id: string;
    status: "done" | "pending" | "created";
    number?: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}


export type IsLogin = { 
    isLogin: {
        isLogin: boolean;
        user: {
            name: string | '' ; 
            email: string | '' ;
        }
        resetPasswordState: boolean;
        isModal: boolean;
        error: any;
    }
}
