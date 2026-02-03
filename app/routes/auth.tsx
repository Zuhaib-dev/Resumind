import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    // Extract and validate the next parameter
    const nextParam = location.search.split('next=')[1];

    // Sanitize redirect URL - only allow relative URLs starting with /
    const getRedirectUrl = (): string => {
        if (!nextParam) return '/';

        // Decode URL parameter
        const decoded = decodeURIComponent(nextParam);

        // Only allow relative URLs that start with /
        // This prevents open redirect attacks
        if (decoded.startsWith('/') && !decoded.startsWith('//')) {
            return decoded;
        }

        return '/';
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            const redirectUrl = getRedirectUrl();
            navigate(redirectUrl);
        }
    }, [auth.isAuthenticated, nextParam, navigate])

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button" onClick={auth.signIn}>
                                        <p>Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth
