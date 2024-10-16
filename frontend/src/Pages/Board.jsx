import React, { useState, useEffect } from 'react';
import Card from '../components/homepage_components/Card.jsx';
import Search from '../components/homepage_components/Search.jsx';
import '../components/homepage_components/index.css';
import addIcon from '../components/homepage_components/assets/add_icon.png';

function App() {
  // State for managing cards in both columns
  const [todoCards, setTodoCards] = useState([]);
  const [todoCardsNumber, setTodoCardsNumber] = useState(0);
  const [inProgressCards, setInProgressCards] = useState([]);
  const [inProgressCardsNumber, setInProgressCardsNumber] = useState(0);

  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  // Load "To do" and "In Progress" cards from localStorage on component mount
  useEffect(() => {
    const storedTodoCards = [];
    const storedTodoCardsNum = Number(localStorage.getItem('to-do-cards-number') || 0);

    for (let i = 0; i < storedTodoCardsNum; i++) {
      const card = JSON.parse(localStorage.getItem(`card-to-do-${i}`));
      if (card) {
        storedTodoCards.push(card);
      }
    }
    setTodoCards(storedTodoCards);
    setTodoCardsNumber(storedTodoCardsNum);

    // Load "In progress" cards from localStorage
    const storedInProgressCards = [];
    const storedInProgressCardsNum = Number(localStorage.getItem('in-progress-cards-number') || 0);

    for (let i = 0; i < storedInProgressCardsNum; i++) {
      const card = JSON.parse(localStorage.getItem(`card-in-progress-${i}`));
      if (card) {
        storedInProgressCards.push(card);
      }
    }
    setInProgressCards(storedInProgressCards);
    setInProgressCardsNumber(storedInProgressCardsNum);
  }, []);

  // Filter cards based on search query
  const filteredTodoCards = todoCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInProgressCards = inProgressCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to add a new card in the "To do" column
  const addTodoCard = () => {
    const newCard = { title: 'New Task', text: 'New Description', category: 'TSD-15' };
    const updatedTodoCards = [...todoCards, newCard];

    setTodoCards(updatedTodoCards);
    setTodoCardsNumber((prevNumber) => {
      const newNumber = prevNumber + 1;
      localStorage.setItem(`card-to-do-${newNumber - 1}`, JSON.stringify(newCard));
      localStorage.setItem('to-do-cards-number', newNumber);
      return newNumber;
    });
  };

  // Function to add a new card in the "In progress" column
  const addInProgressCard = () => {
    const newCard = { title: 'New In Progress Task', text: 'New In Progress Description', category: 'TSD-15' };
    const updatedInProgressCards = [...inProgressCards, newCard];

    setInProgressCards(updatedInProgressCards);
    setInProgressCardsNumber((prevNumber) => {
      const newNumber = prevNumber + 1;
      localStorage.setItem(`card-in-progress-${newNumber - 1}`, JSON.stringify(newCard));
      localStorage.setItem('in-progress-cards-number', newNumber);
      return newNumber;
    });
  };

  return (
    <>
      <div>
        <h1 className="main-heading">Welcome back</h1>
      </div>
      {/* Pass the search handler to Search component */}
      <Search onSearch={setSearchQuery} />
      <div className="projects-div">
        {/* To do column */}
        <div className="column-div">
          <h2 className="column-name">To do</h2>

          {/* Dynamically render the cards in "To do" column, filtered by search query */}
          {filteredTodoCards.map((card, index) => (
            <Card key={index} title={card.title} text={card.text} category={card.category} cardId={`to-do-${index}`} />
          ))}

          <div className="add-task-div">
            <button className="add-task-button" onClick={addTodoCard}>
              <img src={addIcon} alt="add task button" height="25px" />
            </button>
          </div>
        </div>

        {/* In progress column */}
        <div className="column-div">
          <h2 className="column-name">In progress</h2>

          {/* Dynamically render the cards in "In progress" column, filtered by search query */}
          {filteredInProgressCards.map((card, index) => (
            <Card key={index} title={card.title} text={card.text} category={card.category} cardId={`in-progress-${index}`} />
          ))}

          {/* Add a button to add cards dynamically */}
          <div className="add-task-div">
            <button className="add-task-button" onClick={addInProgressCard}>
              <img src={addIcon} alt="add task button" height="25px" />
            </button>
          </div>
        </div>

        {/* Other columns */}
        <div className="column-div">
          <h2 className="column-name">Ready to test</h2>
          <Card title="abcd" text="asggasjghsaj" cardId={'ready-to-test-0'} />
        </div>
        <div className="column-div">
          <h2 className="column-name">Blocked</h2>
          <Card cardId={'blocked-0'} />
        </div>
        <div className="column-div">
          <h2 className="column-name">Done</h2>
          <Card cardId={'Done-0'} />
        </div>
      </div>
    </>
  );
}

export default App;
