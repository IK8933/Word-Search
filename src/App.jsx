import { Outlet } from 'react-router-dom';
import './App.css'
import DictionarySelector from './components/DictionarySelector'; 
import Dummy from './components/Dummy';
import { useState } from 'react';

function App() {
  const [tag, setTag ] = useState('');
  return (
    <>
    <DictionarySelector setTag={setTag} />
    <Dummy tag={tag} />
    </>
  )
}

export default App


