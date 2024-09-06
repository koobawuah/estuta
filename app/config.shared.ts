import * as siteMeta from "@/site.json";
export const APP_NAME = siteMeta.name;

export function title(pageTitle?: string) {
  if (!pageTitle) return APP_NAME;

  return `${pageTitle} | ${APP_NAME}`;
}
