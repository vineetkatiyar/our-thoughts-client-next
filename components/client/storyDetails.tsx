"use client";

import Link from "next/link";
import { formatTimeAgo } from "@/helper/formatTime";
import { Story } from "@/types/stroyType";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Share2 } from "lucide-react";

import "highlight.js/styles/github-dark.css";

interface StoryDetailProps {
  story: Story;
}

export default function StoryDetail({ story }: StoryDetailProps) {
  const extractContent = (content: any): string => {
    if (!content) return "";
    if (typeof content === "string") return content;
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
    <div className="min-h-screen py-4">
      <div className="max-w-4xl mx-auto md:px-4 px-2">
        <article className="rounded-lg shadow-sm md:border border-gray-200 dark:border-gray-700 overflow-hidden">
          {story.coverImage && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="md:px-4 px-2 py-4">
            {/* Author */}
            <div className="flex items-center space-x-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                style={{ backgroundColor: "#4DAA57" }}
              >
                {story.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-[#4DAA57]">
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

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-[#4DAA57] mb-6">
              {story.title}
            </h1>

            {/* MARKDOWN CONTENT */}
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-[#4DAA57]">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed my-2">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-green-500 bg-green-50 dark:bg-gray-900 px-4 py-2 my-3 italic text-gray-700 dark:text-gray-200">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="px-3 py-2 text-left font-semibold text-gray-900 dark:text-gray-100 border">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-3 py-2 text-gray-800 dark:text-gray-200 border">
                      {children}
                    </td>
                  ),
                  hr: () => (
                    <hr className="my-6 border-gray-300 dark:border-gray-700" />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Actions */}
        <div className="mt-6 flex justify-between gap-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#ffff] dark:bg-[#4DAA57] py-2 px-4 rounded-sm bg-[#4DAA57]"
          >
            <ArrowLeft className="mr-2" />
            <span>Back</span>
          </Link>
          <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#4DAA57] hover:bg-green-700 cursor-pointer ">
            <Share2 className="mr-2" />
            Share Story
          </button>
        </div>
      </div>
    </div>
  );
}
