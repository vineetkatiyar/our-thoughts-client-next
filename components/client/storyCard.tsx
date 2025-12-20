"use client";

import Link from "next/link";
import { formatTimeAgo } from "@/helper/formatTime";
import { truncateContent } from "@/helper/truncateContent";
import { Story } from "@/types/stroyType";
import { ArrowRight } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <article className=" md:p-6 p-2 md:rounded-lg rounded md:border border-gray-200 border-b hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: "#4DAA57" }}
            aria-hidden="true"
          >
            {story.author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-[#4DAA57]">
              {story.author.name}
            </div>
            <div className="text-sm text-gray-500">
              {formatTimeAgo(story.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-900 dark:text-[#4DAA57]  mb-2">
        {story.title}
      </h3>

      <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4">
        {truncateContent(story.content)}
      </p>

      <Link
        href={`/story/${story.slug}`}
        className="inline-flex items-center text-sm font-semibold"
        style={{ color: "#4DAA57" }}
      >
        Read more{" "}
        <span className="px-2">
          <ArrowRight />
        </span>
      </Link>
    </article>
  );
}
