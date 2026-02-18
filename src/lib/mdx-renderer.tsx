import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CheatSheetCode } from "@/components/mdx/cheat-sheet-code";
import { TechBadge } from "@/components/mdx/tech-badge";
import { NetworkDiagram } from "@/components/mdx/network-diagram";

// Custom MDX components available in all .mdx files
const mdxComponents = {
  CheatSheetCode,
  TechBadge,
  NetworkDiagram,
  // Override default HTML elements for styling
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-white"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-white/90"
      {...props}
    />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <h4
      className="mt-6 mb-2 scroll-mt-24 text-lg font-medium text-white/80"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p
      className="mb-4 leading-7 text-brand-text-secondary"
      {...props}
    />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-brand-text-secondary" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-brand-text-secondary" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-7" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="font-medium text-brand-blue underline underline-offset-4 hover:text-brand-blue/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-brand-blue/40 pl-4 italic text-brand-text-secondary"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-brand-border" />,
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-brand-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<"thead">) => (
    <thead className="bg-[#0a0a0a] text-brand-text-secondary" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="px-4 py-3 text-left font-medium" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-t border-brand-border px-4 py-3 text-brand-text-secondary" {...props} />
  ),
  // Code blocks that are NOT inside CheatSheetCode (inline code)
  code: (props: React.ComponentProps<"code">) => {
    // If this code element is inside a pre (block code), let rehype-pretty-code handle it
    const isInline = !props.className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-sm text-brand-blue"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      className="overflow-x-auto rounded-lg bg-[#0a0a0a] p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
};

/** Rehype-pretty-code options using Shiki with Tokyo Night theme */
const prettyCodeOptions = {
  theme: "tokyo-night",
  keepBackground: false,
  defaultLang: "bash",
};

/**
 * Compile raw MDX string to a React component
 */
export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });
  return content;
}
