import './App.css';
import TopBar from "./components/TopBar";
import GetCocktailFromApi from './components/CocktailDB';

function App() {
  return (
    <>
      <TopBar />
      <GetCocktailFromApi />
    </>
  );
}

export default App;
