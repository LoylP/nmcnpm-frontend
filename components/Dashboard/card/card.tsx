import { MdSupervisedUserCircle } from "react-icons/md";

const Card = () => {
  return (
    <div className="flex mx-7 my-7 bg-slate-900 p-5 rounded-xl gap-5 cursor-pointer hover:bg-slate-700">
      <MdSupervisedUserCircle className="text-3xl" />
      <div className="flex flex-col gap-5">
        <span className="text-xl ">Total Revenue</span>
        <span className="text-5xl font-medium">10000</span>
        <span className="text-xl font-light">
          <span className="text-2xl text-green-400">12%</span> more than
          previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
