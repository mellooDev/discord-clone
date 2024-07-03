import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/api/uploadthing'
])

export default clerkMiddleware( async(auth, req) => {
  if(isPublicRoute(req)) {
    return NextResponse.next()
  }

  const {userId} = await auth()
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};