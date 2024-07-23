import { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import personService from "./services/personService";
import Notificacion from "./Notificacion";
import index from "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setSearchPerson] = useState("");
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    console.log("effect");
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const personsToShow =
    searchPerson === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchPerson.toLowerCase())
        );

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchedPerson = (event) => {
    console.log(event.target.value);
    setSearchPerson(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setMessage(`Added ${newName}`);

    personService.create(personObject).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
    });

  };

  const handleRemovePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notificacion message={message}/>
      <Filter
        searchPerson={searchPerson}
        handleSearchedPerson={handleSearchedPerson}
      />

      <h2>Add a new</h2>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} handleRemovePerson={handleRemovePerson} />
    </div>
  );
};

export default App;
