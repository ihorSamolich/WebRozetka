import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {useEffect} from "react";
import {getCategories} from "store/categories/categories.actions.ts";
export const useCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.items);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    return categories;
}

