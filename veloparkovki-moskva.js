ymaps.ready(init);

function fromMosToYaMapsCollection(mosData) {
    var featuresCollection = [];

    for (var key in mosData['features']) {
        var mosItem = mosData['features'][key];

        mosItem.geometry.coordinates.reverse();

        featuresCollection.push({
            id: mosItem.properties.Attributes.global_id,
            type: 'Feature',
            geometry: mosItem.geometry,
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
        clusterize: true,
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
