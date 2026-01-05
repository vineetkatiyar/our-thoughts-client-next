export async function getStoryMeta(slug: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/story/meta/${slug}`,
        { cache: "no-store" }
      );
  
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }
  