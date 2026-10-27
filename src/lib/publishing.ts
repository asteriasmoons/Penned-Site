export interface PublishedPage {
  version: number;
  updatedAt: string;
  navigation?: { parentPage: string | null; parentTitle: string };
  snapshots?: Array<{ page: string | null; publication: PublishedPage }>;
  document: {
    schemaVersion: 1;
    title: string;
    subtitle: string | null;
    icon: string | null;
    cover: Record<string, unknown> | null;
    appearance: Record<string, unknown>;
    content: Record<string, unknown>;
    media: Array<{ id: string; name: string; mimeType: string; size: number; sha256: string }>;
    authorAvatar?: { mediaID: string };
  };
  settings: { showTitle: boolean; showAuthor: boolean; showTableOfContents: boolean; allowIndexing: boolean; allowFollowLinkedContent?: boolean; authorName?: string; expiresAt?: string | null; showBranding?: boolean; hideHashtags?: boolean };
}

export const publicationIdentifier = /^(?:[a-f0-9]{64}|[a-z0-9][a-z0-9-]{1,78}[a-z0-9])$/;
export const linkedPageKey = /^page-[a-f0-9]{32}$/;
export const readerCookieName = (identifier: string) => "penned_reader_" + identifier;
export class ReaderAccessRequired extends Error {
  password: boolean; email: boolean;
  constructor(password: boolean,email: boolean) { super("Reader access required"); this.password=password;this.email=email; }
}

export function createPublishingReader(projectURL: string, fetchImplementation: typeof fetch = fetch) {
  const project = new URL(projectURL);
  if (project.protocol !== "https:" || project.username || project.password || project.search || project.hash || !["", "/"].includes(project.pathname)) throw new Error("Invalid Penned publishing project URL");
  const root = project.origin + "/functions/v1/penned-publishing/public/";
  function checkedToken(token: string) {
    if (!publicationIdentifier.test(token)) throw new Error("Invalid publication token");
    return token;
  }
  return {
    async read(token: string, signal?: AbortSignal, readerToken?: string, page?: string, snapshots = false): Promise<PublishedPage | null> {
      if (page != null && !linkedPageKey.test(page)) throw new Error("Invalid linked page");
      const response = await fetchImplementation(root + checkedToken(token) + (page ? "/pages/" + page : "") + (snapshots ? "?snapshots=1" : ""), { signal, credentials: "omit", referrerPolicy: "no-referrer", redirect: "error", cache: "no-store", headers: readerToken ? { "X-Penned-Reader": readerToken } : undefined });
      if(response.status===401){const gate=await response.json();if(gate.error==="access_required")throw new ReaderAccessRequired(gate.password===true,gate.email===true);}
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
