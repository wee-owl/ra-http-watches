import React from 'react';
import Watches from './components/Watches';
import './App.css';


function App() {
  const [state, setState] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setState({area: e.target[0].value, zone: e.target[1].value});
    e.target[0].value = '';
    e.target[1].value = '';
  }

  return (
    <main className='main'>
      <form className="form" name='form' onSubmit={handleSubmit}>
        <div className="form__input">
          <label htmlFor='area'>Название</label>
          <input type='text' name="area" id="area" placeholder='Пекин' required/>
        </div>
        <div className="form__input">
          <label htmlFor="timezone">Временная зона</label>
          <input type="text" name="timezone" id="timezone" placeholder='+08' required/>
        </div>
        <button className='form__btn' type='submit'>Добавить</button>
      </form>
      <Watches state={state}/>
    </main>
  );
};

export default App;
