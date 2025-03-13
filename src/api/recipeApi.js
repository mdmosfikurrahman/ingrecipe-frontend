const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRecipes = async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return response.json();
};
