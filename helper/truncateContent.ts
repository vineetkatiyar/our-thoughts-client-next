export function truncateContent(content: any, limit: number = 140) {
  if (!content) return "";

  // If content is JSON with markdown inside
  const markdown = typeof content === "object" ? content.markdown || "" : String(content);

  // Remove markdown symbols (#, *, etc.)
  const plain = markdown
    .replace(/[#>*`~\-]/g, " ") // remove most markdown chars
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // remove markdown links
    .replace(/\s+/g, " ") // collapse spaces
    .trim();

  if (plain.length <= limit) return plain;
  return plain.substring(0, limit).trim() + "…";
}
