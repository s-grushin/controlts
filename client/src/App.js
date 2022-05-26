import { Provider, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import store from './redux/store';
import AppRouter from './components/AppRouter';
import TopNavbar from './components/TopNavbar';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopNavbar />
        <Container fluid>
          <AppRouter />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
