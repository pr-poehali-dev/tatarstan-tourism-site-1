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

  const getStatusIcon = (status: News["status"]) => {
    switch (status) {
      case "all_good":
        return "check-circle";
      case "renovation":
        return "wrench";
      case "news":
        return "newspaper";
      default:
        return "info";
    }
  };

  const getStatusBadge = (status: News["status"]) => {
    const badges = {
      all_good: { text: "Все в порядке", class: "bg-green-100 text-green-800" },
      renovation: { text: "Реставрация", class: "bg-yellow-100 text-yellow-800" },
      news: { text: "Новости", class: "bg-blue-100 text-blue-800" },
    };
    return badges[status] || badges.all_good;
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Welcome Dialog */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            Добро пожаловать в Казань!
          </DialogTitle>
          <div className="flex flex-col items-center gap-4 py-4">
            <Icon name="map-pin" className="w-16 h-16 text-primary animate-bounce" />
            <p className="text-center text-gray-600">
              Откройте для себя культурное наследие и современные достопримечательности столицы Татарстана
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="map-pin" className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Kazan Guide</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("map")}
                className="hover:text-primary"
              >
                Карта
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("attractions")}
                className="hover:text-primary"
              >
                Достопримечательности
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("news")}
                className="hover:text-primary"
              >
                Новости
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("reviews")}
                className="hover:text-primary"
              >
                Отзывы
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("faq")}
                className="hover:text-primary"
              >
                FAQ
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Icon name="menu" className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("map")}
                    className="justify-start"
                  >
                    <Icon name="map" className="w-5 h-5 mr-2" />
                    Карта
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("attractions")}
                    className="justify-start"
                  >
                    <Icon name="landmark" className="w-5 h-5 mr-2" />
                    Достопримечательности
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("news")}
                    className="justify-start"
                  >
                    <Icon name="newspaper" className="w-5 h-5 mr-2" />
                    Новости
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("reviews")}
                    className="justify-start"
                  >
                    <Icon name="star" className="w-5 h-5 mr-2" />
                    Отзывы
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection("faq")}
                    className="justify-start"
                  >
                    <Icon name="help-circle" className="w-5 h-5 mr-2" />
                    FAQ
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
            Откройте для себя Казань
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Город, где встречаются Восток и Запад. Погрузитесь в богатую
            историю, культуру и современную жизнь столицы Татарстана.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("map")}
            className="group"
          >
            Начать путешествие
            <Icon
              name="arrow-right"
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Интерактивная карта
          </h2>
          <YandexMap
            attractions={attractions}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </section>

      {/* Attractions List Section */}
      <section
        id="attractions"
        ref={attractionsRef}
        className="py-16 px-4 bg-gradient-to-b from-white to-amber-50"
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Достопримечательности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.slice(0, visibleAttractions).map((attraction) => (
              <Card
                key={attraction.id}
                className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                  selectedAttraction?.id === attraction.id
                    ? "ring-2 ring-primary shadow-xl scale-105"
                    : ""
                }`}
                onClick={() => setSelectedAttraction(attraction)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{attraction.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {attraction.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Icon name="map-pin" className="w-4 h-4" />
                    <span className="line-clamp-1">{attraction.address}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {visibleAttractions < attractions.length && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setVisibleAttractions((prev) => prev + 6)}
                variant="outline"
                size="lg"
              >
                Показать больше
                <Icon name="chevron-down" className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Attraction Details Dialog */}
      <Dialog
        open={!!selectedAttraction}
        onOpenChange={() => setSelectedAttraction(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedAttraction && (
            <>
              <DialogTitle className="text-2xl font-bold">
                {selectedAttraction.name}
              </DialogTitle>
              <div className="space-y-4">
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-gray-700">{selectedAttraction.description}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon
                      name="map-pin"
                      className="w-5 h-5 text-primary mt-1"
                    />
                    <div>
                      <p className="font-semibold">Адрес:</p>
                      <p className="text-gray-600">
                        {selectedAttraction.address}
                      </p>
                    </div>
                  </div>
                  {selectedAttraction.workingHours && (
                    <div className="flex items-start gap-2">
                      <Icon
                        name="clock"
                        className="w-5 h-5 text-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold">Режим работы:</p>
                        <p className="text-gray-600">
                          {selectedAttraction.workingHours}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedAttraction.price && (
                    <div className="flex items-start gap-2">
                      <Icon
                        name="ticket"
                        className="w-5 h-5 text-primary mt-1"
                      />
                      <div>
                        <p className="font-semibold">Стоимость:</p>
                        <p className="text-gray-600">{selectedAttraction.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* News Section */}
      <section id="news" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Новости и обновления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, visibleNews).map((item) => {
              const attraction = attractions.find(
                (a) => a.id === item.attractionId
              );
              const badge = getStatusBadge(item.status);
              return (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Icon
                        name={getStatusIcon(item.status)}
                        className="w-6 h-6 text-primary"
                      />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    {attraction && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon name="map-pin" className="w-4 h-4" />
                        <span className="line-clamp-1">{attraction.name}</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          {visibleNews < news.length && (
            <div className="text-center mt-8">
              <Button
                onClick={() => setVisibleNews((prev) => prev + 6)}
                variant="outline"
                size="lg"
              >
                Показать больше новостей
                <Icon name="chevron-down" className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* News Details Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl">
          {selectedNews && (
            <>
              <DialogTitle className="text-2xl font-bold">
                {selectedNews.title}
              </DialogTitle>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Icon
                    name={getStatusIcon(selectedNews.status)}
                    className="w-6 h-6 text-primary"
                  />
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      getStatusBadge(selectedNews.status).class
                    }`}
                  >
                    {getStatusBadge(selectedNews.status).text}
                  </span>
                </div>
                <p className="text-gray-700">{selectedNews.description}</p>
                {attractions.find((a) => a.id === selectedNews.attractionId) && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">
                      Связанная достопримечательность:
                    </h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Icon name="map-pin" className="w-5 h-5 text-primary" />
                      {
                        attractions.find((a) => a.id === selectedNews.attractionId)
                          ?.name
                      }
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Отзывы туристов
          </h2>
          <ReviewsCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Как добраться до центра города из аэропорта?
              </AccordionTrigger>
              <AccordionContent>
                Из аэропорта Казани до центра города можно добраться на
                автобусе №97 (до станции метро "Площадь Тукая") или на такси
                (около 30-40 минут). Также доступен заказ трансфера через
                приложения такси.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Какое лучшее время для посещения Казани?
              </AccordionTrigger>
              <AccordionContent>
                Лучшее время для посещения Казани - с мая по сентябрь, когда
                погода теплая и комфортная для прогулок. Особенно красива Казань
                в июне во время праздника Сабантуй и в августе во время Дня
                города.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Нужна ли виза для посещения Казани?
              </AccordionTrigger>
              <AccordionContent>
                Казань находится в России, поэтому визовые требования такие же,
                как и для всей страны. Гражданам многих стран СНГ виза не
                требуется. Гражданам других стран следует уточнить визовые
                требования в консульстве РФ.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Какие блюда татарской кухни стоит попробовать?
              </AccordionTrigger>
              <AccordionContent>
                Обязательно попробуйте эчпочмак (треугольные пирожки с мясом и
                картофелем), чак-чак (сладкое блюдо из теста с медом), казылык
                (конская колбаса), кыстыбый (лепешка с начинкой) и перемяч
                (жареный пирожок). Также рекомендуем посетить Музей Чак-Чака.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Сколько дней нужно для осмотра основных
                достопримечательностей?
              </AccordionTrigger>
              <AccordionContent>
                Для осмотра основных достопримечательностей Казани достаточно
                2-3 дней. За это время вы успеете посетить Кремль, пройтись по
                улице Баумана, посетить несколько музеев и насладиться местной
                кухней. Для более глубокого знакомства с городом и окрестностями
                рекомендуем выделить 5-7 дней.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Есть ли в Казани метро?
              </AccordionTrigger>
              <AccordionContent>
                Да, в Казани есть метрополитен с одной линией, которая
                соединяет северную и южную части города. Метро работает с 6:00
                до 23:00. Стоимость проезда доступная, можно приобрести
                многоразовые карты.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                Где лучше остановиться в Казани?
              </AccordionTrigger>
              <AccordionContent>
                Лучше всего выбирать отель в центре города, рядом с Кремлем или
                улицей Баумана. Также хорошие варианты - районы Вахитовский и
                Приволжский. Здесь развитая инфраструктура и близость к основным
                достопримечательностям.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                Можно ли использовать банковские карты?
              </AccordionTrigger>
              <AccordionContent>
                Да, в Казани широко принимаются банковские карты российских
                платежных систем (Мир, Visa, Mastercard). Банкоматы доступны по
                всему городу. В туристических местах обычно можно расплатиться
                картой.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="map-pin" className="w-8 h-8" />
                <h3 className="text-xl font-bold">Kazan Guide</h3>
              </div>
              <p className="text-gray-400">
                Ваш надежный путеводитель по столице Татарстана
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2">
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0 h-auto"
                  onClick={() => scrollToSection("map")}
                >
                  Карта
                </Button>
                <br />
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0 h-auto"
                  onClick={() => scrollToSection("attractions")}
                >
                  Достопримечательности
                </Button>
                <br />
                <Button
                  variant="link"
                  className="text-gray-400 hover:text-white p-0 h-auto"
                  onClick={() => scrollToSection("news")}
                >
                  Новости
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@kazanguide.ru</p>
                <p>Телефон: +7 (843) 123-45-67</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>2024 Kazan Guide. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <Button
        onClick={() => scrollToSection("top")}
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 shadow-lg"
        size="icon"
      >
        <Icon name="arrow-up" className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Index;
