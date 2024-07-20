import { createContext, useState } from "react";

export const IngredientsContext = createContext(null);

export default function IngredientProvider( {children}) {
    const [selectedIngredients, setSelectedIngredients] = useState([])
    return(
        <IngredientsContext.Provider value={{selectedIngredients, setSelectedIngredients}} >
            {children}
        </IngredientsContext.Provider>
    )
}