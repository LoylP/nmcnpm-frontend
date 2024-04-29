import Link from "next/link";

const Index = () => {
  return (
    <div className="flex justify-center md:justify-end">
      <Link href="../login">
        {" "}
        <button className="btn mr-4 bg-gray-100">Login</button>
      </Link>
      <Link href="../register">
        {" "}
        <button className="btn bg-gray-100">Register</button>
      </Link>
    </div>
  );
};

export default Index;
