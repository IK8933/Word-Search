import  { useState } from 'react';

const WordSearch = ({ scienceCategory, apiUrl }) => {
const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from the API
const fetchSuggestions = async (term) => {
    if (term.length < 3) {
    setSuggestions([]);
      return; // Only fetch when term has 3 or more characters
    }

    try {
    const response = await fetch(`${apiUrl}/only-words?category=${scienceCategory}&term=${term}`);
    const data = await response.json();
      setSuggestions(data.suggestions || []); // Adjust based on API response structure
    } catch (error) {
    console.error('Error fetching suggestions:', error);
    }
};

  // Handle input change
const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
};

return (
    <div className="word-search">
    <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={`Search in ${scienceCategory}`}
        className="search-bar"
    />
    <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
        ))}
    </ul>
    </div>
);
};

export default WordSearch;