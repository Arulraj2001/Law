"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getNodeText(children: any): string {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getNodeText).join("");
  if (children.props?.text) return children.props.text;
  if (children.props?.children) return getNodeText(children.props.children);
  return "";
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const text = getNodeText(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="font-heading font-bold text-2xl sm:text-[28px] text-navy-dark mt-10 mb-4 scroll-mt-24"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = getNodeText(children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="font-heading font-bold text-xl sm:text-[22px] text-navy-dark mt-8 mb-3 scroll-mt-24"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="font-heading font-bold text-lg text-slate-800 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-base sm:text-[17px] text-slate-700 leading-[1.8] mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald pl-6 py-4 my-6 italic text-slate-700 bg-navy-tint/30 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-navy-dark">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-navy-tint/70 text-navy-dark font-mono text-xs sm:text-sm px-2 py-0.5 rounded border border-navy-light/20">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href || "#"}
          target={target}
          rel={rel}
          className="text-emerald hover:text-navy-dark underline underline-offset-2 font-medium transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-slate-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-slate-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-sm sm:text-base leading-[1.7]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-sm sm:text-base leading-[1.7]">{children}</li>
    ),
  },

  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url || value?.url;
      if (!imageUrl) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full h-[320px] sm:h-[420px] rounded-xl overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={value?.alt || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="text-center text-xs sm:text-sm text-slate-500 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const type = value?.type || "tip";
      const iconMap = {
        info: {
          icon: Info,
          style: "bg-blue-50 border-blue-500 text-blue-950",
          iconColor: "text-blue-600",
          label: "Information",
        },
        warning: {
          icon: AlertTriangle,
          style: "bg-amber-50 border-amber-500 text-amber-950",
          iconColor: "text-amber-600",
          label: "Important Warning",
        },
        tip: {
          icon: Lightbulb,
          style: "bg-emerald-50 border-emerald text-emerald-950",
          iconColor: "text-emerald",
          label: "Mentor Tip",
        },
      };

      const selected = iconMap[type as keyof typeof iconMap] || iconMap.tip;
      const Icon = selected.icon;

      return (
        <div
          className={`border-l-4 rounded-r-xl p-5 my-6 ${selected.style} shadow-xs`}
        >
          <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
            <Icon className={`w-4 h-4 ${selected.iconColor}`} />
            <span>{value?.title || selected.label}</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            {value?.text || value?.content}
          </p>
        </div>
      );
    },
  },
};

interface PortableTextRendererProps {
  content: any;
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center my-8">
        <h4 className="font-heading font-bold text-navy-dark text-lg mb-2">
          Comprehensive Content Coming Soon
        </h4>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-4">
          Our faculty is currently drafting the expanded version of this guide. Subscribe to our WhatsApp channel or explore our courses in the meantime.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-navy-dark text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="article-body">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}

export default PortableTextRenderer;
