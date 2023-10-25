import Link from "next/link"
import styles from './nav.module.css'

export default function Nav() {
    return (
        <nav>
            <div>
                <ul className={styles.navMenu}>
                    <li className={styles.navMenuItem}>
                        <Link href='/settings'>Settings</Link>
                    </li>
                    <li className={styles.navMenuItem}>
                        <Link href='/records'>Records</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}