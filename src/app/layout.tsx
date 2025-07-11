// src/app/layout.tsx
import '../styles/globals.scss';
import Header from '../components/Header';
import styles from '../styles/Layout.module.scss';

export const metadata = {
  title: 'My App',
  description: 'Responsive web app with beautiful design',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={styles.layout}>
    <main className={styles.main}>{children}</main>
    </body>
    </html>
  );
}
