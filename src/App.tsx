import { About } from './components/about/About.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/header/Header.tsx';

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
