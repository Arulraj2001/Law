import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { _type, slug } = body;

    const triggerRevalidateTag = (tag: string) => {
      try {
        (revalidateTag as any)(tag, "default");
      } catch {
        (revalidateTag as any)(tag);
      }
    };

    switch (_type) {
      case "blogPost":
        triggerRevalidateTag("blog");
        revalidatePath("/blog");
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`);
        }
        break;

      case "course":
        triggerRevalidateTag("courses");
        revalidatePath("/courses/civil-judge");
        revalidatePath("/courses/app-exam");
        revalidatePath("/courses/patent-agent");
        revalidatePath("/courses/trademark-agent");
        revalidatePath("/courses/ugc-net-law");
        revalidatePath("/courses/set-law");
        revalidatePath("/courses");
        revalidatePath("/");
        break;

      case "topper":
        triggerRevalidateTag("toppers");
        revalidatePath("/results");
        revalidatePath("/");
        break;

      case "testimonial":
        triggerRevalidateTag("testimonials");
        revalidatePath("/testimonials");
        revalidatePath("/");
        break;

      case "siteSettings":
        triggerRevalidateTag("settings");
        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/contact");
        revalidatePath("/faculty");
        revalidatePath("/courses/civil-judge");
        revalidatePath("/courses/app-exam");
        revalidatePath("/courses/patent-agent");
        revalidatePath("/courses/trademark-agent");
        revalidatePath("/courses/ugc-net-law");
        revalidatePath("/courses/set-law");
        break;

      case "faq":
        triggerRevalidateTag("faqs");
        revalidatePath("/faq");
        revalidatePath("/");
        break;

      case "courseFaq":
        triggerRevalidateTag("courses");
        revalidatePath("/courses/civil-judge");
        revalidatePath("/courses/app-exam");
        revalidatePath("/courses/patent-agent");
        revalidatePath("/courses/trademark-agent");
        revalidatePath("/courses/ugc-net-law");
        revalidatePath("/courses/set-law");
        break;

      case "faculty":
        triggerRevalidateTag("faculty");
        revalidatePath("/faculty");
        revalidatePath("/about");
        revalidatePath("/");
        break;

      case "batch":
        triggerRevalidateTag("batches");
        revalidatePath("/");
        break;

      case "examUpdate":
        triggerRevalidateTag("exam-updates");
        revalidatePath("/blog");
        revalidatePath("/");
        break;

      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}
