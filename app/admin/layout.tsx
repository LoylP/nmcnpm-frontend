import Navbar from "@/components/Nav/Navbar";
import "../globals.css";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = [
    "Đặt phòng",
    "Thuê xe",
    "Dịch vụ",
    "Địa điểm tham quan",
    "Quy tắc chung",
  ];
  return (
    <>
      <Navbar services={services} isUser={false} />
      {children}
    </>
  );
}
