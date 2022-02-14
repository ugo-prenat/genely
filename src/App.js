import './styles/index.scss'

import { Github } from './assets/svg/Github';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1>Genely</h1>
        <p>La plateforme est en cours de développement...</p>
      </div>
      
      <a href='https://github.com/ugo-prenat/genely'>
        <Github />
      </a>
    </div>
  );
}

export default App;
