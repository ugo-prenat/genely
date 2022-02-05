import './styles/index.scss'

import { Github } from './assets/svg/Github';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1>Genely</h1>
        <p>La plateforme est en cours de développement...</p>
      </div>
      
      <footer>
        <a href="https://dev.genely.dev/">Accéder à la version dev</a>
        <a href='https://github.com/ugo-prenat/genely/tree/dev'>
          <Github />
        </a>
      </footer>
    </div>
  );
}

export default App;
