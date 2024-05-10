import Image from "next/image";

const Status = () => {
  return (
    <div className="bg-gray-900 p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-5 text-gray-700">Admin Status</h2>
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/avatar_admin.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>JACK</span>
              </div>
            </td>
            <td className="py-3">
              <span className="px-2 py-1 bg-green-400 rounded text-sm">
                Online
              </span>
            </td>
            <td className="py-3">14.02.2024</td>
            <td className="py-3">Manager</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/avatar_admin.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>K-ICM</span>
              </div>
            </td>
            <td className="py-3">
              <span className="px-2 py-1 bg-red-500 rounded text-sm">
                Offline
              </span>
            </td>
            <td className="py-3">14.02.2024</td>
            <td className="py-3">Staff</td>
          </tr>

          {/* Add more transactions here */}
        </tbody>
      </table>
    </div>
  );
};

export default Status;
