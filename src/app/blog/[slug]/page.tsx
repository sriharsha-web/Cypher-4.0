import { articles } from "@/data/blog";
import ArticleClient from "./ArticleClient";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) return <div>Article Not Found</div>;

  return <ArticleClient article={article} related={related} />;
}
