import MenuBar from '../components/menubar/menubar';
import Navigation from '../components/navegation/navegation';
import styles from './home.module.css';

export default function Home() {
  // Simulação: troque para true/false para testar
  const hasNotification = true;

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <MenuBar hasNotification={hasNotification} />
        <main className={styles.main}>
          <h1 className={styles.title}>Bem-vindo à Sanem!</h1>
          <p className={styles.description}>Notificação ativa? {hasNotification ? 'Sim' : 'Não'}</p>
        </main>
      </div>
    </>
  );
} 