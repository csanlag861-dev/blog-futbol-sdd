export function shouldOptimizeImage(source: string) {
  if (source.startsWith("/") && !source.startsWith("//")) return true;

  try {
    const imageUrl = new URL(source);
    return imageUrl.protocol === "https:" && imageUrl.hostname === "images.unsplash.com";
  } catch {
    return false;
  }
}
