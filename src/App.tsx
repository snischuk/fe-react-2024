import { About } from './components/About/About';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

import styles from './app.module.css';

const App = () => (
    <>
        <Header />
        <main className={styles.main}>
            <About />
        </main>
        <Footer />
    </>
);

export default App;
