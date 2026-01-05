import NotFound from "@/app/not-found";
import StoryDetail from "@/components/client/storyDetails";
import StoryDetailLoading from "@/components/client/storyLoading";
import axiosServer from "@/lib/axiosServer";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "highlight.js/styles/github-dark.css";

interface StoryPageProps {
  params: { storySlug: string };
}

async function getStoryBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/story/${slug}`,
      {
        cache: "no-store", // important
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      console.error("API error:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { storySlug } = await params;

  const storyData = await getStoryBySlug(storySlug);

  if (!storyData?.story) {
    return {
      title: "Story not found - StoryApp",
      description: "This story does not exist or was removed.",
    };
  }

  const story = storyData.story;

  return {
    title: `${story.title} - StoryApp`,
    description:
      typeof story.content === "string"
        ? story.content.substring(0, 160)
        : "Read stories on StoryApp",
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storySlug } = await params;

  const storyData = await getStoryBySlug(storySlug);

  if (!storyData?.story) {
    notFound();
  }

  return (
    <Suspense fallback={<StoryDetailLoading />}>
      <StoryDetail story={storyData.story} />
    </Suspense>
  );
}
