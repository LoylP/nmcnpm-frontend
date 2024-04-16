import Image from "next/image";
import React from "react";
import LoginPage from "./LoginPage";

function Page() {
  return (
    <div className="grid md:grid-cols-5">
      <LoginPage />
    </div>
  );
}

export default Page;
