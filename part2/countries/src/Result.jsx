const Result = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <div key={country.name}>
          <p>{country.name}</p>
        </div>
      ))}
    </>
  );
};

export default Result;
