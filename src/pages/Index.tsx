import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { attractions, Attraction } from "@/data/attractions";
import YandexMap from "@/components/YandexMap";
import ReviewsCarousel from "@/components/ReviewsCarousel";

type News = {
  id: number;
  attractionId: number;
  title: string;
  description: string;
  status: "all_good" | "renovation" | "news";
};

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [visibleAttractions, setVisibleAttractions] = useState(5);
  const [visibleNews, setVisibleNews] = useState(5);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const attractionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      setShowWelcome(false);
    } else {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem("hasSeenWelcome", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMarkerClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setTimeout(() => {
      if (attractionsRef.current) {
        attractionsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 300);
  };

  const news: News[] = [
    {
      id: 1,
      attractionId: 1,
      title: "Все в порядке",
      description: "Казанский Кремль принимает туристов в обычном режиме.",
      status: "all_good",
    },
    {
      id: 2,
      attractionId: 2,
      title: "Все в порядке",
      description: "Мечеть Кул Шариф открыта для посещения.",
      status: "all_good",
    },
    {
      id: 3,
      attractionId: 3,
      title: "Реставрация завершена",
      description:
        "Башня Сююмбике прошла плановую реставрацию и открыта для посещения.",
      status: "renovation",
    },
    {
      id: 4,
      attractionId: 4,
      title: "Новые арт-объекты",
      description: "На улице Баумана установлены новые скульптуры и фотозоны.",
      status: "news",
    },
    {
      id: 5,
      attractionId: 5,
      title: "Все в порядке",
      description: "Храм всех религий доступен для посещения.",
      status: "all_good",
    },
    {
      id: 6,
      attractionId: 6,
      title: "Новая выставка",
      description:
        'В Национальном музее открылась выставка "Золото кочевников".',
      status: "news",
    },
    {
      id: 7,
      attractionId: 7,
      title: "Все в порядке",
      description: "Раифский монастырь принимает паломников и туристов.",
      status: "all_good",
    },
    {
      id: 8,
      attractionId: 8,
      title: "Все в порядке",
      description: "Свияжск работает в обычном режиме.",
      status: "all_good",
    },
    {
      id: 9,
      attractionId: 9,
      title: "Все в порядке",
      description: "Булгарское городище открыто для посещения.",
      status: "all_good",
    },
    {
      id: 10,
      attractionId: 10,
      title: "Все в порядке",
      description: 'ЗАГС "Казан" принимает заявки на регистрацию брака.',
      status: "all_good",
    },
    {
      id: 11,
      attractionId: 11,
      title: "Новое меню",
      description: "В Музее Чак-Чака появились новые блюда татарской кухни.",
      status: "news",
    },
    {
      id: 12,
      attractionId: 12,
      title: "Все в порядке",
      description: 'Аквапарк "Ривьера" работает по расписанию.',
      status: "all_good",
    },
    {
      id: 13,
      attractionId: 13,
      title: "Все в порядке",
      description: "Музей советского быта открыт для посещения.",
      status: "all_good",
    },
    {
      id: 14,
      attractionId: 14,
      title: "Экскурсионные программы",
      description:
        "В Старо-Татарской слободе появились новые пешеходные экскурсии.",
      status: "news",
    },
    {
      id: 15,
      attractionId: 15,
      title: "Все в порядке",
      description: "Парк Тысячелетия открыт для прогулок.",
      status: "all_good",
    },
    {
      id: 16,
      attractionId: 16,
      title: "Все в порядке",
      description: "Музей Е.А. Боратынского работает по расписанию.",
      status: "all_good",
    },
    {
      id: 17,
      attractionId: 17,
      title: "Все в порядке",
      description: "Дворец земледельцев доступен для фотосессий.",
      status: "all_good",
    },
    {
      id: 18,
      attractionId: 18,
      title: "Новая экспозиция",
      description: "В Музее естественной истории открыт зал динозавров.",
      status: "news",
    },
    {
      id: 19,
      attractionId: 19,
      title: "Все в порядке",
      description: "Елабужское городище открыто для посещения.",
      status: "all_good",
    },
    {
      id: 20,
      attractionId: 20,
      title: "Все в порядке",
      description: "Музей-усадьба И.И. Шишкина работает в обычном режиме.",
      status: "all_good",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 animate-fade-in">
          <div className="text-center text-white animate-scale-in">
            <h1 className="text-6xl font-heading font-bold mb-4">
              Изучаем Татарстан
            </h1>
            <p className="text-xl">Откройте для себя красоту республики</p>
          </div>
        </div>
      )}

      <header id="top" className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("top")}
              className="font-heading font-bold text-xl text-primary hover:text-primary/80 transition-colors"
            >
              Главная
            </button>
            <div className="flex items-center gap-6">
              <nav className="flex gap-6">
                <button
                  onClick={() => scrollToSection("attractions")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Достопримечательности
                </button>
                <button
                  onClick={() => scrollToSection("news")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Новости
                </button>
                <button
                  onClick={() => scrollToSection("map")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Перейти к карте
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Обратная связь
                </button>
              </nav>
              
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                    <span className="text-2xl"></span>
                    <span className="text-2xl"></span>
                    <span className="text-2xl">☰</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-6 mt-8">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        window.location.href = 'https://accounts.google.com/signin';
                      }}
                    >
                      <Icon name="LogIn" size={20} />
                      Войти через Google
                    </Button>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">Навигация</h3>
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => scrollToSection("attractions")}
                          className="text-left px-4 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Достопримечательности
                        </button>
                        <button
                          onClick={() => scrollToSection("news")}
                          className="text-left px-4 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Новости
                        </button>
                        <button
                          onClick={() => scrollToSection("map")}
                          className="text-left px-4 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Карта
                        </button>
                        <button
                          onClick={() => scrollToSection("reviews")}
                          className="text-left px-4 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Отзывы
                        </button>
                        <button
                          onClick={() => scrollToSection("contact")}
                          className="text-left px-4 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Обратная связь
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="from-primary/10 to-white my-0 px-0 py-[286px] bg-emerald-100 mx-0 rounded-0">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
            Достопримечательности Республики Татарстан
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Познакомьтесь с богатым культурным наследием Татарстана — от древних
            городов до современных арт-объектов
          </p>
        </div>
      </section>

      <section id="map" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Карта достопримечательностей
          </h2>
          <div className="max-w-6xl mx-auto">
            <YandexMap
              attractions={attractions}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      </section>

      <section id="attractions" ref={attractionsRef} className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Достопримечательности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {attractions.slice(0, visibleAttractions).map((attraction) => (
              <Card
                key={attraction.id}
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
                onClick={() => setSelectedAttraction(attraction)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={attraction.images[0]}
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-30"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-1">
                    {attraction.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {attraction.city}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {attraction.category}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          {visibleAttractions < attractions.length && (
            <div className="text-center">
              <Button
                onClick={() =>
                  setVisibleAttractions((prev) =>
                    Math.min(prev + 5, attractions.length),
                  )
                }
                size="lg"
                className="font-semibold"
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="news" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {news.slice(0, visibleNews).map((newsItem) => {
              const attraction = attractions.find(
                (a) => a.id === newsItem.attractionId,
              );
              return (
                <Card
                  key={newsItem.id}
                  className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow relative"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  {newsItem.status === "all_good" && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded z-10">
                      все в порядке
                    </div>
                  )}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={
                        attraction?.images[0] ||
                        "https://images.unsplash.com/photo-1586800463720-febbe6eb4028?w=800"
                      }
                      alt={newsItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      {newsItem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {newsItem.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
          {visibleNews < news.length && (
            <div className="text-center">
              <Button
                onClick={() =>
                  setVisibleNews((prev) => Math.min(prev + 5, news.length))
                }
                size="lg"
                className="font-semibold"
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="q1"
              className="bg-white rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Для чего был создан сайт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт был сделан в качестве проекта по информатике и участия в
                научной конференции "Инженерная мысль" от КНИТУ-КАИ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="q2"
              className="bg-white rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Про что сайт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт посвящен достопримечательностям Татарстана, которые стоит
                посетить.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="q3"
              className="bg-white rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                У меня есть вопросы, есть ли контактная информация для их
                передачи?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, есть. На сайте указана почта, на которую вы можете
                отправлять свои вопросы.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="q4"
              className="bg-white rounded-lg px-6 shadow-sm"
            >
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Почему на сайте мало достопримечательностей?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт был сделан недавно как проектная работа, поэтому указаны не
                все достопримечательности. В будущем мы планируем продолжить
                поддержку сайта и увеличить количество достопримечательностей.
                Если вы знаете что можно добавить, пишите нам на почту.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-4 text-slate-800">ОТЗЫВЫ ЛЮДЕЙ О САЙТЕ</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Узнайте, что думают другие люди о сайте и достопримечательностях Татарстана</p>
          <ReviewsCarousel />
        </div>
      </section>

      <footer id="contact" className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Обратная связь
            </h3>
            <p className="mb-6">
              Сайт был сделан в качестве проекта по информатике и участия в
              научной конференции Инженерная мысль ученика 10 класса Ганеева
              Эрнеста Тимуровича МБОУ Школа 70 г. Казань
            </p>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={20} />
              <a
                href="mailto:nuri01919@gmail.com"
                className="text-secondary hover:underline font-medium"
              >
                nuri01919@gmail.com
              </a>
            </div>
            <p className="text-sm text-muted mt-2">
              для связи напишите по почте
            </p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-sm text-muted">
              © 2025 Достопримечательности Татарстана. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      <Dialog
        open={!!selectedAttraction}
        onOpenChange={() => setSelectedAttraction(null)}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedAttraction && (
            <div>
              <DialogTitle className="text-4xl font-heading font-bold mb-6">
                {selectedAttraction.name}
              </DialogTitle>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {selectedAttraction.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedAttraction.name} ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Icon name="MapPin" size={18} />
                    {selectedAttraction.city}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {selectedAttraction.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">
                    Описание
                  </h3>
                  <p className="text-lg leading-relaxed">
                    {selectedAttraction.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-semibold mb-3">
                    История
                  </h3>
                  <p className="text-lg leading-relaxed whitespace-pre-line">
                    {selectedAttraction.history}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-3xl font-heading font-bold mb-4">
            {selectedNews?.title}
          </DialogTitle>
          {selectedNews && (
            <div>
              <img
                src={
                  attractions.find((a) => a.id === selectedNews.attractionId)
                    ?.images[0] ||
                  "https://images.unsplash.com/photo-1586800463720-febbe6eb4028?w=800"
                }
                alt={selectedNews.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <p className="text-lg leading-relaxed">
                {selectedNews.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;