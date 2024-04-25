import { About } from './components/about/About.tsx';
import { Header } from './components/header/Header.tsx';

import styles from './app.module.css';

function App() {
    return (
        <>
            <Header />
            <main className={styles.home}>
                <About />
            </main>
        </>
    );
}

export default App;
