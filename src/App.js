import logo from './logo.svg';
import './App.css';
import  WBChatApplication from './chat'
import { Provider} from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store= {store}>
      <div className="App">
      <WBChatApplication/>
    </div>
    </Provider>
    
  );
}

export default App;
