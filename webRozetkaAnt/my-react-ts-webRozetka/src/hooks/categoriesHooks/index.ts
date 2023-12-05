import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {useEffect, useState} from "react";
import {getCategories, getCategoryById} from "store/categories/categories.actions.ts";
import {ICategoryItem} from "interfaces/categories";
import {useNavigate} from "react-router-dom";

export const useCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.items);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return categories;
}

export const useCategory = (id: number) => {
    const dispatch = useAppDispatch();
    const [categoryItem, setCategoryItem] = useState<ICategoryItem | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(getCategoryById(id));
                const data = res.payload as ICategoryItem;
                if (!data) {
                    throw new Error('Невірний id категорії!');
                }
                setCategoryItem(data);
            } catch (error) {
                navigate('/categories/all')
            }
        };
        fetchData();
    }, [id, dispatch]);

    return categoryItem;
};