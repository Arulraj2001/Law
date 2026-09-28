import { sanityClient } from "./client";
import { groq } from "next-sanity";

// ==========================================
// SITE SETTINGS
// ==========================================
const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    founderName,
    establishedYear,
    phone,
    whatsapp,
    email,
    address,
    mapUrl,
    logo { asset->{ url, metadata { dimensions } } },
    ogImage { asset->{ url } },
    socialLinks,
    stats,
    seoTitle,
    seoDescription
  }
`;

export async function getSiteSettingsSanity() {
  return sanityClient.fetch(SITE_SETTINGS_QUERY, {}, {
    next: { tags: ["settings"], revalidate: 3600 },
  });
}

// ==========================================
// COURSES
// ==========================================
const ALL_COURSES_QUERY = groq`
  *[_type == "course" && isActive == true] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    badge,
    badgeColor,
    shortDescription,
    duration,
    mode,
    fee,
    feeNote,
    highlights,
    isFeatured,
    sortOrder,
    coverImage { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getAllCoursesSanity() {
  return sanityClient.fetch(ALL_COURSES_QUERY, {}, {
    next: { tags: ["courses"], revalidate: 3600 },
  });
}

const COURSE_BY_SLUG_QUERY = groq`
  *[_type == "course" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    badge,
    badgeColor,
    shortDescription,
    fullDescription,
    duration,
    mode,
    fee,
    feeNote,
    highlights,
    subjects,
    syllabus,
    coverImage { asset->{ url, metadata { dimensions } } },
    seoTitle,
    seoDescription
  }
`;

export async function getCourseBySlugSanity(slug: string) {
  return sanityClient.fetch(COURSE_BY_SLUG_QUERY, { slug }, {
    next: { tags: ["courses"], revalidate: 3600 },
  });
}

const COURSE_BY_SLUG_FULL_QUERY = groq`
  *[_type == "course" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    badge,
    badgeColor,
    shortDescription,
    fullDescription,
    duration,
    mode,
    fee,
    feeNote,
    highlights,
    subjects,
    syllabus[] {
      stage,
      topics
    },
    coverImage { 
      asset->{ url, metadata { dimensions } } 
    },
    isFeatured,
    sortOrder,
    seoTitle,
    seoDescription,
    "faqs": *[_type == "courseFaq" && course._ref == ^._id && isActive == true] | order(sortOrder asc) {
      question,
      answer
    }
  }
`;

export async function getCourseFullData(slug: string) {
  const isMockEnv =
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your_project_id";

  if (isMockEnv) {
    return null;
  }

  try {
    return await sanityClient.fetch(
      COURSE_BY_SLUG_FULL_QUERY,
      { slug },
      { next: { tags: ["courses"], revalidate: 3600 } }
    );
  } catch (err) {
    console.error(`getCourseFullData(${slug}) failed:`, err);
    return null;
  }
}

// ==========================================
// BATCHES
// ==========================================
const ACTIVE_BATCHES_QUERY = groq`
  *[_type == "batch" && isActive == true && status != "completed"] 
  | order(startDate asc) {
    _id,
    courseName,
    "course": course->{ title, "slug": slug.current },
    startDate,
    timing,
    mode,
    totalSeats,
    seatsFilled,
    status,
    notes
  }
`;

export async function getActiveBatchesSanity() {
  return sanityClient.fetch(ACTIVE_BATCHES_QUERY, {}, {
    next: { tags: ["batches"], revalidate: 1800 },
  });
}

// ==========================================
// FACULTY
// ==========================================
const ALL_FACULTY_QUERY = groq`
  *[_type == "faculty" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    designation,
    qualification,
    specialization,
    experienceYears,
    shortBio,
    credentials,
    isFounder,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getAllFacultySanity() {
  return sanityClient.fetch(ALL_FACULTY_QUERY, {}, {
    next: { tags: ["faculty"], revalidate: 3600 },
  });
}

const FOUNDER_QUERY = groq`
  *[_type == "faculty" && isFounder == true && isActive == true][0] {
    _id,
    name,
    designation,
    qualification,
    specialization,
    experienceYears,
    shortBio,
    fullBio,
    credentials,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getFounderSanity() {
  return sanityClient.fetch(FOUNDER_QUERY, {}, {
    next: { tags: ["faculty"], revalidate: 3600 },
  });
}

// ==========================================
// TOPPERS
// ==========================================
const FEATURED_TOPPERS_QUERY = groq`
  *[_type == "topper" && isActive == true && isFeatured == true] 
  | order(sortOrder asc) [0...8] {
    _id,
    name,
    post,
    "course": course->{ title },
    courseName,
    college,
    batchYear,
    district,
    rank,
    quote,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getFeaturedToppersSanity() {
  return sanityClient.fetch(FEATURED_TOPPERS_QUERY, {}, {
    next: { tags: ["toppers"], revalidate: 3600 },
  });
}

const ALL_TOPPERS_QUERY = groq`
  *[_type == "topper" && isActive == true] | order(sortOrder asc) {
    _id,
    name,
    post,
    "course": course->{ title },
    courseName,
    college,
    batchYear,
    district,
    rank,
    quote,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getAllToppersSanity() {
  return sanityClient.fetch(ALL_TOPPERS_QUERY, {}, {
    next: { tags: ["toppers"], revalidate: 3600 },
  });
}

// ==========================================
// TESTIMONIALS
// ==========================================
const FEATURED_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && isActive == true && isFeatured == true] 
  | order(sortOrder asc) [0...4] {
    _id,
    studentName,
    currentPost,
    "course": course->{ title },
    courseName,
    college,
    batchYear,
    quote,
    videoUrl,
    type,
    rating,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getFeaturedTestimonialsSanity() {
  return sanityClient.fetch(FEATURED_TESTIMONIALS_QUERY, {}, {
    next: { tags: ["testimonials"], revalidate: 3600 },
  });
}

const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && isActive == true] 
  | order(sortOrder asc) {
    _id,
    studentName,
    currentPost,
    "course": course->{ title },
    courseName,
    college,
    batchYear,
    quote,
    videoUrl,
    type,
    rating,
    isFeatured,
    photo { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getAllTestimonialsSanity() {
  return sanityClient.fetch(ALL_TESTIMONIALS_QUERY, {}, {
    next: { tags: ["testimonials"], revalidate: 3600 },
  });
}


// ==========================================
// BLOG POSTS
// ==========================================
const PUBLISHED_POSTS_QUERY = groq`
  *[_type == "blogPost" && status == "published"] 
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    readingTime,
    "author": author->{ name, photo { asset->{ url } } },
    coverImage { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getPublishedPosts() {
  return sanityClient.fetch(PUBLISHED_POSTS_QUERY, {}, {
    next: { tags: ["blog"], revalidate: 1800 },
  });
}

const LATEST_POSTS_QUERY = groq`
  *[_type == "blogPost" && status == "published"] 
  | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    readingTime,
    coverImage { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getLatestPosts(limit: number = 3) {
  return sanityClient.fetch(LATEST_POSTS_QUERY, { limit }, {
    next: { tags: ["blog"], revalidate: 1800 },
  });
}

const POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    body,
    excerpt,
    category,
    tags,
    publishedAt,
    readingTime,
    focusKeyword,
    seoTitle,
    seoDescription,
    canonicalUrl,
    "author": author->{ 
      name, 
      designation,
      photo { asset->{ url } } 
    },
    "relatedCourse": relatedCourse->{ 
      title, 
      "slug": slug.current 
    },
    coverImage { asset->{ url, metadata { dimensions } } }
  }
`;

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug }, {
    next: { tags: ["blog"], revalidate: 1800 },
  });
}

const POST_SLUGS_QUERY = groq`
  *[_type == "blogPost" && status == "published"] { 
    "slug": slug.current 
  }
`;

export async function getAllPostSlugs() {
  return sanityClient.fetch(POST_SLUGS_QUERY, {}, {
    next: { tags: ["blog"] },
  });
}

// ==========================================
// EXAM UPDATES
// ==========================================
const LATEST_EXAM_UPDATES_QUERY = groq`
  *[_type == "examUpdate" && isActive == true] 
  | order(_createdAt desc) [0...$limit] {
    _id,
    title,
    examName,
    type,
    content,
    notificationDate,
    lastDate,
    officialLink,
    isFeatured
  }
`;

export async function getLatestExamUpdatesSanity(limit: number = 5) {
  return sanityClient.fetch(LATEST_EXAM_UPDATES_QUERY, { limit }, {
    next: { tags: ["exam-updates"], revalidate: 900 },
  });
}

// ==========================================
// FAQS
// ==========================================
const ALL_FAQS_QUERY = groq`
  *[_type == "faq" && isActive == true] |
  order(category asc, sortOrder asc) {
    _id,
    question,
    answer,
    category,
    sortOrder,
    showOnHomepage
  }
`;

export async function getAllFAQsSanity() {
  const isMockEnv =
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your_project_id";

  if (isMockEnv) return [];

  try {
    return await sanityClient.fetch(
      ALL_FAQS_QUERY,
      {},
      { next: { 
        tags: ['faqs'], 
        revalidate: 3600 
      }}
    );
  } catch (err) {
    console.error("getAllFAQsSanity failed:", err);
    return [];
  }
}

const HOMEPAGE_FAQS_QUERY = groq`
  *[_type == "faq" && 
    isActive == true && 
    showOnHomepage == true] |
  order(sortOrder asc) [0...8] {
    _id,
    question,
    answer
  }
`;

export async function getHomepageFAQsSanity() {
  const isMockEnv =
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your_project_id";

  if (isMockEnv) return [];

  try {
    return await sanityClient.fetch(
      HOMEPAGE_FAQS_QUERY,
      {},
      { next: { 
        tags: ['faqs'], 
        revalidate: 3600 
      }}
    );
  } catch (err) {
    console.error("getHomepageFAQsSanity failed:", err);
    return [];
  }
}

// ==========================================
// SITE SETTINGS FULL
// ==========================================
const SITE_SETTINGS_FULL_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    founderName,
    establishedYear,
    phone,
    whatsapp,
    email,
    address,
    mapUrl,
    logo { asset->{ url } },
    ogImage { asset->{ url } },
    socialLinks,
    stats,
    seoTitle,
    seoDescription,
    whyUsFeatures,
    processSteps,
    mission,
    vision,
    values,
    milestones
  }
`;

export async function getSiteSettingsFull() {
  const isMockEnv =
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your_project_id";

  if (isMockEnv) return null;

  try {
    return await sanityClient.fetch(
      SITE_SETTINGS_FULL_QUERY,
      {},
      { next: { 
        tags: ['settings'], 
        revalidate: 3600 
      }}
    );
  } catch (err) {
    console.error("getSiteSettingsFull failed:", err);
    return null;
  }
}

