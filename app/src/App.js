//import logo from './assets/img/logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from "./pages/chat";
import NotFound from "./pages/notFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/chat/*" element={<Chat />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
