import React, { useState } from 'react';

const choices = [
  "How to learn HTML",
  "How to learn JavaScript",
  "What is EcmaScript",
  "How to learn CSS",
  "What does CSS stands for",
  "Facebook login",
  "Login box with HTML & CSS",
  "Who is a Freelancer",
  "How to create an Instagram page",
  "What is a text generator",
  "Who is Lorem Ipsum",
  "Backend developer",
  "Learn to be a backend developer",
  "Frontend developer",
  "Web designer",
  "Web programmer"
];

const SearchBar = () => {
  const [inputTxt, setInputTxt] = useState('');
  const [showList, setShowList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputTxt(value);
    if (value) {
      setShowList(true);
      const results = choices.filter(choice =>
        choice.toLowerCase().startsWith(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setShowList(false);
    }
  };

  const handleItemClick = (value) => {
    setInputTxt(value);
    setShowList(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputTxt}
        onChange={handleChange}
        placeholder="Search..."
      />
      {showList && (
        <ul className="list-group">
          {searchResults.map((result, index) => (
            <li key={index} onClick={() => handleItemClick(result)}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
