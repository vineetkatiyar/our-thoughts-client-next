"use client";

import Link from "next/link";
import { formatTimeAgo } from "@/helper/formatTime";
import { Story } from "@/types/stroyType";

interface StoryDetailProps {
  story: Story;
}

export default function StoryDetail({ story }: StoryDetailProps) {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium  bg-green-50 hover:bg-green-100 text-[#4DAA57] py-2 px-4 rounded-lg transition-colors"
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
            Back to Feed
          </Link>
        </div>

        {/* Story Card */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                  <div className="font-semibold text-gray-900 text-lg">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {story.title}
            </h1>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {story.content}
              </div>
            </div>

            {/* Story Metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(story.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {story.updatedAt !== story.createdAt && (
                  <div>
                    <span className="font-medium">Updated:</span>{" "}
                    {new Date(story.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
                {story.publishedAt && (
                  <div>
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(story.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between items-center">
          {/* Share Button (future feature) */}
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors">
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
