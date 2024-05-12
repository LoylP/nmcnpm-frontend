export async function POST(request: any, route: string) {
  const body = request.body;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // đảm bảo rằng bạn đã cấu hình content type cho body của bạn
          "Access-Control-Allow-Origin": "http://localhost:5050", // hoặc '*' nếu bạn muốn cho phép từ tất cả các nguồn
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          // Thêm các headers khác nếu cần
        },
        body: JSON.stringify(body), // Chuyển body thành dạng JSON
      }
    );
    // Trả về kết quả từ backend cho client
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Trả về một response lỗi nếu có lỗi xảy ra
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(route: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5050",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: 500,
      error: 1,
      message: "Error fetching data",
      data: null,
    };
  }
}
