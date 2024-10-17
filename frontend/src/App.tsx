import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage';
import {Resources} from "../components/Resources"
import {PostResource} from "../components/PostResource"
import Signin from "../components/Signin"
import Signup from "../components/Signup"

function App() {
  return (
    <Router>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/resources' element={<Resources/>}/>
      <Route path='/post' element={<PostResource/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
     </Routes>
    </Router>
  );
}

export default App;
