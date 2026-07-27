'use client'

import useVapi from '@/hooks/useVapi';
import { IBook } from '@/types';
import Image from 'next/image';
import { Mic, MicOff } from 'lucide-react';
import Transcript from './Transcript';

const VapiControls = ({ book }: { book: IBook }) => {
    const { status, isActive, messages, currentMessage, currentUserMessage, duration, start, stop, clearErrors } =
        useVapi(book);

    return (
        <>

            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header Card - Book Cover & Details */}
                <div className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL || "/images/book-placeholder.png"}
                            alt={book.title}
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

                    <div className="flex flex-col gap-4 flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                            {book.title}
                        </h1>
                        <p className="text-[#3d485e] font-medium">by {book.author}</p>

                        <div className="flex flex-wrap gap-3">
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-dot vapi-status-dot-ready" />
                                <span className="vapi-status-text">Ready</span>
                            </div>
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">Voice: {book.persona || "Daniel"}</span>
                            </div>
                            <div className="vapi-status-indicator">
                                <span className="vapi-status-text">0:00/15:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="vapi-transcript-wrapper">
                    <Transcript
                        messages={messages}
                        currentMessage={currentMessage}
                        currentUserMessage={currentUserMessage}
                    />
                </div>
            </div>
        </>
    )
}

export default VapiControls;