import StoryDetail from "@/components/client/storyDetails";
import StoryDetailLoading from "@/components/client/storyLoading";
import axiosServer from "@/lib/axiosServer";
import { Suspense } from "react";

interface StoryPageProps {
  params: { storySlug: string };
}

async function getStoryBySlug(slug: string) {
  try {
    const res = await axiosServer.get(`/story/${slug}`);
    return res.data;
  } catch (error: any) {
    console.error(
      "Story fetch failed:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to load story");
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const storyData = await getStoryBySlug(params.storySlug);

  return (
    <Suspense fallback={<StoryDetailLoading />}>
      <StoryDetail story={storyData.story} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: StoryPageProps) {
  const storyData = await getStoryBySlug(params.storySlug);
  const story = storyData.story;
  return {
    title: `${story.title} - StoryApp`,
    description: story.content.substring(0, 160) + "...",
  };
}
