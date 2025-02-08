import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",                    // Landing page
    "/sign-in",            // Sign in page
    "/sign-up",            // Sign up page
    "/api/webhook",        // Webhooks
    "/api/webhooks(.*)",   // Webhook patterns
  ],
  
  ignoredRoutes: [
    "/api/webhook",
    "/api/webhooks(.*)"
  ],

  beforeAuth: (req) => {
    const { pathname } = req.nextUrl;
    const isStaticFile = pathname.includes('.');
    if (isStaticFile) return Response.next();
  },

  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // all files except static files
    "/",                      // root
  ],
};