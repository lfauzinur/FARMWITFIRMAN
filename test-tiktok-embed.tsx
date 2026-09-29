export default function TikTokPlayer({ url }: { url: string }) {
  return (
    <>
      <blockquote className="tiktok-embed" cite={url} style={{ maxWidth: '605px', minWidth: '325px' }}>
        <section></section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </>
  );
}
