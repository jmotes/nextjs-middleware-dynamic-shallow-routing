import { NextMiddleware, NextResponse } from "next/server";

/**
 * Enables multi-tenant support by mapping the hostname and path to Next.js routes
 * so they are accessible via the getStaticProps's request params argument.
 */
const middleware: NextMiddleware = (req) => {
    const url = req.nextUrl.clone();
    const { host: hostname, pathname } = req.nextUrl;

    // don't proxy requests to static files or api endpoints
    if (!pathname.includes(".") && !pathname.startsWith("/api")) {
        url.pathname = `/_sites/${encodeURIComponent(hostname)}${pathname}`;
        return NextResponse.rewrite(url);
    }
};

export default middleware;
