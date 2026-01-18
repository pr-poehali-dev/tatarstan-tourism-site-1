import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { attractions } from "@/data/attractions";

type News = {
  id: number;
  attractionId: number;
  title: string;
  description: string;
  status: "all_good" | "renovation" | "news";
};

interface NewsSectionProps {
  news: News[];
  visibleNews: number;
  selectedNews: News | null;
  onLoadMore: () => void;
  onSelectNews: (news: News) => void;
  onCloseDialog: () => void;
}

const NewsSection = ({
  news,
  visibleNews,
  selectedNews,
  onLoadMore,
  onSelectNews,
  onCloseDialog,
}: NewsSectionProps) => {
  const getStatusIcon = (status: News["status"]) => {
    switch (status) {
      case "all_good":
        return <Icon name="CheckCircle" className="w-5 h-5 text-green-500" />;
      case "renovation":
        return <Icon name="Wrench" className="w-5 h-5 text-orange-500" />;
      case "news":
        return <Icon name="Megaphone" className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: News["status"]) => {
    switch (status) {
      case "all_good":
        return (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Всё в порядке
          </span>
        );
      case "renovation":
        return (
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            Реставрация
          </span>
        );
      case "news":
        return (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Новости
          </span>
        );
    }
  };

  return (
    <section id="news" className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Новости и обновления
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, visibleNews).map((item) => {
          const attraction = attractions.find(
            (a) => a.id === item.attractionId
          );
          return (
            <Card
              key={item.id}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onSelectNews(item)}
            >
              <div className="flex items-start gap-3 mb-3">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {attraction?.name}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {item.description}
              </p>
              <div className="mt-4">{getStatusBadge(item.status)}</div>
            </Card>
          );
        })}
      </div>

      {visibleNews < news.length && (
        <div className="text-center mt-8">
          <Button
            onClick={onLoadMore}
            variant="outline"
            size="lg"
            className="group"
          >
            Показать ещё
            <Icon name="ChevronDown" className="ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>
      )}

      <Dialog open={!!selectedNews} onOpenChange={onCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="sr-only">{selectedNews?.title}</DialogTitle>
          {selectedNews && (
            <div>
              <div className="flex items-start gap-3 mb-4">
                {getStatusIcon(selectedNews.status)}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedNews.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {
                      attractions.find((a) => a.id === selectedNews.attractionId)
                        ?.name
                    }
                  </p>
                </div>
                {getStatusBadge(selectedNews.status)}
              </div>
              <p className="text-lg leading-relaxed">
                {selectedNews.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsSection;
