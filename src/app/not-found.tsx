import Layout from '@/components/Layout/Layout'

import styles from '@/styles/not-found.module.css'

export default function NotFound() {
    return (
        <Layout pageTitle='Error 404'>
            <div className={styles.error404}>
                <p>The page you requested<br/>does not exist.</p>
                <p>Please follow the link below<br/>to return to the main page.</p>
            </div>
        </Layout>
    )
}