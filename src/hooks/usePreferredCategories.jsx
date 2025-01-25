import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getInteractions } from '../services/InteractionServices';

export const useSortedCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.user.value);

    const fetchAndSortCategories = useCallback(async () => {
        if (!user?.companyId || !user?.departmentId) return;

        try {
            setIsLoading(true);
            const response = await getInteractions(user.companyId, user.departmentId);
            const sortedCategories = [...response.data.interactions].sort((a, b) => {
                if (b.likes !== a.likes) {
                    return b.likes - a.likes;
                }
                return b.interactionsCounter - a.interactionsCounter;
            });

            setCategories(sortedCategories);
            setError(null);
        } catch (err) {
            setError(err);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }, [user?.companyId, user?.departmentId]);

    useEffect(() => {
        fetchAndSortCategories();
    }, [fetchAndSortCategories]);

    return {
        categories,
        isLoading,
        error,
        refetch: fetchAndSortCategories
    };
};