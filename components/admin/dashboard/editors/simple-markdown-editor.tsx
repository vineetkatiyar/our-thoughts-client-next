// components/editors/simple-markdown-editor.tsx
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Type,
  Eye,
  Edit,
  Code,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  onBlur,
  placeholder,
}: MarkdownEditorProps) {
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    if (newHistory.length > 50) newHistory.shift();

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      onChange(history[newIndex]);
    }
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector(
      'textarea[name="content"]'
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = value;
    let newSelectionStart = start;
    let newSelectionEnd = end;

    switch (format) {
      case "bold":
        newText =
          value.substring(0, start) +
          `**${selectedText || "bold text"}**` +
          value.substring(end);
        newSelectionStart = selectedText ? start + 2 : start + 2;
        newSelectionEnd = selectedText ? end + 2 : start + 11;
        break;

      case "italic":
        newText =
          value.substring(0, start) +
          `*${selectedText || "italic text"}*` +
          value.substring(end);
        newSelectionStart = selectedText ? start + 1 : start + 1;
        newSelectionEnd = selectedText ? end + 1 : start + 12;
        break;

      case "heading1":
        newText =
          value.substring(0, start) +
          `# ${selectedText || "Heading 1"}` +
          value.substring(end);
        newSelectionStart = selectedText ? start + 2 : start + 2;
        newSelectionEnd = selectedText ? end + 2 : start + 11;
        break;

      case "heading2":
        newText =
          value.substring(0, start) +
          `## ${selectedText || "Heading 2"}` +
          value.substring(end);
        newSelectionStart = selectedText ? start + 3 : start + 3;
        newSelectionEnd = selectedText ? end + 3 : start + 12;
        break;

      case "bulletList":
        if (selectedText) {
          const bulletedText = selectedText
            .split("\n")
            .map((line) => `- ${line}`)
            .join("\n");
          newText =
            value.substring(0, start) + bulletedText + value.substring(end);
        } else {
          newText =
            value.substring(0, start) + `- List item` + value.substring(end);
          newSelectionStart = start + 2;
          newSelectionEnd = start + 11;
        }
        break;

      case "numberedList":
        if (selectedText) {
          const numberedText = selectedText
            .split("\n")
            .map((line, index) => `${index + 1}. ${line}`)
            .join("\n");
          newText =
            value.substring(0, start) + numberedText + value.substring(end);
        } else {
          newText =
            value.substring(0, start) + `1. List item` + value.substring(end);
          newSelectionStart = start + 3;
          newSelectionEnd = start + 12;
        }
        break;

      case "quote":
        if (selectedText) {
          const quotedText = selectedText
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n");
          newText =
            value.substring(0, start) + quotedText + value.substring(end);
        } else {
          newText =
            value.substring(0, start) + `> Quote text` + value.substring(end);
          newSelectionStart = start + 2;
          newSelectionEnd = start + 12;
        }
        break;

      case "code":
        if (selectedText) {
          newText =
            value.substring(0, start) +
            "```\n" +
            selectedText +
            "\n```" +
            value.substring(end);
          newSelectionStart = start + 4;
          newSelectionEnd = end + 4;
        } else {
          newText =
            value.substring(0, start) +
            "```\n// Your code here\n```" +
            value.substring(end);
          newSelectionStart = start + 4;
          newSelectionEnd = start + 20;
        }
        break;
    }

    handleChange(newText);

    setTimeout(() => {
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="space-y-3 lg:space-y-4">
      {/* Header with View Toggle - Mobile Optimized */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          <span className="font-medium text-gray-900 text-sm lg:text-base">
            Content
          </span>
        </div>

        <div className="flex items-center gap-1 lg:gap-2">
          <Button
            type="button"
            variant={viewMode === "edit" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("edit")}
            className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-9"
          >
            <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>

          <Button
            type="button"
            variant={viewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("preview")}
            className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm h-8 lg:h-9"
          >
            <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
        </div>
      </div>

      {/* Edit Mode */}
      {viewMode === "edit" && (
        <div className=" rounded-lg">
          {/* Mobile Toolbar Toggle */}
          <div className="lg:hidden flex justify-between items-center p-3 border-b">
            <span className="text-sm font-medium">Formatting Tools</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsToolbarExpanded(!isToolbarExpanded)}
              className="h-8 w-8 p-0"
            >
              {isToolbarExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Toolbar - Mobile: Collapsible, Desktop: Always Visible */}
          <div
            className={`${isToolbarExpanded ? "block" : "hidden"} lg:block p-3 lg:p-4 border-b bg-gray-50/50`}
          >
            <div className="flex items-center gap-1 flex-wrap">
              {/* Undo/Redo */}
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                >
                  <Undo2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                >
                  <Redo2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>

              <div className="w-px h-4 bg-gray-300 mx-1 lg:mx-2" />

              {/* Text Formatting */}
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("bold")}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                  title="Bold"
                >
                  <Bold className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("italic")}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                  title="Italic"
                >
                  <Italic className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("code")}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                  title="Code Block"
                >
                  <Code className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>

              <div className="w-px h-4 bg-gray-300 mx-1 lg:mx-2" />

              {/* Headings */}
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("heading1")}
                  className="h-7 px-2 lg:h-8 lg:px-2 text-xs lg:text-sm"
                  title="Heading 1"
                >
                  H1
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("heading2")}
                  className="h-7 px-2 lg:h-8 lg:px-2 text-xs lg:text-sm"
                  title="Heading 2"
                >
                  H2
                </Button>
              </div>

              <div className="w-px h-4 bg-gray-300 mx-1 lg:mx-2" />

              {/* Lists */}
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("bulletList")}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                  title="Bullet List"
                >
                  <List className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("numberedList")}
                  className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                  title="Numbered List"
                >
                  <ListOrdered className="w-3 h-3 lg:w-4 lg:h-4" />
                </Button>
              </div>

              <div className="w-px h-4 bg-gray-300 mx-1 lg:mx-2" />

              {/* Quote */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("quote")}
                className="h-7 w-7 lg:h-8 lg:w-8 p-0"
                title="Quote"
              >
                <Quote className="w-3 h-3 lg:w-4 lg:h-4" />
              </Button>
            </div>
          </div>

          {/* Editor - No Borders */}
          <Textarea
            name="content"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={onBlur}
            placeholder={
              placeholder ||
              `Start writing your story...

# Heading 1
## Heading 2
**bold text**
*italic text*
- bullet list
1. numbered list`
            }
            className="min-h-[400px] lg:min-h-[500px] resize-none border-0 font-mono text-sm leading-relaxed focus:ring-0 focus-visible:ring-0 shadow-none whitespace-pre p-4 lg:p-6"
          />

          {/* Mobile Help - Simplified */}
          <div className="p-3 lg:p-4 border-t bg-gray-50/50">
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
              <Type className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">
                Markdown: # H1, **bold**, *italic*, - list
              </span>
              <span className="sm:hidden"># H1, **bold**, *italic*</span>
            </div>
          </div>
        </div>
      )}

      {/* Preview Mode */}
      {viewMode === "preview" && (
        <div className=" rounded-lg">
          <div className="p-4 lg:p-6 border-b">
            <div className="flex items-center gap-2 text-sm lg:text-base font-medium">
              <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
              Preview
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="min-h-[400px] lg:min-h-[500px] p-4 lg:p-6 prose prose-sm lg:prose-lg max-w-none">
              {value ? (
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl lg:text-3xl font-bold mt-4 lg:mt-6 mb-3 lg:mb-4 border-b pb-2">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl lg:text-2xl font-bold mt-3 lg:mt-5 mb-2 lg:mb-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg lg:text-xl font-bold mt-2 lg:mt-4 mb-1 lg:mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 lg:mb-4 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside my-3 lg:my-4 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside my-3 lg:my-4 space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="ml-2 lg:ml-4">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4  border-gray-300 pl-3 lg:pl-4 my-3 lg:my-4 italic text-gray-700 dark:text-gray-300">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="bg-gray-100 px-1 rounded text-xs lg:text-sm">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <pre className="bg-gray-100 p-3 lg:p-4 rounded-lg my-3 lg:my-4 overflow-x-auto text-xs lg:text-sm">
                          <code>{children}</code>
                        </pre>
                      );
                    },
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              ) : (
                <div className="text-gray-500 italic text-center py-16 lg:py-20 text-sm lg:text-base">
                  Nothing to preview. Start writing in edit mode.
                </div>
              )}
            </div>

            {/* Character Count */}
            <div className="mt-4 text-xs lg:text-sm text-gray-500 text-center">
              {value.length} characters •{" "}
              {value.split(/\s+/).filter((word) => word.length > 0).length}{" "}
              words
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
