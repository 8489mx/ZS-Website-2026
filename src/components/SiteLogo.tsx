
interface SiteLogoProps {
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Site logo with a display-sized WebP source and the original PNG as
 * fallback. The PNG file stays in public/ for crawlers and old browsers.
 */
export default function SiteLogo({
  alt = "Z Systems",
  width,
  height,
  className,
  fetchPriority,
}: SiteLogoProps) {
  return (
    <picture className="contents">
      <source srcSet="/logo.webp" type="image/webp" />
      <img
        src="/logo.png"
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
