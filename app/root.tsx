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

    const clarityId = import.meta.env.VITE_CLARITY_ID || "tpkdhpqupu";
    clarityInit(window, document, "clarity", "script", clarityId);
  }, []);

  const SITE_URL = import.meta.env.VITE_CANONICAL_URL || "https://resumind-ebon.vercel.app";
  const OG_IMAGE = "https://ik.imagekit.io/xuhaib/resumind.webp?updatedAt=1754288423888";

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

        {/* ✅ SEO essentials */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Zuhaib Rashid" />
        <meta name="creator" content="Zuhaib Rashid" />
        <meta name="publisher" content="Zuhaib Rashid" />
        <meta name="theme-color" content="#4c84f3" />
        <meta name="color-scheme" content="light" />
        <meta name="application-name" content="Resumind" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Resumind" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        {/* ✅ Default Open Graph (fallback for pages without their own OG tags) */}
        <meta property="og:site_name" content="Resumind" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Resumind – AI Resume Analyzer" />
        <meta property="og:description" content="Get instant AI-powered feedback on your resume. ATS scoring, personalized tips, and job-tailored suggestions — all for free." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Resumind – AI Resume Analyzer" />
        <meta property="og:url" content={SITE_URL} />

        {/* ✅ Default Twitter Card (fallback) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@xuhaib_x9" />
        <meta name="twitter:creator" content="@xuhaib_x9" />
        <meta name="twitter:title" content="Resumind – AI Resume Analyzer" />
        <meta name="twitter:description" content="Upload your resume and get instant AI-powered ATS scoring and improvement tips. Built by Zuhaib Rashid." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content="Resumind – AI Resume Analyzer" />

        {/* ✅ Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://api.puter.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://api.puter.com" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href={SITE_URL + "/"} />

        {/* ✅ Alternate & Discovery links */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ JSON-LD: WebApplication (expanded) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${SITE_URL}/#webapp`,
            "name": "Resumind",
            "alternateName": "Resumind AI",
            "headline": "Resumind – AI-Powered Resume Analyzer & ATS Scorer",
            "description": "AI-powered resume analyzer that provides ATS scoring and personalized feedback to help you land your dream job. Upload your resume, get an instant score, and receive actionable improvement tips.",
            "url": SITE_URL,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web Browser",
            "browserRequirements": "Requires JavaScript, modern browser",
            "softwareVersion": "1.0.0",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "AI-powered resume analysis",
              "ATS compatibility scoring (0-100)",
              "Section-by-section feedback",
              "Job description matching",
              "Personalized improvement tips",
              "Secure cloud storage",
              "No backend required",
              "Drag & drop PDF upload"
            ],
            "screenshot": OG_IMAGE,
            "image": OG_IMAGE,
            "keywords": "AI resume analyzer, ATS score checker, resume feedback, resume improvement, AI job tool, resume tips",
            "creator": {
              "@type": "Person",
              "@id": `${SITE_URL}/#creator`,
              "name": "Zuhaib Rashid",
              "url": "https://zuhaibrashid.com",
              "sameAs": [
                "https://github.com/Zuhaib-dev",
                "https://x.com/xuhaib_x9",
                "https://www.linkedin.com/in/zuhaib-rashid-661345318/"
              ]
            },
            "publisher": {
              "@type": "Person",
              "@id": `${SITE_URL}/#creator`
            },
            "potentialAction": {
              "@type": "UseAction",
              "target": `${SITE_URL}/upload`,
              "name": "Analyze Your Resume"
            }
          })}
        </script>

        {/* ✅ JSON-LD: Person (Creator profile with all socials) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${SITE_URL}/#creator`,
            "name": "Zuhaib Rashid",
            "givenName": "Zuhaib",
            "familyName": "Rashid",
            "url": "https://zuhaibrashid.com",
            "image": OG_IMAGE,
            "description": "Frontend developer and creator of Resumind – an AI-powered resume analyzer. Passionate about building modern web applications with React, TypeScript, and AI.",
            "jobTitle": "Frontend Developer",
            "sameAs": [
              "https://github.com/Zuhaib-dev",
              "https://x.com/xuhaib_x9",
              "https://twitter.com/xuhaib_x9",
              "https://www.linkedin.com/in/zuhaib-rashid-661345318/",
              "https://zuhaibrashid.com"
            ],
            "knowsAbout": [
              "React", "TypeScript", "JavaScript", "Tailwind CSS",
              "AI", "Web Development", "Frontend Development",
              "Resume Optimization", "ATS Systems"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Sheryians Coding School",
              "url": "https://sheryians.com"
            },
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "WebApplication",
                "@id": `${SITE_URL}/#webapp`
              }
            }
          })}
        </script>

        {/* ✅ JSON-LD: BreadcrumbList (helps Google understand site structure) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Upload Resume",
                "item": `${SITE_URL}/upload`
              }
            ]
          })}
        </script>

        {/* ✅ JSON-LD: FAQPage (boosts rich snippets in search) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Resumind?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Resumind is a free AI-powered resume analyzer that helps job seekers improve their resumes by providing ATS (Applicant Tracking System) scores and personalized feedback based on specific job descriptions."
                }
              },
              {
                "@type": "Question",
                "name": "How does Resumind analyze my resume?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Upload your resume as a PDF, provide a target job title and description, and Resumind uses AI to analyze your resume section by section — giving you an ATS compatibility score, strengths, weaknesses, and actionable improvement tips."
                }
              },
              {
                "@type": "Question",
                "name": "Is Resumind free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Resumind is completely free to use. It runs entirely in the browser with no backend server, powered by Puter.js for authentication, storage, and AI capabilities."
                }
              },
              {
                "@type": "Question",
                "name": "Who created Resumind?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Resumind was created by Zuhaib Rashid, a frontend developer learning at Sheryians Coding School. You can find him on GitHub (@Zuhaib-dev), X (@xuhaib_x9), LinkedIn, and his portfolio at zuhaibrashid.com."
                }
              }
            ]
          })}
        </script>

        <Meta />
        <Links />
      </head>
      <body>
        {/* ✅ Puter SDK */}
        <script src={import.meta.env.VITE_PUTER_SDK_URL || "https://js.puter.com/v2/"}></script>

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
