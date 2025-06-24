import Link from 'next/link';
import Image from 'next/image';
import styles from './navegation.module.css';

function HomeIcon() {
    return (
        <Image
            src="/home-icon.png"
            alt="Home"
            width={24}
            height={24}
            style={{ marginRight: 12 }}
        />
    );
}

export default function Navigation() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <Image src="/logo-sanem.svg" alt="Sanem" width={80} height={80} />
                <div className={styles.logoText}></div>
            </div>
            <div className={styles.sectionTitle}>MENU</div>
            <nav className={styles.menuSection}>
                <Link href="/home" className={styles.menuItem}><HomeIcon />Home</Link>
                <Link href="/cadastrooption" className={styles.menuItem}><HomeIcon />Cadastro</Link>
                <Link href="/estoque" className={styles.menuItem}><HomeIcon />Estoque</Link>
                <Link href="/gerenciamento-voluntarios" className={styles.menuItem}><HomeIcon />Voluntarios</Link>
            </nav>
            <div className={styles.sectionTitle}>OTHERS</div>
            <nav className={styles.menuSection}>
                <Link href="/relatorios" className={styles.menuItem}><HomeIcon />Relatórios</Link>
                <Link href="/configuracoes" className={styles.menuItem}><HomeIcon />Configurações</Link>
                <Link href="/usuarios" className={styles.menuItem}><HomeIcon />Usuários</Link>
                <Link href="/ajuda" className={styles.menuItem}><HomeIcon />Ajuda</Link>
            </nav>
        </aside>
    );
}
