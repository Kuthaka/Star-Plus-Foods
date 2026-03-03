import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
    // Create an unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh the session if it exists
    const { data: { user } } = await supabase.auth.getUser();

    // Protection Logic
    const publicAdminPaths = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];
    const isPublicAdminPath = publicAdminPaths.includes(request.nextUrl.pathname);
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

    if (isAdminPath && !isPublicAdminPath && !user) {
        // If trying to access admin dashboard and not logged in, redirect to login
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isPublicAdminPath && user) {
        // If already logged in and trying to access a public admin page, redirect to dashboard
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
};
