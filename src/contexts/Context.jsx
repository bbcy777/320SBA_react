import { createContext } from "react";

export const IngredientsContext = createContext(null);

export default function IngredientProvider( {children, ingredient}) {
    return(
        <IngredientsContext.Provider value={ingredient} >
            {children}
        </IngredientsContext.Provider>
    )
}