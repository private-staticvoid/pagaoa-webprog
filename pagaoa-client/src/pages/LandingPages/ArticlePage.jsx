import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import articles from "../../assets/articles";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((a) => a.name === name);

  if (!article) {
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

        <div className="flex justify-center my-6">
          <div className="w-xl h-100  4 overflow-hidden rounded-[1.25rem]">
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-[#070546]/90 text-base">{article.desc}</p>

        <div className="mt-8">
          <Button to="/">Go Back Home</Button>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
