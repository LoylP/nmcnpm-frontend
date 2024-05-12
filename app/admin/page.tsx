import React from "react";
import "./page.css";
import Card from "../../components/Dashboard/card/card";
import Status from "@/components/Dashboard/status/status";

function Page() {
  return (
    <div className="flex bg-slate-800 mt-10 gap-1">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 justify-between">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="mx-6 my-6">
          <Status />
        </div>
      </div>
    </div>
  );
}

export default Page;
