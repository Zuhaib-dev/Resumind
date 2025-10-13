import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  // ✅ Microsoft Clarity integration (fully typed)
  useEffect(() => {
    const clarityInit = (
      c: Window & typeof globalThis,
      l: Document,
      a: string,
      r: string,
      i: string
    ) => {
      (c as any)[a] =
        (c as any)[a] ||
        function (...args: unknown[]) {
          ((c as any)[a].q = (c as any)[a].q || []).push(args);
        };

      const t = l.createElement(r) as HTMLScriptElement; // ✅ explicitly a <script> tag
      t.async = true;
      t.src = `https://www.clarity.ms/tag/${i}`;

      const firstScript = l.getElementsByTagName(r)[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(t, firstScript);
      }
    };

    clarityInit(window, document, "clarity", "script", "tpkdhpqupu");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="terZRkP5xAisMxUTVWZ_rW6MXSuOeuAFITryD0CBDxA"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://resumind-ebon.vercel.app/" />

        <Meta />
        <Links />
      </head>
      <body>
        {/* ✅ Puter SDK */}
        <script src="https://js.puter.com/v2/"></script>

        {children}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
