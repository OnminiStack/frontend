import React, {useState} from 'react'

export default function Counter(){
    const [counter, setCounter] = useState(0);
  // usestate retorna arrays com duas possições, contem: [valor , função]

  function increment(){
    setCounter(counter + 1);

    //console.log(counter)
  }

  return (
    <div>
      <Header>Contador : {counter}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
    
  );

}