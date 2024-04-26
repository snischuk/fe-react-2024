import { About } from './components/About/About.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';

import styles from './app.module.css';

function App() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <About />
            </main>
            <Footer />
        </>
    );
}

export default App;
