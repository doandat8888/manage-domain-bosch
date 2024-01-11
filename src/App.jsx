import { useEffect } from 'react';
import './App.scss';
import IPDomainPage from './pages/ipdomainpage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleBeforeUnload = () => {
        localStorage.removeItem('name');
    };

    return (
        <IPDomainPage />
    )
}

export default App
