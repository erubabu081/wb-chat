import logo from './logo.svg';
import './App.css';
import  WBChatApplication from './chat'
import { Routes, Route } from 'react-router-dom';
import { Provider} from 'react-redux';

import store from './store';


function App() {
      <Routes>
        <Route path="/chat1" element={<WBChatApplication />} />
         <Route path="/chat2" element={<WBChatApplication />} />
         <Route path="/chat3" element={<WBChatApplication />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
  return (
    <Provider store= {store}>
      
      <div className="App">
      <WBChatApplication/>
    </div>
    
    </Provider>
    
  );
}

export default App;
