import { useEffect, useRef } from 'react';
import { Attraction } from '@/data/attractions';

interface YandexMapProps {
  attractions: Attraction[];
  onMarkerClick: (attraction: Attraction) => void;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ attractions, onMarkerClick }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.ymaps || !mapRef.current) return;

      window.ymaps.ready(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }

        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.798551, 49.105324],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl']
        });

        mapInstanceRef.current = map;

        attractions.forEach((attraction) => {
          const placemark = new window.ymaps.Placemark(
            attraction.coordinates,
            {
              balloonContentHeader: `<strong>${attraction.name}</strong>`,
              balloonContentBody: `
                <div style="max-width: 250px;">
                  <img src="${attraction.images[0]}" alt="${attraction.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
                  <p style="margin: 0 0 8px 0; font-size: 13px;">${attraction.city}</p>
                  <p style="margin: 0 0 12px 0; font-size: 14px;">${attraction.shortDescription}</p>
                  <button 
                    id="view-${attraction.id}" 
                    style="
                      background: #059669; 
                      color: white; 
                      border: none; 
                      padding: 8px 16px; 
                      border-radius: 6px; 
                      cursor: pointer;
                      font-size: 14px;
                      width: 100%;
                    "
                  >
                    Подробнее
                  </button>
                </div>
              `,
              hintContent: attraction.name
            },
            {
              preset: 'islands#greenDotIcon',
              iconColor: '#059669'
            }
          );

          map.geoObjects.add(placemark);

          placemark.events.add('balloonopen', () => {
            const button = document.getElementById(`view-${attraction.id}`);
            if (button) {
              button.addEventListener('click', () => {
                onMarkerClick(attraction);
                placemark.balloon.close();
              });
            }
          });
        });
      });
    };

    if (window.ymaps) {
      initMap();
    } else {
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkYmaps);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkYmaps);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [attractions, onMarkerClick]);

  return <div ref={mapRef} className="w-full h-[600px] rounded-lg shadow-lg" />;
};

export default YandexMap;
