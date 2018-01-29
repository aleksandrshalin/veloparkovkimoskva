ymaps.ready(init);

/**
 * Форматируем данные с data.mos.ru в формат yandex map
 *
 * @param mosData
 * @returns {Array}
 */
function fromMosToYaMapsCollection(mosData) {
    var featuresCollection = [];

    for (var key in mosData['features']) {
        var mosItem = mosData['features'][key];

        mosItem.geometry.coordinates.reverse(); // Переворачиваем координаты под формат яндекс карт

        featuresCollection.push({
            id: mosItem.properties.Attributes.global_id, //Уникальный айди точки
            type: 'Feature',
            geometry: mosItem.geometry, //Преобразованные координаты
            properties: {
                hintContent: mosItem.properties.Attributes.Address,
                balloonContent: mosItem.properties.Attributes.Name
            }
        });
    }

    return featuresCollection;
}


function init() {

    var objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 12,
        behaviors: ['default', 'scrollZoom'],
        controls: []
    });

    objectManager.objects.options.set('preset', 'twirl#nightDotIcon');
    objectManager.clusters.options.set('preset', 'twirl#invertedNightClusterIcons');

    $.get("mos_data.json").done(function (data) {
        var yaCollection = fromMosToYaMapsCollection(data);
        objectManager.add(yaCollection);
        myMap.geoObjects.add(objectManager);
    });

}
