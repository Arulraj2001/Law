export * from "./site-config.shared";
import { SITE_CONFIG_FALLBACK, type SiteConfig } from "./site-config.shared";

// Server-side fetch — use in Server Components
export async function getSiteConfig(): Promise<SiteConfig> {
  const isMockEnv =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

  if (isMockEnv) {
    return SITE_CONFIG_FALLBACK;
  }

  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error || !data || data.length === 0) {
      return SITE_CONFIG_FALLBACK;
    }

    const settings = data.reduce(
      (acc, row) => {
        if (row.value) acc[row.key] = row.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return {
      name: settings.site_name || SITE_CONFIG_FALLBACK.name,
      tagline: settings.tagline || SITE_CONFIG_FALLBACK.tagline,
      phone: settings.phone || SITE_CONFIG_FALLBACK.phone,
      whatsapp: settings.whatsapp || SITE_CONFIG_FALLBACK.whatsapp,
      email: settings.email || SITE_CONFIG_FALLBACK.email,
      address: settings.address || SITE_CONFIG_FALLBACK.address,
      establishedYear:
        settings.established_year || SITE_CONFIG_FALLBACK.establishedYear,
      mapUrl: settings.map_url || SITE_CONFIG_FALLBACK.mapUrl,
      social: {
        youtube:
          settings.youtube_url || SITE_CONFIG_FALLBACK.social.youtube,
        instagram:
          settings.instagram_url || SITE_CONFIG_FALLBACK.social.instagram,
        facebook:
          settings.facebook_url || SITE_CONFIG_FALLBACK.social.facebook,
        whatsappChannel:
          settings.whatsapp_channel ||
          SITE_CONFIG_FALLBACK.social.whatsappChannel,
      },
      stats: {
        studentsCount:
          settings.students_count || SITE_CONFIG_FALLBACK.stats.studentsCount,
        judgesCount:
          settings.judges_count || SITE_CONFIG_FALLBACK.stats.judgesCount,
        experienceYears:
          settings.experience_years ||
          SITE_CONFIG_FALLBACK.stats.experienceYears,
        statesCount:
          settings.states_count || SITE_CONFIG_FALLBACK.stats.statesCount,
      },
      seo: {
        title: settings.seo_title || SITE_CONFIG_FALLBACK.seo.title,
        description:
          settings.seo_description || SITE_CONFIG_FALLBACK.seo.description,
      },
    };
  } catch (err) {
    console.error("getSiteConfig failed, returning fallback:", err);
    return SITE_CONFIG_FALLBACK;
  }
}
