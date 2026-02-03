import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind | AI Resume Analyzer by Zuhaib Rashid" },
    {
      name: "description",
      content:
        "Resumind is an AI-powered resume analyzer built by Zuhaib Rashid. Get smart feedback, improve your resume, and boost your chances of landing your dream job.",
    },
    {
      name: "keywords",
      content:
        "AI resume analyzer, resume feedback tool, AI resume builder, resume checker, resume rating, resume tips, Resumind, Zuhaib Rashid, AI job application tool, resume improvement, AI job assistant",
    },
    { name: "author", content: "Zuhaib Rashid" },

    // Open Graph (Facebook / LinkedIn)
    { property: "og:title", content: "Resumind - AI Resume Feedback Tool" },
    {
      property: "og:description",
      content:
        "Smart AI-powered resume analysis by Zuhaib Rashid. Get personalized feedback and stand out to recruiters instantly!",
    },
    {
      property: "og:image",
      content:
        "https://ik.imagekit.io/xuhaib/resumind.webp?updatedAt=1754288423888",
    },
    { property: "og:url", content: "https://resumind-ebon.vercel.app/" },
    { property: "og:type", content: "website" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Resumind - AI Resume Feedback" },
    {
      name: "twitter:description",
      content:
        "Get AI-powered resume feedback created by Zuhaib Rashid. Make your resume job-ready today!",
    },
    {
      name: "twitter:image",
      content:
        "https://ik.imagekit.io/xuhaib/resumind.webp?updatedAt=1754288423888",
    },
    { name: "twitter:creator", content: "@xuhaib_x9" },

    // Canonical
    {
      tagName: "link",
      rel: "canonical",
      href: "https://resumind-ebon.vercel.app/",
    },

    // ✅ JSON-LD Structured Data
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Resumind",
        url: "https://resumind-ebon.vercel.app/",
        description:
          "AI-powered resume analyzer built by Zuhaib Rashid to help professionals improve their resumes and get noticed by recruiters.",
        applicationCategory: "BusinessApplication",
        author: {
          "@type": "Person",
          name: "Zuhaib Rashid",
          url: "https://zuhaibrashid.com",
        },
      }),
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication first
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
      return;
    }

    // If authenticated, load resumes
    let cancelled = false;

    const loadResumes = async () => {
      try {
        setLoadingResumes(true);
        setError(null);
        const resumesList = (await kv.list("resume:*", true)) as KVItem[];

        if (!cancelled) {
          const parsedResumes = resumesList?.map(
            (resume) => JSON.parse(resume.value) as Resume
          );
          setResumes(parsedResumes || []);
        }
      } catch (err) {
        console.error('Failed to load resumes:', err);
        if (!cancelled) {
          setError('Failed to load resumes. Please try again.');
          setResumes([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingResumes(false);
        }
      }
    };

    loadResumes();

    // Cleanup function to prevent state updates after unmount
    return () => {
      cancelled = true;
    };
  }, [auth.isAuthenticated, kv, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
            <span className="text-xl">
              Made with ❤ by{" "}
              <a
                className="text-2xl"
                target="_blank"
                rel="noopener noreferrer"
                id="zuhaib"
                href="https://zuhaibrashid.com/"
              >
                Zuhaib Rashid
              </a>
            </span>
          </div>
        )}
      </section>
    </main>
  );
}
