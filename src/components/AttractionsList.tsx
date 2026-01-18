import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { attractions, Attraction } from "@/data/attractions";

interface AttractionsListProps {
  visibleAttractions: number;
  selectedAttraction: Attraction | null;
  attractionsRef: React.RefObject<HTMLDivElement>;
  onLoadMore: () => void;
  onSelectAttraction: (attraction: Attraction) => void;
  onCloseDialog: () => void;
}

const AttractionsList = ({
  visibleAttractions,
  selectedAttraction,
  attractionsRef,
  onLoadMore,
  onSelectAttraction,
  onCloseDialog,
}: AttractionsListProps) => {
  return (
    <section
      id="attractions"
      className="mb-16 scroll-mt-20"
      ref={attractionsRef}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        Популярные достопримечательности
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.slice(0, visibleAttractions).map((attraction) => (
          <Card
            key={attraction.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => onSelectAttraction(attraction)}
          >
            <div className="relative overflow-hidden h-48">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Icon name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {attraction.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {attraction.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {attraction.description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="MapPin" className="w-4 h-4 mr-1" />
                <span className="truncate">{attraction.address}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {visibleAttractions < attractions.length && (
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

      <Dialog open={!!selectedAttraction} onOpenChange={onCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedAttraction?.name}
          </DialogTitle>
          {selectedAttraction && (
            <div>
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  {selectedAttraction.name}
                </h2>
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <Icon name="Star" className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {selectedAttraction.rating}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                {selectedAttraction.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Адрес</p>
                    <p className="text-muted-foreground">
                      {selectedAttraction.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon name="Clock" className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">
                      {selectedAttraction.workingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Icon name="Ticket" className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Стоимость</p>
                    <p className="text-muted-foreground">
                      {selectedAttraction.price}
                    </p>
                  </div>
                </div>

                {selectedAttraction.phone && (
                  <div className="flex items-start gap-2">
                    <Icon name="Phone" className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <a
                        href={`tel:${selectedAttraction.phone}`}
                        className="text-primary hover:underline"
                      >
                        {selectedAttraction.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedAttraction.website && (
                  <div className="flex items-start gap-2">
                    <Icon name="Globe" className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Веб-сайт</p>
                      <a
                        href={selectedAttraction.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                      >
                        {selectedAttraction.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AttractionsList;
