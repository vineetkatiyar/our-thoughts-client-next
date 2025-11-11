export function truncateContent(content: string, maxLength: number = 150) {
  return content.length <= maxLength
    ? content
    : content.substring(0, maxLength) + "...";
}