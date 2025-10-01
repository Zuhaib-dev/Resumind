import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    {
      name: "description",
      content:
        "AI-powered resume analysis delivering smart, tailored feedback to help you stand out and secure your dream job.",
    },

    { property: "og:title", content: "Resumind - AI Resume Feedback" },
    {
      property: "og:description",
      content:
        "Smart resume analysis with AI-driven suggestions. Get noticed by recruiters instantly!",
    },

    {
      property: "og:image",
      content:
        "https://ik.imagekit.io/xuhaib/resumind.webp?updatedAt=1754288423888",
    },

    { property: "og:url", content: "https://resumind-ebon.vercel.app/" },
    { property: "og:type", content: "website" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Resumind - AI Resume Feedback" },
    {
      name: "twitter:description",
      content:
        "Get powerful resume feedback and boost your chances of landing your dream job.",
    },

    {
      name: "twitter:image",
      content:
        "https://ik.imagekit.io/xuhaib/resumind.webp?updatedAt=1754288423888",
    },

    { name: "twitter:creator", content: "https://x.com/xuhaib_x9" },

    // ✅ Canonical tag to avoid duplicate/redirect issues
    {
      tagName: "link",
      rel: "canonical",
      href: "https://resumind-ebon.vercel.app/",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      );
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

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
                Zuhaib
              </a>
            </span>
          </div>
        )}
      </section>
    </main>
  );
}
