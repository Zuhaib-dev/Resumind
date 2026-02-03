import { type FormEvent, useState } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        try {
            setIsProcessing(true);

            setStatusText('Uploading the file...');
            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile) throw new Error('Failed to upload file');
            console.log('File uploaded:', uploadedFile.path);

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) throw new Error('Failed to convert PDF to image');
            console.log('PDF converted to image');

            setStatusText('Uploading the image...');
            const uploadedImage = await fs.upload([imageFile.file]);
            if (!uploadedImage) throw new Error('Failed to upload image');
            console.log('Image uploaded:', uploadedImage.path);

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            console.log('Resume data saved with ID:', uuid);

            setStatusText('Analyzing with AI... This may take a minute.');

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription })
            )

            if (!feedback) throw new Error('AI analysis returned no response');
            console.log('AI feedback received:', feedback);

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            console.log('Feedback text:', feedbackText);

            // Validate JSON before parsing
            let parsedFeedback;
            try {
                parsedFeedback = JSON.parse(feedbackText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Raw feedback text:', feedbackText);
                throw new Error('AI returned invalid response format. Please try again.');
            }

            data.feedback = parsedFeedback;
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            console.log('Analysis complete, navigating to resume page');

            setStatusText('Analysis complete, redirecting...');
            navigate(`/resume/${uuid}`);
        } catch (error) {
            console.error('Analysis failed - Full error:', error);
            console.error('Error type:', typeof error);
            console.error('Error constructor:', error?.constructor?.name);

            let errorMessage = 'Unknown error occurred';

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else if (error && typeof error === 'object') {
                // Try to extract message from error object
                errorMessage = (error as any).message ||
                    (error as any).error ||
                    JSON.stringify(error);
            }

            setStatusText(`Error: ${errorMessage}`);
            setIsProcessing(false);

            // Keep the error visible
            alert(`Analysis failed: ${errorMessage}\n\nPlease check your internet connection and try again.\n\nIf the problem persists, check the console for more details.`);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        // Validation
        if (!file) {
            alert('Please upload a resume PDF file');
            return;
        }

        if (!jobTitle?.trim()) {
            alert('Please enter a job title');
            return;
        }

        if (!jobDescription?.trim()) {
            alert('Please enter a job description');
            return;
        }

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    const handleRetry = () => {
        setIsProcessing(false);
        setStatusText('');
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            {statusText.startsWith('Error:') ? (
                                <button
                                    className="primary-button mt-4"
                                    onClick={handleRetry}
                                >
                                    Try Again
                                </button>
                            ) : (
                                <img src="/images/resume-scan.gif" className="w-full" />
                            )}
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>

                        </form>

                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
