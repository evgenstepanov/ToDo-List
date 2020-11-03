import './App.css';
import Header from './Header';
import Menu from './Menu';
import Main from './Main';
import StoreProvider from '../store';

function App() {
  return (
    <>
      <StoreProvider>
        <Header />
        <div className='main-container'>
          <Menu />
          <Main />
        </div>
      </StoreProvider>
    </>
  );
}

export default App;
