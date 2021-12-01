import React, { useState, useEffect } from "react";
import personService from "./services/persons"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [displayMessage, setDisplayMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)    
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName && person.number === newNumber)) {
      const person = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())?.[0]
      setDisplayMessage(
        {
          content: `${person.name} is already added to the phonebook`,
          type: 'red'
        }
      )
      setTimeout(() => {
        setDisplayMessage(null)
      }, 5000)
      setNewNumber("");
      setNewName("");
    } else if (persons.some((person) => person.name === newName)) {
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const person = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())?.[0]
          const updatedPerson = {...person, number: newNumber}
          personService.update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
            setDisplayMessage(
              {
                content: `Changed ${updatedPerson.name}'s number to ${updatedPerson.number}`,
                type: 'green'
              }
            )
            setTimeout(() => {
              setDisplayMessage(null)
            }, 5000)
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            setDisplayMessage(
              {
                content: `Information of ${updatedPerson.name} has already been removed from server`,
                type: 'red'
              }
            )
            setTimeout(() => {
              setDisplayMessage(null)
            }, 5000)
          })
        };
      } 
      else {
        const personObject = {
          persons: persons,
          name: newName,
          number: newNumber,
          id: Math.max(...persons.map(p => p.id)) + 1 
        };
    
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setDisplayMessage(
              {
                content: `Added ${personObject.name} to the Phonebook`,
                type: 'green'
              }
            )
            setTimeout(() => {
              setDisplayMessage(null)
            }, 5000)
            setNewName('');
            setNewNumber('');
          })
      }
    
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    
    else if (message.type === 'green') {
      return (
        <div className= "messageGreen">
          {message.content}
        </div>
      )
    }
    else if (message.type === 'red') {
      return (
        <div className= "messageRed">
          {message.content}
        </div>
      )
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const PersonDisplay = (props) => {
    return (
      <div>
        {props.value.name} {props.value.number} <button onClick={() => {
            if (window.confirm(`Delete '${props.value.name}'?`)) {
              personService.remove(props.value.id)
              setPersons(persons.filter(person => person.id !== props.value.id))
            }
          }}>
          delete
        </button>
      </div>
    );
  };

  const FilterPersons = (props) => {
    console.log(props.persons);
    return props.persons
      .filter((person) =>
        person.name.toLowerCase().includes(props.filter.toLowerCase())
      )
      .map((person) => <PersonDisplay key={person.id} value={person} />);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message= {displayMessage} />
      <form>
        <div>
          filter shown with
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{<FilterPersons filter={filter} persons={persons} />}</div>
    </div>
  );
};

export default App;
