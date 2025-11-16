import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/helpers";
import { ROUTES } from "@/libs/constants/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [ROUTES.HOME, ROUTES.REGISTER],
      disallow: "/",
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
