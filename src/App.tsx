import { AboutComponent } from './components/about/About.component.tsx';
import { HeaderComponent } from './components/header/Header.component.tsx';

import styles from './App.module.css';

function App() {
    return (
        <>
            <HeaderComponent />
            <main className={styles.home}>
                <AboutComponent />
            </main>
        </>
    );
}

export default App;
