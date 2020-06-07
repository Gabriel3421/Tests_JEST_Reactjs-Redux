import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Container } from './styles';
import { addTech } from '../../store/modules/techs/actions';
function TechList() {
  const dispatch = useDispatch();
  const  [newTech, setNewTech]  = useState([]);
  const techs = useSelector(state => state.techs)


  function handleClick () {
    dispatch(addTech(newTech));
    setNewTech('');
  }
  return (
  <form data-testid="tech-form" onSubmit={handleClick}>
    <ul data-testid="tech-list">
      {techs.map(tech => <li key={tech}>
        {tech}
      </li>)}
    </ul>
    <label htmlFor="tech">Tech</label>
    <input id="tech" value={newTech}  type="text" onChange={e => setNewTech(e.target.value)}/>
    <button onClick={handleClick} >Adicionar</button>
  </form>
  );
}

export default TechList;