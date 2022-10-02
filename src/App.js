import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import { useState, useEffect } from 'react';

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    setFilteredMonsters(monsters.filter(monster => monster.name.toLowerCase().includes(searchField)))
  }, [searchField, monsters])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='search-box'
        placeholder='search-monsters'
        onChangeHandler={onSearchChange}
      />

      <CardList monsters={filteredMonsters} />

    </div>
  );
}



// class App extends Component {
//   constructor() {
//     console.log('constructor')
//     super();
//     this.state = {
//       monsters : [],
//       filterTerm : ""
//     }
//   }

//   componentDidMount() {
//     console.log('component did mount')
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then((users) => this.setState(
//       () => {return {monsters: users}},
//       () => {console.log(this.state)}
//     ))
//   }

//   onSearchChange = (event) => {this.setState(
//     () => {return {filterTerm: event.target.value.toLowerCase()}},
//     () => {console.log(this.state.filterTerm)}
//     )}


//   render() {
//     console.log('render')

//     const {monsters, filterTerm} = this.state;
//     const {onSearchChange} = this;

//     const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(filterTerm));

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox 
//           className = 'search-box'
//           placeholder = 'search-monsters'
//           onChangeHandler = {onSearchChange}
//         />

//         <CardList monsters={filteredMonsters} />

//       </div>
//     );
//   }

// };

export default App;
