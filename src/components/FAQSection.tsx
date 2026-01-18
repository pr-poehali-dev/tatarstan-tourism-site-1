import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Часто задаваемые вопросы
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Когда лучше посетить Казань?</AccordionTrigger>
          <AccordionContent>
            Лучшее время для посещения Казани — с мая по сентябрь, когда
            погода теплая и комфортная для прогулок. Однако зимой город тоже
            очень красив, особенно во время новогодних праздников.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Сколько дней нужно на осмотр Казани?
          </AccordionTrigger>
          <AccordionContent>
            Для осмотра основных достопримечательностей Казани достаточно 2-3
            дней. Если вы хотите посетить окрестности (Свияжск, Булгары,
            Раифский монастырь), планируйте 4-5 дней.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Нужна ли виза для посещения Казани?
          </AccordionTrigger>
          <AccordionContent>
            Для граждан России виза не требуется. Иностранным туристам нужна
            российская виза. Граждане некоторых стран могут получить
            электронную визу.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Как добраться до Казани?</AccordionTrigger>
          <AccordionContent>
            В Казань можно добраться самолетом (аэропорт "Казань"),
            поездом (железнодорожный вокзал "Казань-Пассажирская"), автобусом
            или на автомобиле. Из Москвы удобнее всего лететь самолетом (1,5
            часа) или ехать на скоростном поезде "Сапсан" (11 часов).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Какую кухню стоит попробовать в Казани?
          </AccordionTrigger>
          <AccordionContent>
            Обязательно попробуйте татарскую кухню: эчпочмак (треугольные
            пирожки с мясом), чак-чак (сладость из теста с медом), кыстыбый
            (лепешка с начинкой), азу по-татарски, и, конечно, традиционный
            чай с татарскими сладостями.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Есть ли в Казани общественный транспорт?
          </AccordionTrigger>
          <AccordionContent>
            Да, в Казани хорошо развита сеть общественного транспорта: метро
            (одна линия), автобусы, троллейбусы и трамваи. Также популярны
            такси и каршеринг. Метро соединяет центр города с отдаленными
            районами.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            Какие сувениры привезти из Казани?
          </AccordionTrigger>
          <AccordionContent>
            Популярные сувениры: чак-чак в подарочной упаковке, татарская
            тюбетейка, изделия из кожи, посуда с национальным орнаментом,
            татарские сладости, мед, изделия ручной работы с символикой
            Казани и Татарстана.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            Можно ли посетить мечети немусульманам?
          </AccordionTrigger>
          <AccordionContent>
            Да, большинство мечетей в Казани открыты для всех посетителей.
            Необходимо соблюдать дресс-код (закрытая одежда, женщинам —
            платок на голову) и правила поведения. Мечеть Кул Шариф в Кремле
            — одна из самых посещаемых достопримечательностей.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
