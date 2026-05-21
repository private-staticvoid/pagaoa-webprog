import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import {
  fetchArticles,
  getArticleErrorMessage,
  mapArticleFromApi,
} from "../../services/ArticleService";

const ArticlePage = () => {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadArticle = async () => {
      setLoading(true);
      setLoadError("");
      setArticle(null);
      try {
        const { data } = await fetchArticles();
        const list = (data?.articles ?? [])
          .map(mapArticleFromApi)
          .filter((a) => a.isActive);
        const match = list.find((a) => a.name === name);
        if (!cancelled) {
          setArticle(match ?? null);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        if (!cancelled) {
          setLoadError(getArticleErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-sm leading-7 text-zinc-600">Loading article…</p>
          </div>
        </section>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0C3AA7]">
              Error
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold text-zinc-900 sm:text-4xl">
              Could not load article
            </h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
              {loadError}
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button to="/articles" variant="custom1">
                Back to Articles
              </Button>
              <Button to="/" variant="custom2">
                Go Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0C3AA7]">
              404
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold text-zinc-900 sm:text-4xl">
              Article not found
            </h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button to="/articles" variant="custom1">
                Back to Articles
              </Button>
              <Button to="/" variant="custom2">
                Go Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const paragraphs = Array.isArray(article.content)
    ? article.content
    : [article.content ?? ""];

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <section className="max-w-3xl mx-auto w-full">
        <Button to="/articles" className="mb-4">
          ← Back to Articles
        </Button>

        <h1 className="mt-4 text-3xl font-bold text-[#070546]">
          {article.title}
        </h1>

        {article.imageUrl && (
          <div className="flex justify-center my-6">
            <div className="w-full overflow-hidden rounded-[1.25rem]">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-130 object-cover"
              />
            </div>
          </div>
        )}

        <div className="text-[#070546]/90 text-base leading-7 space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8">
          <Button to="/">Go Back Home</Button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
