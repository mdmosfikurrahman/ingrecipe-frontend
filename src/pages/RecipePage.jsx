import { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipeApi";
import "../styles/RecipePage.css";

const RecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);

    useEffect(() => {
        fetchRecipes()
            .then(data => setRecipes(data.data))
            .catch(error => console.error(error));
    }, []);

    const openModal = (recipe, section) => {
        setSelectedRecipe(recipe);
        setExpandedSection(section);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
        setExpandedSection(null);
    };

    return (
        <div className="recipe-container">
            <h1 className="title">🍽️ Explore Delicious Recipes</h1>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <div className="recipe-header">
                            <h2 className="recipe-title">{recipe.title}</h2>
                            <span className="rating">⭐ {recipe.rating.toFixed(1)}</span>
                        </div>
                        <p className="recipe-description">{recipe.description}</p>
                        <div className="expand-buttons">
                            <button onClick={() => openModal(recipe, 'ingredients')}>🥦 Ingredients</button>
                            <button onClick={() => openModal(recipe, 'instructions')}>📝 Instructions</button>
                            <button onClick={() => openModal(recipe, 'comments')}>💬 Comments</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedRecipe && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>❌ Close</button>
                        <h2 className="modal-title">{selectedRecipe.title} - {expandedSection}</h2>
                        <div className="modal-body">
                            {expandedSection === 'ingredients' && (
                                <ul className="ingredients-list">
                                    {selectedRecipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>✅ {ingredient}</li>
                                    ))}
                                </ul>
                            )}
                            {expandedSection === 'instructions' && (
                                <p className="instructions">{selectedRecipe.instructions}</p>
                            )}
                            {expandedSection === 'comments' && (
                                <ul className="comments-list">
                                    {selectedRecipe.comments.map((comment, index) => (
                                        <li key={index} className="comment">
                                            <strong>{comment.name}:</strong> {comment.content}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipePage;