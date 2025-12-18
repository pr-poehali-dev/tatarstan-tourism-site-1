import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

type Review = {
  id: number;
  name: string;
  image: string;
  rating: number;
  topic: string;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Демьяненко Никита",
    image: "https://ibb.co/KzcQp60x",
    rating: 5,
    topic: "Прекрасный путеводитель",
    text: "Отличный сайт для планирования поездки по Татарстану. Вся информация в одном месте, карта удобная, описания подробные.",
  },
  {
    id: 2,
    name: "Шамиль Газизов",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 5,
    topic: "Очень полезно",
    text: "Благодаря этому сайту спланировала маршрут на выходные. Посетили Свияжск и Раифский монастырь. Впечатления незабываемые!",
  },
  {
    id: 3,
    name: "HiroBatory",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry",
    rating: 3,
    topic: "Хорошая подборка",
    text: "Много интересных мест, о которых раньше не знал. Карта помогла узнать местоположение достопримечательностей и музеев. Рекомендую всем туристам.",
  },
  {
    id: 4,
    name: "Кучма1995",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    rating: 5,
    topic: "Удобно и понятно",
    text: "Достопримечательности Республики Татарстан произвели очень сильное впечатление. Регион гармонично сочетает богатую историю, национальную культуру и современную архитектуру. Казанский кремль и мечеть Кул-Шариф поражают своей масштабностью и красотой, а остров-град Свияжск и Болгарский историко-археологический комплекс позволяют по-настоящему прикоснуться к прошлому. Везде чувствуется уважение к традициям и высокий уровень сохранности памятников. Татарстан — это место, куда хочется вернуться снова, чтобы глубже познакомиться с его культурным и историческим наследием. Благодаря этому сайту я узнал много интересных мест.Рекомендую!!!!",
  },
  {
    id: 5,
    name: "Хомяков",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Igor",
    rating: 5,
    topic: "Хомяк",
    text: "ХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомякХомяк",
  },
  {
    id: 6,
    name: "Люба Борисовна",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
    rating: 4,
    topic: "Хорошая навигация",
    text: "Карта работает отлично, информация актуальная. Несколько раз возвращалась к сайту для изучения информации.",
  },
  {
    id: 7,
    name: "Мужичок Боровичок",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey",
    rating: 5,
    topic: "Информативно",
    text: "Случайно наткнулся на сайт в интернете!Увидел достопримечательности музеи и много чего. Пока информации мало но уверен что в будущем добавят намного больше!Добра вам⚡⚡",
  },
  {
    id: 8,
    name: "Ольга Новикова",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga",
    rating: 5,
    topic: "Рекомендую друзьям",
    text: "Уже порекомендовала сайт нескольким знакомым. Все в восторге от удобства и полноты информации о достопримечательностях.",
  },
];

const ReviewsCarousel = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (scrollRef.current) {
          const cardWidth = 320;
          const gap = 16;
          const scrollAmount = cardWidth + gap;

          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });

          const maxScroll =
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          if (scrollRef.current.scrollLeft >= maxScroll - 10) {
            setTimeout(() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
              }
            }, 100);
          }
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = 320;
      const gap = 16;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCenterIndex(index);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden py-8">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review, index) => {
            const isCentered = index === centerIndex;
            return (
              <Card
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={`flex-shrink-0 w-80 p-6 cursor-pointer transition-all duration-300 snap-center ${
                  isCentered
                    ? "scale-105 shadow-xl border-primary"
                    : "scale-95 opacity-70"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.image} alt={review.name} />
                    <AvatarFallback>
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {review.name}
                    </h3>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name={i < review.rating ? "Star" : "Star"}
                          size={16}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-2">
                  {review.topic}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {review.text}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedReview && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <Card
            className="max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-6 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={selectedReview.image}
                  alt={selectedReview.name}
                />
                <AvatarFallback>
                  {selectedReview.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-2xl text-foreground">
                  {selectedReview.name}
                </h3>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={
                        i < selectedReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <h4 className="font-semibold text-xl text-foreground mb-4">
              {selectedReview.topic}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {selectedReview.text}
            </p>
          </Card>
        </div>
      )}
    </>
  );
};

export default ReviewsCarousel;
