import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import TopNavbar from './components/TopNavbar';
import './index.css'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <TopNavbar />
      <Container>

      </Container>
    </Provider>
  );
}

export default App;
