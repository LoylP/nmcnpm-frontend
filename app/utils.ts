export async function POST(request: any, route: string) {
  const body = request.body;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "POST",
        credentials: "include",
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
    return await res.json();
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

export async function DELETE(request: any, route: string) {
  const body = request.body;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // đảm bảo rằng bạn đã cấu hình content type cho body của bạn
          "Access-Control-Allow-Origin": "http://localhost:5050", // hoặc '*' nếu bạn muốn cho phép từ tất cả các nguồn
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify(body),
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

export async function DELETE_Ser(request: any, route: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(route: string, body: any) {
  try {
    console.log("Sending PATCH request to:", `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`);
    console.log("Request body:", body);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response from server:", errorText);
      throw new Error("Failed to update user");
    }

    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

export async function POST_UPLOAD(route: string, body: FormData, options = {}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/${route}`,
      {
        method: "POST",
        body: body,
        credentials: "include",
        headers: {
          // Do not manually set Content-Type, let the browser set it automatically
          "Access-Control-Allow-Origin": "http://localhost:5050",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        ...options,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response from server:", errorText);
      throw new Error("Failed to upload file");
    }

    return res.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Error uploading file");
  }
}

export async function GET_ALL_COUNTRY() {
  const res = await fetch(
    `https://countriesnow.space/api/v0.1/countries`,
  )
  const data = await res.json()
  const dataList = data.data;
  const countries = new Map();
  for (let key in dataList){
    countries.set(dataList[key]["country"], dataList[key]["cities"])
  }
  return countries
}


export const convertImagePath = (path: string) => {
  const splitStr = path.split("/");
  if (splitStr[0] === "images") {
    path = path.replace("images", "static");
  }
  return `${process.env.NEXT_PUBLIC_IMAGES_FOLDER}${path}`
}

