import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getBookBySlug } from "@/lib/actions/book.actions";

type BookDetailsPageProps = {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
};

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { slug } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const { title, author, coverURL, persona } = result.data;

  return (
    <main className="book-page-container">
      <Link href="/" className="back-btn-floating" aria-label="Go back">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={coverURL ?? "/images/book-placeholder.png"}
              alt={title}
              width={120}
              height={180}
              className="vapi-cover-image !w-[120px] !h-auto"
              priority
            />

            <div className="vapi-mic-wrapper">
              <button
                type="button"
                className="vapi-mic-btn vapi-mic-btn-inactive shadow-md !w-[60px] !h-[60px]"
                aria-label="Mic off"
              >
                <MicOff className="size-7 text-[#212a3b]" />
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight text-[#212a3b]">
              {title}
            </h2>
            <p className="mt-2 text-sm text-[#3d485e]">by {author}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Voice: {persona ?? "Default"}</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="transcript-container min-h-[400px]">
          <div className="transcript-empty">
            <Mic className="size-12 text-[#212a3b] mb-4" />
            <h2 className="transcript-empty-text">No conversation yet</h2>
            <p className="transcript-empty-hint">
              Click the mic button above to start talking
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
