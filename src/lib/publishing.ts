export interface PublishedPage {
  version: number;
  updatedAt: string;
  document: {
    schemaVersion: 1;
    title: string;
    subtitle: string | null;
    icon: string | null;
    cover: Record<string, unknown> | null;
    appearance: Record<string, unknown>;
    content: Record<string, unknown>;
    media: Array<{ id: string; name: string; mimeType: string; size: number; sha256: string }>;
  };
  settings: { showTitle: boolean; showAuthor: boolean; showTableOfContents: boolean; allowIndexing: boolean; allowFollowLinkedContent?: boolean; authorName?: string; expiresAt?: string | null };
}

export function createPublishingReader(projectURL: string, fetchImplementation: typeof fetch = fetch) {
  const project = new URL(projectURL);
  if (project.protocol !== "https:" || project.username || project.password || project.search || project.hash || !["", "/"].includes(project.pathname)) throw new Error("Invalid Penned publishing project URL");
  const root = project.origin + "/functions/v1/penned-publishing/public/";
  function checkedToken(token: string) {
    if (!/^[a-f0-9]{64}$/.test(token)) throw new Error("Invalid publication token");
    return token;
  }
  return {
    async read(token: string, signal?: AbortSignal): Promise<PublishedPage | null> {
      const response = await fetchImplementation(root + checkedToken(token), { signal, credentials: "omit", referrerPolicy: "no-referrer", redirect: "error", cache: "no-store" });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error("The published document could not be loaded");
      const value = await response.json();
      if (!Number.isSafeInteger(value.version) || value.version < 1 || value.document?.schemaVersion !== 1 || value.document?.content?.type !== "doc" || !value.settings || !Array.isArray(value.document.media)) throw new Error("Unsupported Penned publication response");
      return value as PublishedPage;
    },
    mediaURL(token: string, mediaID: string): string {
      if (!/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(mediaID)) throw new Error("Invalid publication media identifier");
      return root + checkedToken(token) + "/media/" + mediaID.toLowerCase();
    },
  };
}
