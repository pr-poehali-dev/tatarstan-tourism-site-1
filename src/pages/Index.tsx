import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type Attraction = {
  id: number;
  name: string;
  city: string;
  description: string;
  image: string;
  coordinates: [number, number];
  category: string;
};

type News = {
  id: number;
  attractionId: number;
  title: string;
  description: string;
  status: 'all_good' | 'renovation' | 'news';
};

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [visibleAttractions, setVisibleAttractions] = useState(5);
  const [visibleNews, setVisibleNews] = useState(5);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    } else {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const attractions: Attraction[] = [
    { id: 1, name: 'Казанский Кремль', city: 'Казань', description: 'Исторический комплекс, включённый в список Всемирного наследия ЮНЕСКО. Включает мечеть Кул Шариф, башню Сююмбике и Благовещенский собор.', image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800', coordinates: [55.798551, 49.105324], category: 'Архитектура' },
    { id: 2, name: 'Мечеть Кул Шариф', city: 'Казань', description: 'Главная джума-мечеть Татарстана, символ республики. Построена в 2005 году внутри Казанского Кремля.', image: 'https://images.unsplash.com/photo-1564769625392-651b62c9d6d3?w=800', coordinates: [55.798334, 49.105187], category: 'Религия' },
    { id: 3, name: 'Башня Сююмбике', city: 'Казань', description: 'Дозорная башня в Казанском Кремле с наклоном 1.98 метра. Названа в честь последней казанской царицы.', image: 'https://images.unsplash.com/photo-1604868255961-e1ebbfb37a47?w=800', coordinates: [55.799167, 49.105833], category: 'Архитектура' },
    { id: 4, name: 'Улица Баумана', city: 'Казань', description: 'Главная пешеходная улица Казани, аналог московского Арбата. Протяжённость около 2 км.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800', coordinates: [55.790278, 49.122222], category: 'Прогулки' },
    { id: 5, name: 'Храм всех религий', city: 'Казань', description: 'Архитектурный комплекс, объединяющий элементы разных религиозных культур. Создан художником Ильдаром Хановым.', image: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800', coordinates: [55.785278, 49.222222], category: 'Арт-объект' },
    { id: 6, name: 'Национальный музей РТ', city: 'Казань', description: 'Крупнейший музей Татарстана с коллекцией более 910 тысяч экспонатов по истории, культуре и природе региона.', image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3b7?w=800', coordinates: [55.789722, 49.123333], category: 'Музей' },
    { id: 7, name: 'Раифский монастырь', city: 'Зеленодольск', description: 'Мужской монастырь XVII века, расположенный на берегу озера в 30 км от Казани. Один из самых красивых монастырей Татарстана.', image: 'https://images.unsplash.com/photo-1580730257054-9f5a61372ba8?w=800', coordinates: [55.906111, 48.731944], category: 'Религия' },
    { id: 8, name: 'Свияжск', city: 'Свияжск', description: 'Историческое село-музей на острове. Основан Иваном Грозным в 1551 году. Включён в список ЮНЕСКО.', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', coordinates: [55.771389, 48.664722], category: 'Архитектура' },
    { id: 9, name: 'Булгарское городище', city: 'Болгар', description: 'Остатки древнего города Болгар — столицы Волжской Булгарии. Памятник ЮНЕСКО.', image: 'https://images.unsplash.com/photo-1548181107-8a9c1d3e0e65?w=800', coordinates: [54.974722, 49.050833], category: 'Архитектура' },
    { id: 10, name: 'ЗАГС "Казан"', city: 'Казань', description: 'Современное здание ЗАГСа в форме казана — символ Казани и популярное место для фотосессий.', image: 'https://images.unsplash.com/photo-1519167758481-83f29b1fe942?w=800', coordinates: [55.830278, 49.132778], category: 'Арт-объект' },
    { id: 11, name: 'Музей Чак-Чака', city: 'Казань', description: 'Музей татарского быта и национальной кухни. Здесь можно попробовать чак-чак и другие национальные блюда.', image: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=800', coordinates: [55.788611, 49.123611], category: 'Музей' },
    { id: 12, name: 'Аквапарк "Ривьера"', city: 'Казань', description: 'Крупнейший крытый аквапарк в России с различными горками и зоной отдыха.', image: 'https://images.unsplash.com/photo-1561056888-45906fe8a0e9?w=800', coordinates: [55.785556, 49.123889], category: 'Развлечения' },
    { id: 13, name: 'Музей советского быта', city: 'Казань', description: 'Частный музей с коллекцией предметов советской эпохи: от мебели до игрушек.', image: 'https://images.unsplash.com/photo-1531158819208-93d6ac96b1cb?w=800', coordinates: [55.789167, 49.121944], category: 'Музей' },
    { id: 14, name: 'Старо-Татарская слобода', city: 'Казань', description: 'Исторический район с деревянными домами XIX века. Центр татарской культуры и быта.', image: 'https://images.unsplash.com/photo-1582015752624-e8b1c75e3711?w=800', coordinates: [55.785000, 49.128333], category: 'Прогулки' },
    { id: 15, name: 'Парк Тысячелетия', city: 'Казань', description: 'Современный парк с фонтаном и скульптурами, открытый к 1000-летию Казани.', image: 'https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=800', coordinates: [55.796111, 49.108056], category: 'Прогулки' },
    { id: 16, name: 'Музей Е.А. Боратынского', city: 'Казань', description: 'Литературный музей в особняке XIX века, посвящённый поэту Евгению Боратынскому.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', coordinates: [55.789444, 49.123056], category: 'Музей' },
    { id: 17, name: 'Дворец земледельцев', city: 'Казань', description: 'Монументальное здание в стиле бозар с большим бронзовым деревом в центре фасада.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', coordinates: [55.791667, 49.108333], category: 'Архитектура' },
    { id: 18, name: 'Музей естественной истории', city: 'Казань', description: 'Современный музей с интерактивными экспозициями по геологии, палеонтологии и минералогии Татарстана.', image: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800', coordinates: [55.798056, 49.106389], category: 'Музей' },
    { id: 19, name: 'Елабужское городище', city: 'Елабуга', description: 'Остатки древнего булгарского города X–XIV веков. Сохранилась каменная башня.', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76d?w=800', coordinates: [55.766944, 52.041667], category: 'Архитектура' },
    { id: 20, name: 'Музей-усадьба И.И. Шишкина', city: 'Елабуга', description: 'Дом-музей великого русского художника-пейзажиста Ивана Шишкина.', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800', coordinates: [55.764722, 52.041111], category: 'Музей' },
    { id: 21, name: 'Мечеть Марджани', city: 'Казань', description: 'Старейшая сохранившаяся каменная мечеть Казани, построенная в 1766 году.', image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800', coordinates: [55.785833, 49.127222], category: 'Религия' },
    { id: 22, name: 'Музей А.М. Горького', city: 'Казань', description: 'Музей в доме, где жил Максим Горький в 1880-х годах.', image: 'https://images.unsplash.com/photo-1571847168777-3b0c7ff4c893?w=800', coordinates: [55.788333, 49.122778], category: 'Музей' },
    { id: 23, name: 'Театр им. Г. Камала', city: 'Казань', description: 'Старейший профессиональный татарский театр, основанный в 1906 году.', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800', coordinates: [55.789722, 49.123889], category: 'Культура' },
    { id: 24, name: 'Александровский пассаж', city: 'Казань', description: 'Торговое здание конца XIX века в стиле модерн на улице Кремлёвской.', image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800', coordinates: [55.789167, 49.121667], category: 'Архитектура' },
    { id: 25, name: 'Музей счастливого детства', city: 'Казань', description: 'Ностальгический музей игрушек и предметов советского детства.', image: 'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800', coordinates: [55.789444, 49.122500], category: 'Музей' },
    { id: 26, name: 'Богородицкий монастырь', city: 'Свияжск', description: 'Действующий женский монастырь XVI века с уникальными фресками.', image: 'https://images.unsplash.com/photo-1548780607-9f0673f6f11e?w=800', coordinates: [55.772222, 48.665000], category: 'Религия' },
    { id: 27, name: 'Музей истории Болгар', city: 'Болгар', description: 'Музейный комплекс с экспонатами по истории Волжской Булгарии.', image: 'https://images.unsplash.com/photo-1586800463720-febbe6eb4028?w=800', coordinates: [54.975278, 49.051111], category: 'Музей' },
    { id: 28, name: 'Мечеть Нурулла', city: 'Казань', description: 'Красивая мечеть 1849 года постройки в Старо-Татарской слободе.', image: 'https://images.unsplash.com/photo-1609252825656-210096ec1001?w=800', coordinates: [55.785278, 49.128889], category: 'Религия' },
    { id: 29, name: 'Музей иллюзий', city: 'Казань', description: 'Интерактивный музей с оптическими иллюзиями и 3D-локациями для фотосессий.', image: 'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=800', coordinates: [55.789722, 49.122500], category: 'Развлечения' },
    { id: 30, name: 'Казанская Ратуша', city: 'Казань', description: 'Историческое здание 1854 года, памятник архитектуры в стиле эклектики.', image: 'https://images.unsplash.com/photo-1476445704028-announcing-6c925e843a5e?w=800', coordinates: [55.789722, 49.122222], category: 'Архитектура' }
  ];

  const news: News[] = [
    { id: 1, attractionId: 1, title: 'Все в порядке', description: 'Казанский Кремль принимает туристов в обычном режиме.', status: 'all_good' },
    { id: 2, attractionId: 2, title: 'Все в порядке', description: 'Мечеть Кул Шариф открыта для посещения.', status: 'all_good' },
    { id: 3, attractionId: 3, title: 'Реставрация завершена', description: 'Башня Сююмбике прошла плановую реставрацию и открыта для посещения.', status: 'renovation' },
    { id: 4, attractionId: 4, title: 'Новые арт-объекты', description: 'На улице Баумана установлены новые скульптуры и фотозоны.', status: 'news' },
    { id: 5, attractionId: 5, title: 'Все в порядке', description: 'Храм всех религий доступен для посещения.', status: 'all_good' },
    { id: 6, attractionId: 6, title: 'Новая выставка', description: 'В Национальном музее открылась выставка "Золото кочевников".', status: 'news' },
    { id: 7, attractionId: 7, title: 'Все в порядке', description: 'Раифский монастырь принимает паломников и туристов.', status: 'all_good' },
    { id: 8, attractionId: 8, title: 'Все в порядке', description: 'Свияжск работает в обычном режиме.', status: 'all_good' },
    { id: 9, attractionId: 9, title: 'Все в порядке', description: 'Булгарское городище открыто для посещения.', status: 'all_good' },
    { id: 10, attractionId: 10, title: 'Все в порядке', description: 'ЗАГС "Казан" принимает заявки на регистрацию брака.', status: 'all_good' },
    { id: 11, attractionId: 11, title: 'Новое меню', description: 'В Музее Чак-Чака появились новые блюда татарской кухни.', status: 'news' },
    { id: 12, attractionId: 12, title: 'Все в порядке', description: 'Аквапарк "Ривьера" работает по расписанию.', status: 'all_good' },
    { id: 13, attractionId: 13, title: 'Все в порядке', description: 'Музей советского быта открыт для посещения.', status: 'all_good' },
    { id: 14, attractionId: 14, title: 'Экскурсионные программы', description: 'В Старо-Татарской слободе появились новые пешеходные экскурсии.', status: 'news' },
    { id: 15, attractionId: 15, title: 'Все в порядке', description: 'Парк Тысячелетия открыт для прогулок.', status: 'all_good' },
    { id: 16, attractionId: 16, title: 'Все в порядке', description: 'Музей Е.А. Боратынского работает по расписанию.', status: 'all_good' },
    { id: 17, attractionId: 17, title: 'Все в порядке', description: 'Дворец земледельцев доступен для фотосессий.', status: 'all_good' },
    { id: 18, attractionId: 18, title: 'Новая экспозиция', description: 'В Музее естественной истории открыт зал динозавров.', status: 'news' },
    { id: 19, attractionId: 19, title: 'Все в порядке', description: 'Елабужское городище открыто для посещения.', status: 'all_good' },
    { id: 20, attractionId: 20, title: 'Все в порядке', description: 'Музей-усадьба И.И. Шишкина работает в обычном режиме.', status: 'all_good' },
    { id: 21, attractionId: 21, title: 'Все в порядке', description: 'Мечеть Марджани открыта для посещения.', status: 'all_good' },
    { id: 22, attractionId: 22, title: 'Все в порядке', description: 'Музей А.М. Горького работает по расписанию.', status: 'all_good' },
    { id: 23, attractionId: 23, title: 'Премьера спектакля', description: 'В театре им. Г. Камала состоится премьера новой постановки.', status: 'news' },
    { id: 24, attractionId: 24, title: 'Все в порядке', description: 'Александровский пассаж открыт для посещения.', status: 'all_good' },
    { id: 25, attractionId: 25, title: 'Все в порядке', description: 'Музей счастливого детства работает в обычном режиме.', status: 'all_good' },
    { id: 26, attractionId: 26, title: 'Все в порядке', description: 'Богородицкий монастырь принимает паломников.', status: 'all_good' },
    { id: 27, attractionId: 27, title: 'Все в порядке', description: 'Музей истории Болгар открыт для посещения.', status: 'all_good' },
    { id: 28, attractionId: 28, title: 'Все в порядке', description: 'Мечеть Нурулла работает в обычном режиме.', status: 'all_good' },
    { id: 29, attractionId: 29, title: 'Новые локации', description: 'В Музее иллюзий появились новые 3D-зоны для фото.', status: 'news' },
    { id: 30, attractionId: 30, title: 'Все в порядке', description: 'Казанская Ратуша открыта для посещения.', status: 'all_good' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 animate-fade-in">
          <div className="text-center text-white animate-scale-in">
            <h1 className="text-6xl font-heading font-bold mb-4">Изучаем Татарстан</h1>
            <p className="text-xl">Откройте для себя красоту республики</p>
          </div>
        </div>
      )}

      <header id="top" className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('top')}
              className="font-heading font-bold text-xl text-primary hover:text-primary/80 transition-colors"
            >
              Главная
            </button>
            <nav className="flex gap-6">
              <button 
                onClick={() => scrollToSection('attractions')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Достопримечательности
              </button>
              <button 
                onClick={() => scrollToSection('news')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Новости
              </button>
              <button 
                onClick={() => scrollToSection('map')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Перейти к карте
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Обратная связь
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-primary/10 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-6">
            Достопримечательности Республики Татарстан
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Познакомьтесь с богатым культурным наследием Татарстана — от древних городов до современных арт-объектов
          </p>
        </div>
      </section>

      <section id="map" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Карта достопримечательностей</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="border border-primary/20"></div>
                  ))}
                </div>
              </div>
              <div className="text-center z-10">
                <Icon name="MapPin" size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground font-medium">
                  Интерактивная карта с 20 метками достопримечательностей
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Казань • Свияжск • Болгар • Елабуга • Зеленодольск
                </p>
              </div>
              {[
                { top: '20%', left: '45%' },
                { top: '25%', left: '50%' },
                { top: '22%', left: '52%' },
                { top: '30%', left: '48%' },
                { top: '28%', left: '46%' },
                { top: '35%', left: '44%' },
                { top: '40%', left: '30%' },
                { top: '45%', left: '35%' },
                { top: '60%', left: '50%' },
                { top: '25%', left: '55%' },
                { top: '32%', left: '49%' },
                { top: '27%', left: '47%' },
                { top: '38%', left: '45%' },
                { top: '29%', left: '51%' },
                { top: '33%', left: '46%' },
                { top: '31%', left: '50%' },
                { top: '26%', left: '49%' },
                { top: '34%', left: '48%' },
                { top: '42%', left: '70%' },
                { top: '43%', left: '72%' }
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-150 transition-transform z-20"
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => {
                    const attraction = attractions[i];
                    if (attraction) {
                      setSelectedAttraction(attraction);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="attractions" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Достопримечательности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {attractions.slice(0, visibleAttractions).map((attraction) => (
              <Card
                key={attraction.id}
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
                onClick={() => setSelectedAttraction(attraction)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-1">{attraction.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{attraction.city}</p>
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
                onClick={() => setVisibleAttractions(prev => Math.min(prev + 5, attractions.length))}
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
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Новости</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {news.slice(0, visibleNews).map((newsItem) => {
              const attraction = attractions.find(a => a.id === newsItem.attractionId);
              return (
                <Card
                  key={newsItem.id}
                  className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow relative"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  {newsItem.status === 'all_good' && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded z-10">
                      все в порядке
                    </div>
                  )}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={attraction?.image || 'https://images.unsplash.com/photo-1586800463720-febbe6eb4028?w=800'}
                      alt={newsItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-lg mb-1">{newsItem.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{newsItem.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
          {visibleNews < news.length && (
            <div className="text-center">
              <Button
                onClick={() => setVisibleNews(prev => Math.min(prev + 5, news.length))}
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
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="q1" className="bg-white rounded-lg px-6 shadow-sm">
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Для чего был создан сайт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт был сделан в качестве дипломной работы для школы и участия в научной конференции "Инженерная мысль" от КНИТУ-КАИ.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="bg-white rounded-lg px-6 shadow-sm">
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Про что сайт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт посвящен достопримечательностям Татарстана, которые стоит посетить.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="bg-white rounded-lg px-6 shadow-sm">
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                У меня есть вопросы, есть ли контактная информация для их передачи?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, есть. На сайте указана почта, на которую вы можете отправлять свои вопросы.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="bg-white rounded-lg px-6 shadow-sm">
              <AccordionTrigger className="font-semibold text-lg hover:text-primary">
                Почему на сайте мало достопримечательностей?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сайт был сделан недавно как проектная работа, поэтому указаны не все достопримечательности. В будущем мы планируем продолжить поддержку сайта и увеличить количество достопримечательностей. Если вы знаете что можно добавить, пишите нам на почту.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer id="contact" className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-heading font-bold mb-4">Обратная связь</h3>
            <p className="mb-6">
              Сайт выполнен в качестве проекта по информатике ученика 10 класса Ганеева Эрнеста Тимуровича МБОУ Школа 70 г. Казань
            </p>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={20} />
              <a href="mailto:nuri01919@gmail.com" className="text-secondary hover:underline font-medium">
                nuri01919@gmail.com
              </a>
            </div>
            <p className="text-sm text-muted mt-2">для связи напишите по почте</p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-sm text-muted">© 2025 Достопримечательности Татарстана. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedAttraction} onOpenChange={() => setSelectedAttraction(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-3xl font-heading font-bold mb-4">
            {selectedAttraction?.name}
          </DialogTitle>
          {selectedAttraction && (
            <div>
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Icon name="MapPin" size={18} />
                    {selectedAttraction.city}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {selectedAttraction.category}
                  </span>
                </div>
                <p className="text-lg leading-relaxed">{selectedAttraction.description}</p>
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
                src={attractions.find(a => a.id === selectedNews.attractionId)?.image || 'https://images.unsplash.com/photo-1586800463720-febbe6eb4028?w=800'}
                alt={selectedNews.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
              <p className="text-lg leading-relaxed">{selectedNews.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
