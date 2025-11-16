import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/helpers";
import { ROUTES } from "@/libs/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}${ROUTES.REGISTER}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${getBaseUrl()}${ROUTES.LOGIN}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
