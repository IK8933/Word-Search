import { useState, useEffect } from 'react';

const DictionarySelector = ({setTag}) => {
    const [dictionaries, setDictionaries] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to show a loading indicator
    const [error, setError] = useState(null); // State to show an error message
    const [tag, setTag] = useState(''); // State to show a topic
    const [selectedDictionary, setSelectedDictionary] = useState(0);


    const changeTag = (id) => {
        setSelectedDictionary(id)
        setTag(dictionaries[id].tags[0])
    }

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
                setDictionaries(data.dictionaries); // Store the data in state
                setLoading(false); // Data is loaded
            })
            .catch((err) => {
                setError(err.message); // Store the error
                setLoading(false); // Stop loading
            });
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            <h1 className="text-2xl">Dictionary Selector</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <ul>
                    {dictionaries.map((dictionary, index) => (
                        <button onClick={() => changeTag(index)} key={dictionary._id} style={{ backgroundColor: index === selectedDictionary ? "green" : "blue", color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>{dictionary.title}</button>
                    //store as a prop to wordsearch
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DictionarySelector;

//Link for geology: https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=geology
//Link for chemistry: https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=chemistry
//Link for medical: https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=medical
//Link for biology: https://1rnoszgn46.execute-api.us-east-1.amazonaws.com/only-words?tag=biology
