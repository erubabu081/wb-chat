import './App.css';
import  WBChatApplication from './chat'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider} from 'react-redux';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/:chatId" element={<WBChatApplication />} />
          <Route path="/" element={<Navigate to="/chat1" replace />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
