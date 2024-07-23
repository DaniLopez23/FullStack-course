const Person = ({ personsToShow, handleRemovePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleRemovePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Person;
