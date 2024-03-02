import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SignInPage from './pages/SignInPage.jsx'; // Assuming SignInPage is default export

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
        </Routes>
    );
};

export default App;
