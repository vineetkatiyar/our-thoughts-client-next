"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTimeAgo } from "@/helper/formatTime";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Calendar, User, Eye, EyeOff, BoomBox } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useGetStoryById } from "@/hooks/adminPanel/useGetStoryById";
import Link from "next/link";

interface StoryViewModalProps {
  storyId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryViewModal({
  storyId,
  isOpen,
  onClose,
}: StoryViewModalProps) {
  const { data, isLoading, error } = useGetStoryById(storyId);

  const story = data?.story;

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

  const content = extractContent(story?.content);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between"></DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full max-h-[80vh]">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading story details</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          ) : story ? (
            <div className="space-y-6">
              {/* Story Header */}
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  {/* Title - Always on top */}
                  <h1 className="text-2xl font-bold text-gray-900">
                    {story.title}
                  </h1>

                  {/* Badges - Below title on mobile, on right side on desktop */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Badges container */}
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={
                          story.status === "PUBLISHED" ? "default" : "secondary"
                        }
                        className={
                          story.status === "PUBLISHED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {story.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          story.visibility === "PUBLIC"
                            ? "border-blue-200 text-blue-700 bg-blue-50"
                            : "border-gray-200 text-gray-700 bg-gray-50"
                        }
                      >
                        {story.visibility === "PUBLIC" ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-1" />
                        )}
                        {story.visibility}
                      </Badge>
                    </div>

                    {/* Agar aapko koi aur element add karna hai to yahan add kar sakte hain */}
                  </div>
                </div>
              </div>

              {/* Author and Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Author:</span>
                    <div className="flex items-center">
                      <span>{story.author.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Created:</span>
                    <span className="text-gray-600">
                      {formatTimeAgo(story.createdAt)}
                    </span>
                  </div>
                  <div className="space-y-2 flex items-center">
                    {story.publishedAt && (
                      <div className="text-sm flex items-center">
                        <BoomBox className="h-4 w-4 text-gray-500" />
                        <span className="font-medium ml-2">Published:</span>
                        <span className="text-gray-600 ml-2">
                          {formatTimeAgo(story.publishedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Preview - WITH REACT MARKDOWN */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Content Preview
                </h3>
                <div className="border rounded-lg p-6 bg-white">
                  {content ? (
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom styling for beautiful rendering
                          h1: ({ children }) => (
                            <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-bold text-gray-900 mt-3 mb-1">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-700 leading-relaxed mb-3">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-gray-900">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-gray-800">{children}</em>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside space-y-1 my-2 ml-4">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside space-y-1 my-2 ml-4">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-700 leading-relaxed">
                              {children}
                            </li>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-green-500 pl-3 my-2 italic text-gray-600 bg-green-50 py-1 rounded-r">
                              {children}
                            </blockquote>
                          ),
                          code: ({ children, className }) => {
                            const isInline = !className;

                            if (isInline) {
                              return (
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                                  {children}
                                </code>
                              );
                            }

                            return (
                              <pre className="bg-gray-900 text-gray-100 p-3 rounded my-2 overflow-x-auto text-sm">
                                <code className="font-mono block">
                                  {children}
                                </code>
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
                        }}
                      >
                        {content.length > 1000
                          ? `${content.substring(0, 1000)}...`
                          : content}
                      </ReactMarkdown>

                      {content.length > 1000 && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm text-yellow-800">
                            Content truncated. {content.length - 1000}{" "}
                            characters hidden.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No content available</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Story not found</p>
            </div>
          )}
        </ScrollArea>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          {story && (
            <Button asChild>
              <Link href={`/story/${story.slug}`} target="_blank">
                View Full Story
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
