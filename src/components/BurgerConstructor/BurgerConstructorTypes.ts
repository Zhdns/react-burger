import {ReactNode} from "react";
import { IngredientGlobalType } from "../../utility/types";

export type TotalProps = {
    price: number;
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode
}

export type ProductProps = {
    findIndex: number;
    newId: string | undefined;
    style: string;
    type?: any;
    name: string;
    price: number;
    image: string;
    remove: () => void;
    moveIngredient: (dragId: string, overIndex: number) => void;
    findId: (newId: string) => { index: number };
  };

  export type ConstructorTemplateProps = {
    style: string;
    text: string
  }

  export type StateIngredient = {
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

export type Login = {
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

export type IDraggedItem = {
    ingredient: IngredientGlobalType;
    newId: string; 
  }