import icons from "../../vendor/penned-reader/icons.json";
import { documentFonts, renderPublicContent, safePhoto, validColor, contrastColor } from "../../vendor/penned-reader/index.mjs";
import { createPublishingReader, type PublishedPage } from "./publishing.ts";

// This is the existing public backend URL, not a server credential.
export const publishingProject = import.meta.env.PUBLIC_PENNED_SUPABASE_URL || "https://rfujrtehopxvybsjlwus.supabase.co";
export const reader = createPublishingReader(publishingProject);
export const iconURL = (name: string): string | undefined => {
  const catalogue = icons as Record<string, string>;
  return catalogue[name] || (["doc.text", "doc", "sf:doc", "sf:doc.text"].includes(name) || name.startsWith("sf:") ? catalogue.linedpages : undefined);
};

type ObjectValue = Record<string, unknown>;
function object(value: unknown): ObjectValue { return value && typeof value === "object" && !Array.isArray(value) ? value as ObjectValue : {}; }
export function presentPublication(page: PublishedPage, token: string) {
  const { document, settings } = page, appearance = object(document.appearance);
  const assets = new Set(document.media.map(asset => asset.id.toLowerCase()));
  function mediaURL(id: string) {
    if (!assets.has(id.toLowerCase())) throw new Error("Unreferenced publication media");
    return `/p/${token}/media/${id.toLowerCase()}`;
  }
  function background(value: unknown, fallback: string): { css: string; blur: boolean; faded: boolean; photo: ObjectValue } {
    const source = object(value), primary = validColor(source.colorHex) || fallback, secondary = validColor(source.secondaryColorHex) || primary;
    const direction = ({ topToBottom: "180deg", leftToRight: "90deg", diagonal: "135deg", bottomToTop: "0deg" } as Record<string, string>)[String(source.gradientDirection)] || "135deg";
    const photo = object(source.remotePhoto), image = typeof source.mediaID === "string" ? mediaURL(source.mediaID) : safePhoto(photo.imageURL);
    const css = source.kind === "none" ? "#000000" : source.kind === "gradient" ? `linear-gradient(${direction},${primary},${secondary})`
      : source.kind === "image" && image ? `url(${JSON.stringify(image)}) center/cover no-repeat ${primary}` : primary;
    return { css, blur: source.kind === "image" && source.blurImage === true, faded: source.effect === "faded", photo };
  }
  const outer = background(appearance.editorBackground, "#343434"), paper = background(appearance.innerPageBackground, "#242424");
  const ink = validColor(appearance.textColorHex) || "#F7F7F7";
  const font = documentFonts[String(appearance.fontStyle)] || documentFonts.rounded;
  const schemeBackground = object(appearance.themeID == null ? appearance.editorBackground : appearance.innerPageBackground);
  const rgb = Number.parseInt(String(schemeBackground.colorHex || "#242424").replace("#", "").slice(0, 6), 16);
  const light = ((rgb >> 16) & 255) * .2126 + ((rgb >> 8) & 255) * .7152 + (rgb & 255) * .0722 > 140;
  const styles = `--vellix-primary-text:${ink};--vellix-font-family:${font};--vellix-neutral-rgb:${light ? "33,29,41" : "255,255,255"};--vellix-secondary-text:${light ? "#686171" : "#9b9b9f"};--vellix-property-accent:${light ? "#7955a0" : "#b59ad9"};--vellix-link-color:${light ? "#7833bc" : "#8fe9ff"};--vellix-table-default-header:${light ? "#E7DEF2" : "#066DB0"};--reader-board-paper:${light ? "#FCFAFF" : "#2C2C2E"};--reader-board-ink:${light ? "#211D29" : "#E4E6F1"};--reader-paper-background:${paper.css};color:${ink};font-family:${font};color-scheme:${light ? "light" : "dark"}`;
  const rendered = renderPublicContent(document, { mediaURL, iconURL, allowFollowLinkedContent: settings.allowFollowLinkedContent === true, publicationURL: `/p/${token}` });
  const coverPhoto = object(appearance.coverPhoto);
  const cover = document.cover?.mediaID ? mediaURL(String(document.cover.mediaID)) : safePhoto(coverPhoto.imageURL);
  const showCover = appearance.showsCover === true || (appearance.showsCover == null && appearance.themeID != null);
  const themeColors: Record<string, string[]> = { lunarClouds: ["#07080A", "#2A1D44"], neonCode: ["#041314", "#140923"] };
  const original = themeColors[String(appearance.themeID)], saved = object(appearance.editorBackground);
  const theme = original && saved.kind === "gradient" && String(saved.colorHex).toUpperCase() === original[0] && String(saved.secondaryColorHex).toUpperCase() === original[1]
    && (saved.gradientDirection == null || saved.gradientDirection === "diagonal") ? String(appearance.themeID) : "";
  return { ...rendered, outer, paper, ink, font, light, styles, cover, coverPhoto, showCover,
    coverTheme: String(appearance.coverThemeID || appearance.themeID || "custom"),
    theme, author: settings.showAuthor ? settings.authorName || "" : "",
    authorAvatar: settings.showAuthor && document.authorAvatar ? mediaURL(document.authorAvatar.mediaID) : null,
    authorInitials: (settings.authorName || "").trim().split(/\s+/u).filter(Boolean).filter((_, i, names) => i === 0 || i === names.length - 1).map(name => Array.from(name)[0]).join("").toLocaleUpperCase().slice(0, 4) };
}

export function photoCredit(photo: Record<string, unknown>) {
  if (!safePhoto(photo.imageURL)) return null;
  const link = (value: unknown) => {
    try { const url = new URL(String(value)); return url.protocol === "https:" && url.hostname === "unsplash.com" ? url.href : undefined; } catch { return undefined; }
  };
  return { name: String(photo.photographer || "Photographer"), photographerURL: link(photo.photographerURL), sourceURL: link(photo.sourceURL) };
}
