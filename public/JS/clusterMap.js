mapboxgl.accessToken = token;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [83.218483, 17.686815],
    zoom: 4
});

map.on('load', () => {

    map.addSource('memories', {
        type: 'geojson',
        data: memories,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'memories',
        filter: ['has', 'point_count'],
        paint: {

            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#ff8fa3',
                15,
                '#ff758f',
                25,
                '#ff4d6d'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                15,
                20,
                25,
                24
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'memories',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 13
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'memories',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#c9184a',
            'circle-radius': 5,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });


    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('memories').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });


    map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const msg = e.features[0].properties.popUpMarkup;


        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                msg
            )
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');