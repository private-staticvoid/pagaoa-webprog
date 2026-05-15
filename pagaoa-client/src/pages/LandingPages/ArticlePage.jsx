// src/pages/ArticlePage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import {
  fetchArticles,
  mapArticleFromApi,
} from "../../services/articleService";

const ArticlePage = () => {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchArticles();
        const raw = Array.isArray(data) ? data : (data.articles ?? []);
        const mapped = raw.map(mapArticleFromApi);
        // Match by the `name` slug generated in mapArticleFromApi
        const found = mapped.find((a) => a.name === name);
        if (found) {
          setArticle(found);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6 p-6">
        <p className="text-[#070546]/70 text-sm">Loading…</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="flex w-full flex-col gap-6 p-6">
        <h1 className="text-3xl font-bold text-[#070546]">Article not found</h1>
        <Button to="/articles">Back to Articles</Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <section className="max-w-3xl mx-auto">
        <Button to="/articles" className="mb-4">
          ← Back to Articles
        </Button>

        <h1 className="text-3xl font-bold text-[#070546]">{article.title}</h1>

        {article.category && (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#070546]/60">
            {article.category}
          </p>
        )}

        {article.author && (
          <p className="mt-1 text-sm text-[#070546]/60">By {article.author}</p>
        )}

        <div className="flex justify-center my-6">
          <div className="w-xl h-100 overflow-hidden rounded-[1.25rem]">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Summary */}
        {article.summary && (
          <p className="text-[#070546]/80 text-base italic mb-4">
            {article.summary}
          </p>
        )}

        {/* Full content */}
        <div className="text-[#070546]/90 text-base leading-7 whitespace-pre-line">
          {article.content}
        </div>

        <div className="mt-8">
          <Button to="/">Go Back Home</Button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
