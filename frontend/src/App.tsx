import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage';
import {Resources} from "../components/Resources"
import {PostResource} from "../components/PostResource"

function App() {
  return (
    <Router>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/resources' element={<Resources/>}/>
      <Route path='/post' element={<PostResource/>}/>
     </Routes>
    </Router>
  );
}

export default App;
