import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { Attraction } from "@/data/attractions";
import YandexMap from "@/components/YandexMap";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import WelcomeDialog from "@/components/WelcomeDialog";
import AttractionsList from "@/components/AttractionsList";
import NewsSection from "@/components/NewsSection";
import FAQSection from "@/components/FAQSection";

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
    {
      id: 21,
      attractionId: 21,
      title: "Все в порядке",
      description: "Раифский монастырь открыт для паломников.",
      status: "all_good",
    },
    {
      id: 22,
      attractionId: 22,
      title: "Дайвинг-сезон открыт",
      description: "Голубые озёра приглашают дайверов на подводные погружения.",
      status: "news",
    },
    {
      id: 23,
      attractionId: 23,
      title: "IT-фестиваль",
      description: "В Иннополисе пройдёт международный фестиваль технологий.",
      status: "news",
    },
    {
      id: 24,
      attractionId: 24,
      title: "Сезон наблюдения за птицами",
      description:
        "В Национальном парке начался период миграции редких птиц.",
      status: "news",
    },
    {
      id: 25,
      attractionId: 25,
      title: "Все в порядке",
      description: "Свияжск принимает туристов и паломников.",
      status: "all_good",
    },
    {
      id: 26,
      attractionId: 26,
      title: "Все в порядке",
      description: "Мечеть Марджани открыта для посещения.",
      status: "all_good",
    },
    {
      id: 27,
      attractionId: 27,
      title: "Все в порядке",
      description: "Дворец земледельцев доступен для фотосессий.",
      status: "all_good",
    },
    {
      id: 28,
      attractionId: 28,
      title: "Все в порядке",
      description: "Петропавловский собор открыт для прихожан.",
      status: "all_good",
    },
    {
      id: 29,
      attractionId: 29,
      title: "Выставка булгарской керамики",
      description:
        "В Национальном музее открылась экспозиция древних артефактов.",
      status: "news",
    },
    {
      id: 30,
      attractionId: 30,
      title: "Все в порядке",
      description: "Казанская ратуша открыта для экскурсий.",
      status: "all_good",
    },
    {
      id: 31,
      attractionId: 31,
      title: "Световое шоу фонтанов",
      description: "На площади Тысячелетия запущена новая программа фонтанов.",
      status: "news",
    },
    {
      id: 32,
      attractionId: 32,
      title: "Все в порядке",
      description: "Богоявленский собор принимает прихожан.",
      status: "all_good",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <WelcomeDialog showWelcome={showWelcome} />

      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🏛️</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Открой Казань
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("top")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Карта
              </button>
              <button
                onClick={() => scrollToSection("attractions")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Достопримечательности
              </button>
              <button
                onClick={() => scrollToSection("news")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Новости
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                FAQ
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <button
                    onClick={() => scrollToSection("top")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    Главная
                  </button>
                  <button
                    onClick={() => scrollToSection("map")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    Карта
                  </button>
                  <button
                    onClick={() => scrollToSection("attractions")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    Достопримечательности
                  </button>
                  <button
                    onClick={() => scrollToSection("news")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    Новости
                  </button>
                  <button
                    onClick={() => scrollToSection("reviews")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    Отзывы
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="text-lg text-left hover:text-primary transition-colors"
                  >
                    FAQ
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Добро пожаловать в Казань!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Откройте для себя древний город, где встречаются Восток и Запад.
              Исследуйте величественный Кремль, попробуйте традиционную татарскую
              кухню и погрузитесь в богатую культуру столицы Татарстана.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => scrollToSection("attractions")}
                size="lg"
                className="group"
              >
                Исследовать достопримечательности
                <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection("map")}
                variant="outline"
                size="lg"
                className="group"
              >
                <Icon name="MapPin" className="mr-2" />
                Посмотреть на карте
              </Button>
            </div>
          </div>
        </section>

        <section id="map" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Карта достопримечательностей
          </h2>
          <YandexMap onMarkerClick={handleMarkerClick} />
        </section>

        <AttractionsList
          visibleAttractions={visibleAttractions}
          selectedAttraction={selectedAttraction}
          attractionsRef={attractionsRef}
          onLoadMore={() => setVisibleAttractions((prev) => prev + 5)}
          onSelectAttraction={setSelectedAttraction}
          onCloseDialog={() => setSelectedAttraction(null)}
        />

        <NewsSection
          news={news}
          visibleNews={visibleNews}
          selectedNews={selectedNews}
          onLoadMore={() => setVisibleNews((prev) => prev + 5)}
          onSelectNews={setSelectedNews}
          onCloseDialog={() => setSelectedNews(null)}
        />

        <section id="reviews" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Отзывы туристов
          </h2>
          <ReviewsCarousel />
        </section>

        <FAQSection />
      </main>

      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Открой Казань
              </h3>
              <p className="text-muted-foreground">
                Ваш путеводитель по достопримечательностям столицы Татарстана
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Полезные ссылки</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection("attractions")}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Достопримечательности
                </button>
                <button
                  onClick={() => scrollToSection("map")}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Карта
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  FAQ
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  <span>info@kazan-guide.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  <span>+7 (843) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Открой Казань. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
