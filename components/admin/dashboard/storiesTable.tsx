"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import StoriesTableLoading from "./storiesTableLoading";
import { Story } from "@/types/stroyType";

interface StoriesTableProps {
  stories: Story[];
  isLoading: boolean;
  canEditAll?: boolean;
}

export default function StoriesTable({ stories, isLoading, canEditAll }: StoriesTableProps) {
  if (isLoading) {
    return <StoriesTableLoading />;
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            {canEditAll && <TableHead>Author</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={canEditAll ? 6 : 5} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-gray-500">No stories found</p>
                  <Link href="/dashboard/stories/create">
                    <Button className="bg-[#4DAA57] hover:bg-[#3d8a47] text-white">
                      Create Your First Story
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            stories.map((story) => (
              <TableRow key={story.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">
                  <div>
                    <p className="font-semibold text-gray-900">{story.title}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {story.content.substring(0, 120)}...
                    </p>
                  </div>
                </TableCell>
                
                {canEditAll && (
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#4DAA57] rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {story.author.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700">{story.author.name}</span>
                    </div>
                  </TableCell>
                )}
                
                <TableCell>
                  <Badge 
                    variant={
                      story.status === 'PUBLISHED' ? 'default' :
                      story.status === 'DRAFT' ? 'secondary' : 'outline'
                    }
                    className={
                      story.status === 'PUBLISHED' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : story.status === 'DRAFT'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                    }
                  >
                    {story.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      story.visibility === 'PUBLIC'
                        ? 'border-blue-200 text-blue-700'
                        : 'border-gray-200 text-gray-700'
                    }
                  >
                    {story.visibility}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-gray-600">
                  {new Date(story.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/story/${story.slug}`} target="_blank">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/stories/${story.id}/edit`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#4DAA57] text-[#4DAA57] hover:bg-[#4DAA57] hover:text-white"
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}