import type { Metadata } from "next";
import Sidebar from "../../components/Dashboard/sidebar/sidebar";
import Navbar from "../../components/Dashboard/navbar/navbar";
import Footer from "../../components/Dashboard/footer/footer";
import styles from "./dashboard.module.css";
import "./page.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin Page",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <div className={styles.menu}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
