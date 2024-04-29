import Image from "next/image";
import React from "react";
import RegisterPage from "./RegisterPage";

function Page() {
  return (
    <div className="grid md:grid-cols-5">
      <RegisterPage />
    </div>
  );
}

export default Page;
