import { IngredientGlobalType } from "../../utility/types";

export type Cart = {
    cart: {
        orderNumber: number | string;
    cart: {
        bun: IngredientGlobalType[];
        main: IngredientGlobalType[];
    };
    error: any;
}
    }
    