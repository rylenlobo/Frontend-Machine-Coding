import Shape from './components/Shape';
import "./App.css";

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const App = () => {
  return (
    <div className='container'>
      <Shape data={BOX_DATA} />
    </div>
  )
}

export default App
