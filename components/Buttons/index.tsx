import Link from "next/link";

const Index = () => {
  return (
    <div className="flex justify-center md:justify-end">
      <Link href="../Login">
        {" "}
        {/* Đường dẫn tương đối */}
        <button className="btn mr-4">Login</button>
      </Link>
      <Link href="../Register">
        {" "}
        {/* Đường dẫn tương đối */}
        <button className="btn">Register</button>
      </Link>
    </div>
  );
};

export default Index;
