import './App.css';
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import StoreProvider from '../store';
import ModalBlock from './ModalBlock';

function App() {
  return (
    <>
      <StoreProvider>
        <Header />
        <div className='main-container'>
          <Menu />
          <Main />
        </div>
        <ModalBlock />
      </StoreProvider>
    </>
  );
}

export default App;
