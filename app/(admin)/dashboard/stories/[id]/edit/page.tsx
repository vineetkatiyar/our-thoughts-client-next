"use client";

import CreateStoryForm from "@/components/admin/dashboard/stories/creatStoriesForm";
import { useParams } from "next/navigation";

export default function EditStoryPage() {
  const params = useParams();
  const storyId = params.id as string;

  return <CreateStoryForm mode="edit" storyId={storyId} />;
}
