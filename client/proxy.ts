import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/(.*)"]);

const isPrivateRoute = createRouteMatcher(["/customer", "/checkout"])
// const isPrivateRoute = createRouteMatcher(["/customer"])
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request) || isPrivateRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
