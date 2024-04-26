import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
    return (
        <>
            <Header />
            <main>
                <About />
            </main>
            <Footer />
        </>
    );
}

export default App;
