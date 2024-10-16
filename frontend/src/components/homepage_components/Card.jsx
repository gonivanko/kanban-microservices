import React, { useState, useEffect } from 'react';
import moveIcon from './assets/move_icon.png';

function Card({ title="Time tracking", text="Work in department", category="TSD-15", cardId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [cardTitle, setCardTitle] = useState(title);
    const [cardText, setCardText] = useState(text);
    const [cardCategory, setCardCategory] = useState(category);

    // Load card data from localStorage when the component mounts
    useEffect(() => {
        const savedCard = JSON.parse(localStorage.getItem(`card-${cardId}`));
        if (savedCard) {
            setCardTitle(savedCard.title);
            setCardText(savedCard.text);
            setCardCategory(savedCard.category);
        }
    }, [cardId]);

    // Save the card data to localStorage
    const saveChanges = () => {
        const updatedCard = {
            title: cardTitle,
            text: cardText,
            category: cardCategory
        };

        // Save to localStorage
        localStorage.setItem(`card-${cardId}`, JSON.stringify(updatedCard));
        setIsEditing(false);
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="card" id={cardId}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        className="card-title-input"
                    />
                    <textarea
                        value={cardText}
                        onChange={(e) => setCardText(e.target.value)}
                        className="card-text-input"
                    />
                    <input
                        type="text"
                        value={cardCategory}
                        onChange={(e) => setCardCategory(e.target.value)}
                        className="card-category-input"
                    />
                    <button onClick={saveChanges}>Save</button>
                </>
            ) : (
                <>
                    <h4 onClick={toggleEditMode}>{cardTitle}</h4>
                    <p className="card-text" onClick={toggleEditMode}>
                        {cardText}
                    </p>
                    <div className="card-group">
                        <div className="card-category" onClick={toggleEditMode}>
                            {cardCategory}
                        </div>
                        {/* <div className="card-move">
                            <button className="move-button">
                                <img src={moveIcon} alt="move icon" height="25px" />
                            </button>
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
