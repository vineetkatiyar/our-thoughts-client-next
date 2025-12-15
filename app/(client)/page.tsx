import Feed from "@/components/client/feed";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Story App - https://story-app-next.vercel.app",
  description: "A beautiful storytelling platform",
  keywords: [
    "coding",
    "hitlar",
    "storyapp",
    "vineet katiyar",
    "vineet katiyar story app",
  ],
};

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <Feed />
    </div>
  );
}
