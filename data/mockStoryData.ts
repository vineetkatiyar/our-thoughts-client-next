import { Story } from "@/types/stroyType";

export const mockStoryData: {
  message: string;
  story: Story;
  success: boolean;
} = {
  message: "Story fetched successfully",
  story: {
    id: "d9987065-a5ab-44a1-bde5-0d79be5c0939",
    slug: "my-first-poem",
    title: "My first Poem",
    content: `This is the content of my beautiful story...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    coverImage: null,
    status: "PUBLISHED" as const, // Use const assertion
    visibility: "PUBLIC" as const, // Use const assertion
    publishedAt: null,
    authorId: "6fe7127d-38ea-41f8-98c7-3c70cdcdbb88",
    createdAt: "2025-10-28T02:28:23.273Z",
    updatedAt: "2025-10-28T02:28:23.273Z",
    author: {
      id: "6fe7127d-38ea-41f8-98c7-3c70cdcdbb88",
      name: "vineetkatiyarr",
    },
  },
  success: true,
};
