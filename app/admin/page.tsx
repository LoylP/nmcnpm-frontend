"use client"
import React, { useEffect, useState } from "react";
import "./page.css";
import Card from "../../components/Dashboard/card/card";
import Status from "@/components/Dashboard/status/status";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Page() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const roleid = parseInt(getCookie("role_id") as string);

    if (roleid != 1) {
      setIsAdmin(false);
      // window.alert("not allow access admin")
      router.push("/")
    }
    else {
      setIsAdmin(true)
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        <>
          <div className="flex bg-slate-800 mt-10 gap-1">
            <div className="flex flex-col gap-5 mx-auto w-full">
                <Card />
              <div className="mx-6 my-6">
                <Status />
              </div>
            </div>
          </div></>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Page;
