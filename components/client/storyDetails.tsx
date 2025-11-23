"use client";

import Link from "next/link";
import { formatTimeAgo } from "@/helper/formatTime";
import { Story } from "@/types/stroyType";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Optional: GitHub Flavored Markdown support

interface StoryDetailProps {
  story: Story;
}

export default function StoryDetail({ story }: StoryDetailProps) {
  // Content extract function
  const extractContent = (content: any): string => {
    if (!content) return "";

    if (typeof content === "string") {
      return content;
    }

    if (typeof content === "object") {
      return (
        content.raw ||
        content.html ||
        content.content ||
        JSON.stringify(content)
      );
    }

    return String(content);
  };

  const content = extractContent(story.content);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#4DAA57] "
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>

        {/* Story Card */}
        <article className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Cover Image (if available) */}
          {story.coverImage && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Story Content */}
          <div className="p-8">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                  style={{ backgroundColor: "#4DAA57" }}
                >
                  {story.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-[#4DAA57] text-lg">
                    {story.author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatTimeAgo(story.createdAt)}
                    {story.updatedAt !== story.createdAt && (
                      <span className="ml-2">• Edited</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Story Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-[#4DAA57] mb-6 leading-tight">
              {story.title}
            </h1>

            {/* Story Content - FIXED SPACING */}
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // FIXED: Minimal spacing
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white pt-3 md:pt-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl dark:text-[#4DAA57] font-bold text-gray-900 py-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-normal dark:text-gray-100">
                      {" "}
                      {/* mb-4 → mb-2 */}
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900 dark:text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-800 dark:text-gray-100">
                      {children}
                    </em>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-0 ml-4">
                      {" "}
                      {/* space-y-2 → space-y-0 */}
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-0 ml-4">
                      {" "}
                      {/* space-y-2 → space-y-0 */}
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 leading-normal mb-0 dark:text-gray-100">
                      {" "}
                      {/* mb-1 → mb-0 */}
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-green-500 pl-3 my-2 italic text-gray-600 bg-green-50 dark:bg-black py-1 dark:text-black rounded-r">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;

                    if (isInline) {
                      return (
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm dark:text-gray-100 font-mono text-gray-800">
                          {children}
                        </code>
                      );
                    }

                    return (
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded my-2 overflow-x-auto text-sm">
                        <code className="font-mono block">{children}</code>
                      </pre>
                    );
                  },
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-green-600 hover:text-green-700 underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-2">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-50">{children}</thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-gray-200">
                      {children}
                    </tbody>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-1 text-left font-semibold text-gray-900 dark:text-white border-b">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-1 text-gray-700 dark:text-gray-100 border-b">
                      {children}
                    </td>
                  ),
                  hr: () => <hr className="my-3 border-gray-300" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center">
          {/* Share Button */}
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors cursor-pointer">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share Story
          </button>
        </div>
      </div>
    </div>
  );
}
