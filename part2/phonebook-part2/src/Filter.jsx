const Filter = ({ searchPerson,handleSearchedPerson }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchPerson} onChange={handleSearchedPerson} />
    </div>
  );
};

export default Filter;
