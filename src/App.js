import React, {useState, useEffect} from 'react';


function App() {

  //declare state variables
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('random');
  const [joke, setJoke] = useState('');
  
  //fetch category data
  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(e => console.log(e));
  }, []);

  const GenerateJoke = () => {
    let url;
    if (category == "random") {
      url = "https://api.chucknorris.io/jokes/random";
    } else {
      url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setJoke(data.value);
      })
      .catch(e => console.log(e));
  };

  const selectCategory = e => {
    setCategory(e.target.value);
  };

  return (
    <div class='app'>
      <h1>Chuck Norris Jokes Generator</h1>
      <span>Select Category</span>:<select name="categories" id="categories" onChange={selectCategory}>
            <option value="random" selected>
              random
            </option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          
      <p>{joke}</p>
      <button onClick={GenerateJoke}>New Joke</button>

    </div>
  );
}

export default App;
