

import useHttp from "../Hooks/useHttp.js";
import Error from "./Error.jsx";
import MealItem from "./MealItem.jsx";

const requestConfig = {}
export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);
    if (isLoading) {
        return <p className="center">Fetching Meals</p>
    };

    if (error) {
        return <Error title='Failed To fetch error' message={error}></Error>
    }


    return <ul id="meals">{loadedMeals.map(meal => <MealItem key={meal.id} meal={meal}></MealItem>)}</ul>
}