import React, {useState} from 'react';
import './App.css';
import ComboBox from './Components/ComboBox';
import Chart from './Components/Chart';


export default function App() {
   const [line , setLine] = useState<string>('');
  
  return (

    <div className="App">
    <ComboBox line={line} setLine={setLine}/>
    <Chart line={line}/>
    </div>

  );
}

