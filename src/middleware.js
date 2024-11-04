import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });
  const pathName = request.nextUrl.pathname;

  // Define routes with required roles
  const routeRoles = {
    public: ["/login", "/home", "/contact"],
    admin: [
      "/dashboard/admin/all-users",
      "/dashboard/admin/services",
      "/dashboard/admin/all-users",
      "/dashboard/admin/all-bookings",
      "/dashboard/admin/products",
      "/dashboard/admin/team",
    ],
    user: [
      "/services",
      "/dashboard/user/my-booking",
      "/dashboard/user/my-booking",
      "/dashboard/user/order-review",
    ],
  };

  const isPublicRoute = routeRoles.public.some((route) =>
    pathName.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathName}`, request.url)
    );
  }

  const isAdminRoute = routeRoles.admin.some((route) =>
    pathName.startsWith(route)
  );
  if (isAdminRoute) {
    if (token.role !== "admin") {
      console.log(
        "User is not an admin. Redirecting to not authorized page."
      );
      return NextResponse.redirect(
        new URL("/not-authorized", request.url)
      );
    }
  }
  const isUserRoute = routeRoles.user.some((route) =>
    pathName.startsWith(route)
  );
  if (isUserRoute) {
    if (token.role !== "user" && token.role !== "admin") {
      console.log(
        "User is not authorized for this route. Redirecting to not authorized page."
      );
      return NextResponse.redirect(
        new URL("/not-authorized", request.url)
      );
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/services/:path*",
    "/dashboard/:path*",
    "/dashboard/admin/:path*",
    "/dashboard/user/:path*",
  ],
};
