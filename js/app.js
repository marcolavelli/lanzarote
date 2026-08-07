// ========================================================
//  LANZAROTE 2026 – WEB APP
//  Itinerario interattivo con mappa e percorsi stradali
// ========================================================

(function() {
    'use strict';

    // --- COUNTDOWN ---
    const DEPARTURE = new Date('2026-08-16T17:50:00+02:00');

    function updateCountdown() {
        const now = new Date();
        const diff = DEPARTURE - now;
        
        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '🌴';
            document.getElementById('cd-hours').textContent = '';
            document.getElementById('cd-mins').textContent = '';
            document.querySelectorAll('.countdown-sep').forEach(s => s.style.display = 'none');
            return;
        }
        
        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);

    // --- ITINERARY DATA ---
    const itineraryData = [
        {
            dayNum: "1", date: "16 Ago (Dom)", area: "airport",
            title: "✈️ ARRIVO A LANZAROTE",
            morning: { title: "Atterraggio e Arrivo", desc: "Atterraggio ore 17:50 all'Aeroporto ACE. Ritiro bagagli e noleggio auto CICAR. Transfer verso Costa Teguise (~25 min)." },
            afternoon: { title: "Primo tuffo al tramonto", desc: "Passeggiata verso Spiaggia El Jablillo o Playa Bastián. Esplorazione del Pueblo Marinero." },
            evening: "Cena al Pueblo Marinero, Costa Teguise.",
            note: "Ritiro auto CICAR: patente + CC. Fare il pieno in zona aeroporto. Supermercato vicino per prima spesa."
        },
        {
            dayNum: "2", date: "17 Ago (Lun)", area: "north",
            title: "🌋 JAMEOS DEL AGUA & CUEVA DE LOS VERDES",
            morning: { title: "Grotte Vulcaniche", desc: "Partenza ore 09:30. Cueva de los Verdes: tunnel vulcanico spettacolare. A seguire Jameos del Agua: grotta trasformata da Manrique." },
            afternoon: { title: "Condotti di Lava & Arrieta", desc: "Esplorazione dei bufaderos e condotti di lava di Mala. Poi Playa de la Garita ad Arrieta per bagno e snorkeling." },
            evening: "Cena ad Arrieta (chiringuitos pesce fresco).",
            note: "Jameos e Cueva: biglietto combo disponibile. Arrieta è a 5 min da Jameos."
        },
        {
            dayNum: "3", date: "18 Ago (Mar)", area: "west",
            title: "🔥 TIMANFAYA E COSTA OVEST",
            morning: { title: "Parco Timanfaya (PRENOTATO 09:30)", desc: "Ingresso confermato 09:30. Tour Montañas del Fuego col bus del parco. Arrivare 15 min prima." },
            afternoon: { title: "El Golfo, Lago Verde & Los Hervideros", desc: "Lago verde vulcanico, scogliere laviche battute dall'oceano." },
            evening: "Cena a El Golfo, ristoranti di pesce sul mare.",
            note: "⚠️ Timanfaya PRENOTATO! Charco de los Clicos: sentiero sud è spettacolare."
        },
        {
            dayNum: "4", date: "19 Ago (Mer)", area: "center",
            title: "🍷 VULCANI E VINI",
            morning: { title: "Las Grietas & La Geria", desc: "Esplorazione di Las Grietas (sulla LZ-35). A seguire La Geria: viti nei crateri. Degustazione in Bodega (es. El Grifo)." },
            afternoon: { title: "Puerto del Carmen", desc: "Relax nella spiaggia più lunga dell'isola (4 km). Lungomare animato, gelato artigianale." },
            evening: "Cena a Puerto del Carmen (vasta scelta).",
            note: "Las Grietas: parcheggio bordo strada. Bodegas: prenotare degustazione online (~15€)."
        },
        {
            dayNum: "5", date: "20 Ago (Gio)", area: "graciosa",
            title: "🏖️ ESCURSIONE ISLA GRACIOSA",
            morning: { title: "Traghetto e Bici", desc: "Partenza 07:30 verso Órzola. Traghetto Líneas Romero (25 min). Noleggio bici a Caleta de Sebo." },
            afternoon: { title: "Playa de las Conchas", desc: "Spiaggia paradisiaca (sabbia dorata, acqua turchese). Attenzione alle forti correnti!" },
            evening: "Cena a Órzola dopo il traghetto di ritorno (entro le 18:00).",
            note: "Traghetti: lineasromero.com, prenotare in anticipo! Portare contanti, acqua, scarpe chiuse."
        },
        {
            dayNum: "6", date: "21 Ago (Ven)", area: "north",
            title: "🌵 JARDÍN DE CACTUS & FAMARA",
            morning: { title: "Cactus e Città Stratificata", desc: "Jardín de Cactus a Guatiza (opera di Manrique). Poi Rofera de Teseguite, paesaggio astratto di roccia." },
            afternoon: { title: "Playa de Famara al tramonto", desc: "Spiaggia immensa e selvaggia ai piedi delle scogliere. Ideale per surf e tramonto favoloso." },
            evening: "Cena a Caleta de Famara vista oceano.",
            note: "Rofera: esplorare a piedi le formazioni. Famara: attenzione correnti."
        },
        {
            dayNum: "7", date: "22 Ago (Sab)", area: "north",
            title: "⛰️ NORD E HARÍA",
            morning: { title: "Mercato di Haría & Trekking", desc: "Sabato mattina: Mercatino artigianale di Haría. Discesa nel cratere del Volcán de la Corona." },
            afternoon: { title: "Mirador del Río", desc: "Vista sull'arcipelago Chinijo dal Mirador (475m). Bagno alle calette di Orzola." },
            evening: "Cena a Costa Teguise.",
            note: "Trekking Volcán Corona: scarpe robuste. Mirador del Río chiude alle 17:45."
        },
        {
            dayNum: "8", date: "23 Ago (Dom)", area: "center",
            title: "🎪 MERCATO DI TEGUISE",
            morning: { title: "L'Antica Capitale", desc: "Il grande mercato artigianale di Teguise (9-14). Plaza de la Constitución e Iglesia." },
            afternoon: { title: "Pranzo Teleclub & Relax", desc: "Pranzo al Teleclub de Tao o Mozaga. Pomeriggio relax a Playa de las Cucharas." },
            evening: "Aperitivo e cena al Pueblo Marinero.",
            note: "Teguise: parcheggio a pagamento. Teleclub: prezzi ottimi. Portare contanti."
        },
        {
            dayNum: "9", date: "24 Ago (Lun)", area: "west",
            title: "🌊 TENESAR E ARRECIFE",
            morning: { title: "Tenesar: Villaggio Dimenticato", desc: "Costa nord-ovest frastagliata. Tenesar è isolato tra lava e onde furiose." },
            afternoon: { title: "Arrecife & Charco de San Ginés", desc: "Castillo San Gabriel. Passeggiata nella laguna cittadina (Charco)." },
            evening: "Tapas bar nel centro storico di Arrecife.",
            note: "Tenesar: NON balneabile, onde pericolose. Arrecife: parcheggio sul lungomare."
        },
        {
            dayNum: "10", date: "25 Ago (Mar)", area: "center",
            title: "🚤 SAFARI A PUERTO CALERO",
            morning: { title: "Safari in mare (PRENOTATO 09:00)", desc: "Esperienza di Safari in mare alle 09:00 a Puerto Calero. Arrivare con anticipo al molo." },
            afternoon: { title: "Relax a Puerto Calero", desc: "Pranzo al porticciolo. Calette di Playa Quemada (spiaggia nera vulcanica)." },
            evening: "Rientro a Costa Teguise o cena in zona.",
            note: "⚠️ Safari PRENOTATO! Parcheggio comodo vicino al porto turistico."
        },
        {
            dayNum: "11", date: "26 Ago (Mer)", area: "south",
            title: "🏝️ SUD DELL'ISOLA E PAPAGAYO",
            morning: { title: "Yaiza & Faro Pechiguera", desc: "Mattina a Yaiza (villaggio bianco curatissimo). Passeggiata fino al faro." },
            afternoon: { title: "Punta Papagayo", desc: "Riserva naturale. Calette turchesi perfette per snorkeling (Playa Mujeres, Papagayo)." },
            evening: "Cena a Playa Blanca lungomare.",
            note: "Papagayo: 3€ a veicolo. Strada sterrata. Arrivare presto."
        },
        {
            dayNum: "12", date: "27 Ago (Gio)", area: "south",
            title: "⛴️ ESCURSIONE A FUERTEVENTURA",
            morning: { title: "Traghetto da Playa Blanca", desc: "Partenza 07:00 verso sud. Traghetto per Corralejo (~35 min). Visita centro cittadino." },
            afternoon: { title: "Dune di Corralejo & Pop Corn Beach", desc: "Parco Naturale Dune: deserto bianco. Bagno alle Grandes Playas. Playa del Bajo de la Burra." },
            evening: "Traghetto di rientro. Cena a Playa Blanca.",
            note: "Portare Documento di Identità valido per il traghetto!"
        },
        {
            dayNum: "13", date: "28 Ago (Ven)", area: "center",
            title: "🎨 CÉSAR MANRIQUE & SALINE",
            morning: { title: "Fondazione & Monumento Campesino", desc: "Fondazione César Manrique (Tahiche), casa costruita in bolle vulcaniche." },
            afternoon: { title: "Salinas de Janubio al tramonto", desc: "Grandi saline, scacchiera di colori. Uno dei tramonti più fotogenici dell'isola." },
            evening: "Cena a Yaiza o Uga, ristoranti tipici.",
            note: "Fondazione Manrique: ~10€. Saline ottime per foto nell'ora d'oro."
        },
        {
            dayNum: "14", date: "29 Ago (Sab)", area: "north",
            title: "🌴 VALLE DELLE PALME E SOUVENIR",
            morning: { title: "Ultima esplorazione Nord", desc: "Casa-Museo di Manrique (Haría) o paesini interni (Tiagua, Soo)." },
            afternoon: { title: "Ultimo mare", desc: "Caletta preferita: Famara per paesaggio, Arrieta per tranquillità, o Papagayo." },
            evening: "CENA DI ADDIO in un ristorante Top.",
            note: "Fare il pieno per riconsegnare l'auto domani. Preparare i bagagli!"
        },
        {
            dayNum: "15", date: "30 Ago (Dom)", area: "airport",
            title: "✈️ PARTENZA",
            morning: { title: "Check-out", desc: "Sveglia ore 07:00, colazione, ultime foto. Check-out entro le 11:00." },
            afternoon: { title: "Arrivederci Lanzarote!", desc: "Consegna auto CICAR in aeroporto. Arrivo max ore 15:55. Volo ore 18:25." },
            evening: "In volo verso casa.",
            note: "Attenzione al peso bagagli se avete comprato vino/souvenir pesanti."
        }
    ];

    // --- MAP DATA ---
    const HOME = [28.9959, -13.4921]; // Costa Teguise

    const mapLocations = [
        { name: "Aeroporto ACE",           lat: 28.9455, lng: -13.6052, day: "Giorno 1 & 15", desc: "Arrivo e ripartenza. Ritiro auto CICAR.", area: "airport" },
        { name: "Alloggio: Costa Teguise",  lat: 28.9959, lng: -13.4921, day: "Base",          desc: "Il tuo appartamento.",                    area: "home" },
        { name: "Jameos del Agua",          lat: 29.1610, lng: -13.4310, day: "Giorno 2",      desc: "Grotta vulcanica di Manrique.",            area: "north" },
        { name: "Cueva de los Verdes",      lat: 29.1614, lng: -13.4388, day: "Giorno 2",      desc: "Tunnel vulcanico di 1.5 km.",              area: "north" },
        { name: "Arrieta & Mala",           lat: 29.1433, lng: -13.4600, day: "Giorno 2",      desc: "Pranzo pesce, bufaderos di Mala.",         area: "north" },
        { name: "P.N. Timanfaya",           lat: 29.0033, lng: -13.7547, day: "Giorno 3",      desc: "PRENOTATO 09:30. Montañas del Fuego.",     area: "west" },
        { name: "El Golfo & Clicos",        lat: 28.9818, lng: -13.8290, day: "Giorno 3",      desc: "Il famoso lago verde vulcanico.",           area: "west" },
        { name: "Los Hervideros",           lat: 28.9531, lng: -13.8344, day: "Giorno 3",      desc: "Scogliere laviche frastagliate.",           area: "west" },
        { name: "La Geria (Vigneti)",       lat: 28.9749, lng: -13.7153, day: "Giorno 4",      desc: "Degustazione Malvasia nei crateri.",        area: "center" },
        { name: "Las Grietas",              lat: 28.9723, lng: -13.6288, day: "Giorno 4",      desc: "Canyon lavici spettacolari.",               area: "center" },
        { name: "Puerto del Carmen",        lat: 28.9221, lng: -13.6521, day: "Giorno 4",      desc: "Playa Matagorda e lungomare.",              area: "center" },
        { name: "Órzola (Graciosa)",        lat: 29.2235, lng: -13.4542, day: "Giorno 5",      desc: "Partenza traghetto.",                       area: "graciosa" },
        { name: "Jardín de Cactus",         lat: 29.0805, lng: -13.4795, day: "Giorno 6",      desc: "Ultima opera di Manrique.",                 area: "north" },
        { name: "Rofera de Teseguite",      lat: 29.0494, lng: -13.5226, day: "Giorno 6",      desc: "'Città Stratificata'.",                     area: "north" },
        { name: "Playa de Famara",          lat: 29.1171, lng: -13.5658, day: "Giorno 6",      desc: "Spiaggia immensa e tramonto.",              area: "west" },
        { name: "Haría",                    lat: 29.1466, lng: -13.4990, day: "Giorno 7 & 14", desc: "Mercatino artigianale.",                    area: "north" },
        { name: "Volcán de la Corona",      lat: 29.1820, lng: -13.4930, day: "Giorno 7",      desc: "Trekking fino al cratere.",                 area: "north" },
        { name: "Mirador del Río",          lat: 29.2144, lng: -13.4816, day: "Giorno 7",      desc: "Panorama su La Graciosa (475m).",           area: "north" },
        { name: "Villa de Teguise",         lat: 29.0594, lng: -13.5599, day: "Giorno 8",      desc: "L'antica capitale e il Mercato.",           area: "center" },
        { name: "Tenesar",                  lat: 29.0683, lng: -13.7143, day: "Giorno 9",      desc: "Villaggio isolato tra lava.",               area: "west" },
        { name: "Arrecife",                 lat: 28.9626, lng: -13.5515, day: "Giorno 9",      desc: "La capitale: Castillo e Charco.",           area: "center" },
        { name: "Safari Puerto Calero",     lat: 28.9167, lng: -13.7042, day: "Giorno 10",     desc: "PRENOTATO 09:00. Safari in mare.",          area: "center" },
        { name: "Playa Blanca",             lat: 28.8654, lng: -13.8291, day: "Giorno 11",     desc: "Sud dell'isola.",                           area: "south" },
        { name: "Yaiza",                    lat: 28.9542, lng: -13.7667, day: "Giorno 11",     desc: "Villaggio bianco curatissimo.",             area: "south" },
        { name: "Punta Papagayo",           lat: 28.8443, lng: -13.7857, day: "Giorno 11",     desc: "Calette turchesi.",                         area: "south" },
        { name: "Porto Fuerteventura",      lat: 28.8624, lng: -13.8322, day: "Giorno 12",     desc: "Traghetto per Corralejo.",                  area: "south" },
        { name: "Corralejo (Fuerteventura)",lat: 28.7360, lng: -13.8670, day: "Giorno 12",     desc: "Centro cittadino e noleggio.",              area: "south" },
        { name: "Pop Corn Beach",           lat: 28.7431, lng: -13.8966, day: "Giorno 12",     desc: "Playa del Bajo de la Burra.",               area: "south" },
        { name: "Dune di Corralejo",        lat: 28.6946, lng: -13.8436, day: "Giorno 12",     desc: "Parco Naturale e deserto di sabbia.",       area: "south" },
        { name: "Fond. C. Manrique",        lat: 29.0033, lng: -13.5489, day: "Giorno 13",     desc: "Casa museo su bolle vulcaniche.",           area: "center" },
        { name: "Salinas de Janubio",       lat: 28.9372, lng: -13.8247, day: "Giorno 13",     desc: "Saline antiche al tramonto.",               area: "south" }
    ];

    const AREA_COLORS = {
        home: 'red', airport: 'grey', north: 'green',
        west: 'orange', south: 'gold', center: 'blue', graciosa: 'violet'
    };

    // Waypoints for daily routes
    const WP = {
        airport:  [28.9455, -13.6052],
        jameos:   [29.1610, -13.4310], cueva:     [29.1614, -13.4388], arrieta:  [29.1433, -13.4600],
        timanfaya:[29.0033, -13.7547], golfo:     [28.9818, -13.8290], hervideros:[28.9531,-13.8344],
        grietas:  [28.9723, -13.6288], geria:     [28.9749, -13.7153], pdc:      [28.9221, -13.6521],
        orzola:   [29.2235, -13.4542],
        cactus:   [29.0805, -13.4795], teseguite: [29.0494, -13.5226], famara:   [29.1171, -13.5658],
        haria:    [29.1466, -13.4990], corona:    [29.1820, -13.4930], mirador:  [29.2144, -13.4816],
        teguise:  [29.0594, -13.5599],
        tenesar:  [29.0683, -13.7143], arrecife:  [28.9626, -13.5515],
        calero:   [28.9167, -13.7042],
        yaiza:    [28.9542, -13.7667], papagayo:  [28.8443, -13.7857], pblanca:  [28.8654, -13.8291],
        pblancaP: [28.8624, -13.8322], corralejo: [28.7360, -13.8670], popcorn:  [28.7431, -13.8966], dune: [28.6946, -13.8436],
        tahiche:  [29.0033, -13.5489], salinas:   [28.9372, -13.8247]
    };

    const dailyRoutes = {
        "1":  [WP.airport, HOME],
        "2":  [HOME, WP.cueva, WP.jameos, WP.arrieta, HOME],
        "3":  [HOME, WP.timanfaya, WP.golfo, WP.hervideros, HOME],
        "4":  [HOME, WP.grietas, WP.geria, WP.pdc, HOME],
        "5":  [HOME, WP.orzola, HOME],
        "6":  [HOME, WP.cactus, WP.teseguite, WP.famara, HOME],
        "7":  [HOME, WP.haria, WP.corona, WP.mirador, HOME],
        "8":  [HOME, WP.teguise, HOME],
        "9":  [HOME, WP.tenesar, WP.arrecife, HOME],
        "10": [HOME, WP.calero, HOME],
        "11": [HOME, WP.yaiza, WP.papagayo, WP.pblanca, HOME],
        "12": [HOME, WP.pblancaP, WP.corralejo, WP.popcorn, WP.dune, WP.corralejo, WP.pblancaP, HOME],
        "13": [HOME, WP.tahiche, WP.salinas, HOME],
        "14": [HOME, WP.haria, HOME],
        "15": [HOME, WP.airport]
    };

    // --- RENDER ITINERARY ---
    const listContainer = document.getElementById('itinerary-list');
    
    itineraryData.forEach((day, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-day', day.dayNum);
        card.style.animationDelay = (idx * 0.05) + 's';
        card.innerHTML = `
            <div class="card-header">
                <span class="card-day">Giorno ${day.dayNum}</span>
                <span class="card-date">${day.date}</span>
            </div>
            <h3 class="card-title">${day.title}</h3>
            
            <div class="card-section">
                <h4><i class="fa-regular fa-sun"></i> Mattina</h4>
                <p><strong>${day.morning.title}:</strong> ${day.morning.desc}</p>
            </div>
            
            <div class="card-section">
                <h4><i class="fa-solid fa-cloud-sun"></i> Pomeriggio</h4>
                <p><strong>${day.afternoon.title}:</strong> ${day.afternoon.desc}</p>
            </div>
            
            <div class="card-section">
                <h4><i class="fa-solid fa-moon"></i> Sera</h4>
                <p>${day.evening}</p>
            </div>
            
            <div class="card-note">
                <i class="fa-solid fa-circle-info"></i> ${day.note}
            </div>
            
            <div class="card-action">
                <button class="btn-map" onclick="showRouteOnMap('${day.dayNum}')">
                    <i class="fa-solid fa-route"></i> Vedi percorso su mappa
                </button>
            </div>
        `;
        listContainer.appendChild(card);
    });

    // --- MAP SELECT OPTIONS ---
    const select = document.getElementById('day-select');
    
    const dayLabels = {
        "1": "Giorno 1: Arrivo", "2": "Giorno 2: Jameos & Cueva",
        "3": "Giorno 3: Timanfaya", "4": "Giorno 4: Vulcani e Vini",
        "5": "Giorno 5: La Graciosa", "6": "Giorno 6: Cactus & Famara",
        "7": "Giorno 7: Haría & Mirador", "8": "Giorno 8: Teguise",
        "9": "Giorno 9: Tenesar & Arrecife", "10": "Giorno 10: Safari Calero",
        "11": "Giorno 11: Papagayo", "12": "Giorno 12: Fuerteventura",
        "13": "Giorno 13: Manrique & Saline", "14": "Giorno 14: Haría & Nord",
        "15": "Giorno 15: Partenza"
    };

    Object.keys(dayLabels).forEach(key => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = dayLabels[key];
        select.appendChild(opt);
    });

    // --- NAVIGATION ---
    const navItems = document.querySelectorAll('.nav-item');
    const views    = document.querySelectorAll('.view');
    let mapInstance = null;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('data-target');
            views.forEach(v => v.classList.toggle('active', v.id === targetId));

            if (targetId === 'view-map') {
                initMap();
                setTimeout(() => mapInstance.invalidateSize(), 150);
            }
        });
    });

    // --- MAP INITIALISATION (lazy) ---
    let mapReady = false;
    let routingControl = null;
    let markers = [];

    function createIcon(color) {
        return L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color + '.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41], iconAnchor: [12, 41],
            popupAnchor: [1, -34], shadowSize: [41, 41]
        });
    }

    function initMap() {
        if (mapReady) return;
        mapReady = true;

        mapInstance = L.map('map').setView([29.0469, -13.6268], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap',
            subdomains: 'abcd', maxZoom: 19
        }).addTo(mapInstance);

        // Place markers
        mapLocations.forEach(loc => {
            const icon = createIcon(AREA_COLORS[loc.area] || 'blue');
            const marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(mapInstance);

            const gmapsLink = `https://www.google.com/maps/dir/?api=1&origin=${HOME[0]},${HOME[1]}&destination=${loc.lat},${loc.lng}&travelmode=driving`;
            marker.bindPopup(`
                <div>
                    <span class="day-badge">${loc.day}</span>
                    <h3>${loc.name}</h3>
                    <p>${loc.desc}</p>
                    <a href="${gmapsLink}" target="_blank" class="gmaps-link">🚗 Naviga con Google Maps</a>
                </div>
            `);
            markers.push(marker);
        });

        // Dropdown event
        select.addEventListener('change', (e) => applyRoute(e.target.value));
    }

    function applyRoute(day) {
        if (!mapInstance) return;

        if (routingControl) {
            mapInstance.removeControl(routingControl);
            routingControl = null;
        }

        if (day !== 'none' && dailyRoutes[day]) {
            const waypoints = dailyRoutes[day].map(c => L.latLng(c[0], c[1]));

            routingControl = L.Routing.control({
                waypoints: waypoints,
                routeWhileDragging: false,
                addWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                lineOptions: { styles: [{ color: '#1e3a5f', weight: 6, opacity: 0.85 }] },
                createMarker: () => null,
                show: false,
                language: 'it'
            }).addTo(mapInstance);
        } else {
            mapInstance.setView([29.0469, -13.6268], 11);
        }
    }

    // --- GLOBAL: showRouteOnMap (from itinerary cards) ---
    window.showRouteOnMap = function(dayNum) {
        // Switch to map tab
        document.getElementById('nav-map').click();

        // Update selector
        select.value = dayNum;

        // Apply route (small delay so map is properly initialised)
        setTimeout(() => applyRoute(dayNum), 300);
    };

})();
