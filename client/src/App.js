import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import store from './redux/store';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
