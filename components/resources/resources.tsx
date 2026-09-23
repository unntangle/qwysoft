"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Grad } from "@/components/ui/grad";
import { RESOURCES } from "@/lib/constants";

/* ------------------------------------------------------------------
   Insights: one featured post and four smaller ones, all in cards
   shaped like Sarvam's voice cards — a white rounded card, a soft grey
   inset panel holding the blog cover, then a footer (type on the left,
   date on the right, title underneath).
------------------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

type Post = (typeof RESOURCES)[number];

function PostCard({ post, big, index }: { post: Post; big?: boolean; index: number }) {
  return (
    <motion.article
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
    >
      <a
        href={post.href ?? "#resources"}
        className="group flex h-full flex-col rounded-[28px] border border-line bg-white p-2 transition-shadow duration-500 hover:shadow-[0_24px_48px_-32px_rgba(23,19,31,0.35)]"
      >
        {/* Cover, filling the inset panel edge to edge */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-[#f4f4f5]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>

        {/* Footer */}
        <div className={`flex flex-1 flex-col ${big ? "px-4 pb-4 pt-5" : "px-3 pb-3 pt-4"}`}>
          <span className="text-[12.5px] text-ink-soft">{post.read}</span>
          <h3
            className={
              big
                ? "mt-2 max-w-[30ch] text-[clamp(1.25rem,1rem+0.8vw,1.6rem)] leading-snug tracking-[-0.015em] text-ink"
                : "mt-1.5 text-[15px] leading-snug text-ink"
            }
          >
            {post.title}
          </h3>
          {/* Redirect arrow, bottom-right corner */}
          <span className="mt-auto flex justify-end pt-3">
            <ArrowUpRight
              aria-hidden
              className={`text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${big ? "size-6" : "size-5"}`}
              strokeWidth={1.75}
            />
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export function Resources() {
  const [lead, ...rest] = RESOURCES;
  return (
    <section id="resources" className="pb-10 pt-8 sm:pb-12 sm:pt-8" aria-labelledby="resources-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="resources-title" className="display display-sm">
            <Grad>Insights</Grad>
          </h2>
          <a href="#resources" className="group flex items-center gap-1.5 text-[15px] font-medium text-plum">
            All articles
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* One big */}
          <div className="lg:col-span-6">
            <PostCard post={lead} big index={0} />
          </div>

          {/* Four small */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {rest.map((r, i) => (
              <li key={r.title}>
                <PostCard post={r} index={i + 1} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
