import { Outlet } from 'react-router-dom';
import './App.css'
import DictionarySelector from './components/DictionarySelector'; 
import { useState } from 'react';
import WordSearch from './components/WordSearch';

function App() {
  const [tag, setTag ] = useState('');
  return (
    <>
    <DictionarySelector setTag={setTag} />
    <WordSearch tag={tag} />
    </>
  )
}

export default App


