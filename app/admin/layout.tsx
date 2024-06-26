"use client";
import Sidebar from "../../components/Dashboard/sidebar/sidebar";
import Navbar from "../../components/Dashboard/navbar/navbar";
import styles from "./dashboard.module.css";
import "./page.css";
import "../globals.css";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminName, setAdminName] = useState<string>("Admin");
  useEffect(() => {
    const roleid = getCookie("role_id");
    const userName = getCookie("userName");
    if (roleid && roleid == "1") {
      setIsAdmin(true);
      if (userName) {
        setAdminName(userName);
      }
    }
  }, [])
  return (
    <>
      {isAdmin ? (
        <html lang="en">
          <body>
            <div className={styles.container}>
              <div className={styles.menu}>
                <Sidebar adminName={adminName} />
              </div>
              <div className={styles.content}>
                <Navbar />
                {children}
              </div>
            </div>
          </body>
        </html>
      ) : (
        <html lang="en">
          <body>
            <div className={styles.container}>
              {children}
            </div>
          </body>
        </html>
      )}
    </>
  );
}
