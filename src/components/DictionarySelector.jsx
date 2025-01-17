import { useState, useEffect } from 'react';

const DictionarySelector = () => {
    const [words, setWords] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to show a loading indicator
    const [error, setError] = useState(null); // State to show an error message

    useEffect(() => {
        // Fetch data from an API
        fetch('https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/multi-details') // Replace with your API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setWords(data.dictionaries); // Store the data in state
                setLoading(false); // Data is loaded
            })
            .catch((err) => {
                setError(err.message); // Store the error
                setLoading(false); // Stop loading
            });
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            <h1>Dictionary Selector</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <ul>
                    {words.map((word, index) => (
                        <button key={index}>{word.title}</button> // Adjust based on the API response structure
                        //word.tags send as a prop
                    //store as a prop to wordsearch
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DictionarySelector;
