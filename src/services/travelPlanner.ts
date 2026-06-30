export interface Activity {
  time: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  cost: number;
  location: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface BudgetAllocation {
  category: string;
  amount: number;
  percentage: number;
}

export interface PlaceRecommendation {
  name: string;
  description: string;
}

export interface FoodRecommendation {
  dish: string;
  description: string;
}

export interface TravelPlan {
  destination: string;
  days: number;
  budget: number;
  interests: string[];
  travelType: string;
  summary: string;
  itinerary: DayPlan[];
  budgetBreakdown: BudgetAllocation[];
  packingList: string[];
  localTips: string[];
  safetyTips: string[];
  moneySavingTips: string[];
  weatherAdvisory: string;
  topPlaces: PlaceRecommendation[];
  localFoods: FoodRecommendation[];
  hiddenGems: PlaceRecommendation[];
  generatedBy: 'gemini' | 'offline';
  createdAt?: string;
  fallbackHappened?: boolean;
}

// ─── Curated destination templates ───────────────────────────────────────────

interface DestinationTemplate {
  summary: string;
  weather: string;
  tips: string[];
  safetyTips: string[];
  moneySavingTips: string[];
  topPlaces: PlaceRecommendation[];
  localFoods: FoodRecommendation[];
  hiddenGems: PlaceRecommendation[];
  activities: {
    interests: string[];
    morning: { title: string; description: string; cost: number; location: string }[];
    afternoon: { title: string; description: string; cost: number; location: string }[];
    evening: { title: string; description: string; cost: number; location: string }[];
  }[];
  packing: string[];
}

const POPULAR_DESTINATIONS: Record<string, DestinationTemplate> = {
  tokyo: {
    summary: "Experience a futuristic metropolis blended with historic temples, stunning green spaces, and world-class culinary highlights.",
    weather: "Pleasant with mild breezes. Average temperature: 18°C. Perfect for walking tours.",
    tips: [
      "Get a Suica or Pasmo IC card for easy train travel.",
      "Most cash registers expect you to place money on the small tray provided, rather than passing it directly.",
      "Carry a small bag for trash, as public bins are extremely rare.",
      "Tipping is not practiced in Japan and can be considered rude."
    ],
    safetyTips: [
      "Japan is extremely safe, but always keep your belongings secure on crowded trains during rush hour.",
      "Earthquakes are common — familiarize yourself with hotel evacuation routes and emergency sirens.",
      "Avoid jaywalking; pedestrian laws are strictly followed and fines exist.",
      "Download the 'Safety Tips' app by the Japanese govt for real-time disaster alerts in English.",
      "Carry your passport at all times — it's legally required for foreign visitors."
    ],
    moneySavingTips: [
      "Buy a 24-hour or 72-hour Tokyo Metro Pass for unlimited subway rides at a flat rate.",
      "Eat at conveyor-belt sushi (kaiten-zushi) or standing ramen bars for meals under ¥1000.",
      "Visit free attractions: Meiji Shrine, Senso-ji, Tokyo Metropolitan Government Building observatory.",
      "Shop at 100-yen stores (Daiso, Seria) for souvenirs and daily essentials.",
      "Use convenience stores (7-Eleven, Lawson) for cheap, high-quality meals and onigiri."
    ],
    topPlaces: [
      { name: "Senso-ji Temple, Asakusa", description: "Tokyo's oldest and most iconic Buddhist temple with the famous Thunder Gate and Nakamise shopping street." },
      { name: "Shibuya Crossing", description: "The world's busiest pedestrian intersection — a must-see spectacle of organized chaos." },
      { name: "Meiji Shrine & Yoyogi Park", description: "A serene Shinto shrine nestled in a dense urban forest, perfect for a morning stroll." },
      { name: "TeamLab Planets / Borderless", description: "Immersive, interactive digital art museum — one of the most Instagrammable experiences on earth." },
      { name: "Tsukiji Outer Market", description: "A foodie paradise with stalls serving the freshest sushi, tamagoyaki, and wagyu skewers." },
      { name: "Akihabara Electric Town", description: "Neon-lit hub of anime, manga, gaming arcades, and electronics." },
      { name: "Tokyo Skytree", description: "634m broadcasting tower with observation decks offering 360° views of the city and Mount Fuji." },
      { name: "Shinjuku Gyoen National Garden", description: "A stunning blend of Japanese, English, and French garden styles — perfect for cherry blossom season." }
    ],
    localFoods: [
      { dish: "Tonkotsu Ramen", description: "Rich, creamy pork bone broth ramen with chashu pork, soft-boiled egg, and nori. Try Ichiran or Fuunji." },
      { dish: "Sushi Omakase", description: "Chef's-choice multi-course sushi experience using the freshest seasonal fish from Toyosu Market." },
      { dish: "Tempura", description: "Lightly battered and deep-fried seasonal vegetables and shrimp, served with tentsuyu dipping sauce." },
      { dish: "Wagyu Beef", description: "Melt-in-your-mouth marbled Japanese beef, grilled at your table at a teppanyaki restaurant." },
      { dish: "Tamagoyaki (Sweet Omelet)", description: "Fluffy rolled egg omelet lightly sweetened, a classic street food at Tsukiji Market." },
      { dish: "Monjayaki", description: "Tokyo's answer to okonomiyaki — a runny, savory pancake you cook on a hot plate. Best in Tsukishima." },
      { dish: "Matcha Desserts", description: "Matcha soft serve, parfaits, and mochi from specialty tea shops in Uji and Asakusa." }
    ],
    hiddenGems: [
      { name: "Yanaka Ginza", description: "A charming retro shopping street in a quiet old-town neighborhood, untouched by modern Tokyo." },
      { name: "Shimokitazawa", description: "A bohemian enclave of vintage clothing shops, independent cafes, and tiny live-music venues." },
      { name: "Todoroki Valley", description: "A secret ravine with a wooded walking trail, waterfall, and shrine — right inside suburban Tokyo." },
      { name: "Koenji", description: "Tokyo's underground punk and thrift scene, with incredible vintage stores and tiny izakayas." },
      { name: "Nezu Shrine", description: "A beautifully peaceful shrine with a stunning tunnel of vermillion torii gates, without the Fushimi crowds." }
    ],
    packing: ["Comfortable walking shoes", "Pocket Wi-Fi or eSIM", "Small coin pouch", "Modest clothing for shrines", "Hand sanitizer and small hand towel"],
    activities: [
      {
        interests: ["Historical", "Nature"],
        morning: [{ title: "Meiji Shrine & Yoyogi Park", description: "Walk through the massive torii gate into a peaceful cedar forest housing Tokyo's most famous Shinto shrine.", cost: 0, location: "Shibuya" }],
        afternoon: [{ title: "Imperial Palace Gardens", description: "Stroll through the ruins of the Edo Castle and appreciate the impeccably manicured stone gardens and bridges.", cost: 0, location: "Chiyoda" }],
        evening: [{ title: "Traditional dinner in Asakusa", description: "Walk through Senso-ji temple under the lanterns and dine on tempura and yakitori in the historic alleys.", cost: 2500, location: "Asakusa" }]
      },
      {
        interests: ["Shopping", "Food"],
        morning: [{ title: "Tsukiji Outer Market Tour", description: "Sample fresh sea urchin, tamagoyaki (sweet omelets), strawberry daifuku, and premium green tea.", cost: 2000, location: "Tsukiji" }],
        afternoon: [{ title: "Harajuku & Shibuya Crossing", description: "Explore quirky fashion on Takeshita Street, then watch the organized chaos of Shibuya Crossing from a high cafe.", cost: 1500, location: "Shibuya" }],
        evening: [{ title: "Izakaya crawl in Omoide Yokocho", description: "Squeeze into a narrow 6-seat stall for grilled skewers and drinks in the nostalgic 'Memory Lane'.", cost: 3500, location: "Shinjuku" }]
      },
      {
        interests: ["Adventure", "Historical"],
        morning: [{ title: "TeamLab Planets Digital Art", description: "Wade through water and interact with immersive, three-dimensional digital projections.", cost: 3800, location: "Toyosu" }],
        afternoon: [{ title: "Akihabara Electric Town", description: "Explore multi-level retro gaming stores, anime shops, and maid cafes in the heart of geek culture.", cost: 1200, location: "Akihabara" }],
        evening: [{ title: "Shinjuku Metropolitan Govt Building View", description: "Ascend to the 45th floor observatory for panoramic skyline views, capturing Tokyo Tower and Mount Fuji at sunset.", cost: 0, location: "Shinjuku" }]
      }
    ]
  },
  paris: {
    summary: "Discover the City of Light, synonymous with romance, high fashion, magnificent art collections, and artisanal bakeries.",
    weather: "Mild and slightly breezy. Average temperature: 15°C. Carry a light umbrella.",
    tips: [
      "Always greet shopkeepers with a polite 'Bonjour' or 'Bonsoir' before asking questions.",
      "Validate your metro tickets and keep them until you exit the station.",
      "Avoid eating in immediate tourist squares (e.g. right by the Eiffel Tower) for better quality and pricing.",
      "Dinner starts late, typically after 7:30 PM."
    ],
    safetyTips: [
      "Beware of pickpockets around major tourist areas — Eiffel Tower, Louvre, Sacré-Cœur, and the metro.",
      "Keep valuables in a front crossbody bag, not a backpack or open tote.",
      "Avoid unofficial 'petition signers' and 'bracelet sellers' near monuments — they are common scam tactics.",
      "Stick to well-lit streets at night, especially around Gare du Nord and Châtelet.",
      "Save the local emergency number: 112 (EU-wide) or 17 (Police)."
    ],
    moneySavingTips: [
      "Buy a Paris Museum Pass (2, 4, or 6 days) for unlimited access to 60+ museums and skip-the-line entry.",
      "Use the Navigo Easy card for metro rides at €2.15 each instead of buying single tickets.",
      "Eat the 'formule' lunch menus at bistros — a 2-course meal for €12–€18, much cheaper than à la carte dinner.",
      "Drink tap water (carafe d'eau) at restaurants — it's free by law and excellent quality.",
      "Visit free attractions: Sacré-Cœur, Notre-Dame exterior, Jardin du Luxembourg, Père-Lachaise Cemetery."
    ],
    topPlaces: [
      { name: "Eiffel Tower", description: "The iconic iron lattice tower — take the elevator to the summit for breathtaking panoramic views." },
      { name: "Louvre Museum", description: "The world's largest art museum, home to the Mona Lisa, Venus de Milo, and 35,000+ works." },
      { name: "Sacré-Cœur Basilica", description: "A stunning white-domed church atop Montmartre hill, with sweeping views of the city." },
      { name: "Musée d'Orsay", description: "A former railway station now housing the world's finest collection of Impressionist art." },
      { name: "Champs-Élysées & Arc de Triomphe", description: "Grand avenue leading to the monumental arch — climb to the top for a star-shaped street view." },
      { name: "Sainte-Chapelle", description: "A Gothic chapel with the most stunning 13th-century stained glass windows in existence." },
      { name: "Palace of Versailles", description: "The opulent royal palace and gardens just 40 minutes from Paris — a must for history lovers." }
    ],
    localFoods: [
      { dish: "Croissant au Beurre", description: "Flaky, buttery, and golden — best from a proper boulangerie, not a chain. Try Du Pain et des Idées." },
      { dish: "Croque Monsieur", description: "A hot grilled ham and Gruyère cheese sandwich topped with creamy béchamel sauce." },
      { dish: "Steak Frites", description: "Classic French bistro dish: perfectly cooked steak with crispy thin-cut fries and béarnaise sauce." },
      { dish: "Soupe à l'Oignon", description: "Traditional French onion soup baked with a thick crust of melted Gruyère cheese." },
      { dish: "Crêpes (Galettes)", description: "Savoury buckwheat galettes with ham, cheese, and egg; or sweet crêpes with Nutella and banana." },
      { dish: "Macarons", description: "Delicate almond meringue sandwich cookies — try Ladurée or Pierre Hermé for the finest." },
      { dish: "Escargots de Bourgogne", description: "Snails baked in garlic-parsley-butter, served in their shells — a quintessential Parisian experience." }
    ],
    hiddenGems: [
      { name: "Rue Crémieux", description: "A secret pastel-colored pedestrian street in the 12th arrondissement — Paris's most photogenic hidden alley." },
      { name: "Musée de la Chasse et de la Nature", description: "An eccentric, beautifully curated museum of hunting and nature art in a 17th-century mansion." },
      { name: "Promenade Plantée", description: "An elevated park built on old railway viaducts — the original 'High Line,' predating New York's by 20 years." },
      { name: "Canal Saint-Martin", description: "A trendy, tree-lined canal with iron footbridges, perfect for a sunset picnic with wine and cheese." },
      { name: "Marché des Enfants Rouges", description: "Paris's oldest covered food market (1615) with stalls serving Moroccan, Japanese, Italian, and French cuisine." }
    ],
    packing: ["Stylish layers", "Compact umbrella", "Anti-theft crossbody bag", "Comfortable flats for cobblestone", "Reusable water bottle"],
    activities: [
      {
        interests: ["Historical", "Shopping"],
        morning: [{ title: "Louvre Museum Highlights", description: "See the Mona Lisa, Venus de Milo, and Winged Victory with a fast-track admission ticket.", cost: 2200, location: "1st Arrondissement" }],
        afternoon: [{ title: "Stroll Champ de Mars & Eiffel Tower", description: "Walk along the Seine, buy fresh crepes, and view the iron lady from the Trocadéro gardens.", cost: 1800, location: "7th Arrondissement" }],
        evening: [{ title: "Seine River Dinner Cruise", description: "Glide past illuminated monuments while enjoying a 3-course French meal with local wine.", cost: 4500, location: "River Seine" }]
      },
      {
        interests: ["Food", "Nature"],
        morning: [{ title: "Montmartre Artist Quarter Walk", description: "Climb up to the Sacré-Cœur Basilica, watch portrait painters, and visit a historic vineyard.", cost: 500, location: "18th Arrondissement" }],
        afternoon: [{ title: "Jardin du Luxembourg Picnic", description: "Relax on the iconic green metal chairs, watch toy sailboats, and munch on fresh baguettes and cheese.", cost: 1000, location: "6th Arrondissement" }],
        evening: [{ title: "Le Marais Culinary Exploration", description: "Sample artisanal pastries, falafels on Rue des Rosiers, and craft cocktails in medieval alleys.", cost: 3000, location: "4th Arrondissement" }]
      },
      {
        interests: ["Historical", "Beaches", "Adventure"],
        morning: [{ title: "Sainte-Chapelle & Notre Dame", description: "Admire the 13th-century stained glass towers of Sainte-Chapelle and view Notre-Dame restoration works.", cost: 1200, location: "Île de la Cité" }],
        afternoon: [{ title: "Champs-Élysées & Arc de Triomphe", description: "Walk down the grand avenue and climb to the top of the Arc de Triomphe for a star-shaped street view.", cost: 1500, location: "8th Arrondissement" }],
        evening: [{ title: "Latin Quarter Jazz Club", description: "Sip wine in a historic 12th-century stone cellar while listening to classic live Parisian jazz.", cost: 2500, location: "5th Arrondissement" }]
      }
    ]
  },
  goa: {
    summary: "Unwind along sun-soaked sandy shores, exploring Portuguese heritage, vibrant spice plantations, and fresh seafood shacks.",
    weather: "Warm and tropical. Average temperature: 29°C. Keep hydrated and wear sunscreen.",
    tips: [
      "Rent a scooter for budget-friendly local exploration, but always wear a helmet.",
      "Carry cash, as beach shacks and local taxis often face poor cellular network for online payments.",
      "Respect local dress codes when entering temples and churches.",
      "Negotiate politely with street vendors and taxi operators."
    ],
    safetyTips: [
      "Avoid swimming at unguarded beaches, especially during monsoon season — rip currents are dangerous.",
      "Don't leave valuables unattended on the beach while swimming.",
      "Wear a helmet when riding scooters — police checkpoints issue fines, and road conditions are unpredictable.",
      "Drink bottled water only and avoid ice from street vendors.",
      "Use only licensed taxis or ride-hailing apps (Ola/Uber) for late-night travel."
    ],
    moneySavingTips: [
      "Stay in North Goa (Anjuna, Vagator) for budget hostels and cheap beach shacks.",
      "Eat at local 'thali' restaurants for a full meal under ₹150 instead of tourist-facing cafes.",
      "Rent a scooter (₹300–500/day) instead of taking taxis (₹500+ per ride).",
      "Visit churches, temples, and public beaches — they're free and stunning.",
      "Shop at the Saturday Night Market in Arpora for better deals than fixed-price tourist shops."
    ],
    topPlaces: [
      { name: "Basilica of Bom Jesus", description: "UNESCO World Heritage Site housing the mortal remains of St. Francis Xavier — a masterpiece of Baroque architecture." },
      { name: "Fort Aguada", description: "A well-preserved 17th-century Portuguese fort and lighthouse overlooking the Arabian Sea." },
      { name: "Dudhsagar Waterfalls", description: "A spectacular four-tiered waterfall (310m) in Mollem National Park, accessible by jeep safari." },
      { name: "Anjuna Flea Market", description: "A vibrant Wednesday market with handicrafts, clothing, jewelry, spices, and live music." },
      { name: "Calangute & Baga Beach", description: "Goa's most popular beach strip with water sports, beach shacks, and nightlife." },
      { name: "Fontainhas Latin Quarter", description: "A beautifully preserved Portuguese colonial neighborhood in Panaji with pastel-colored houses." },
      { name: "Sahakari Spice Plantation", description: "Guided walks through cardamom, vanilla, and pepper farms, ending with a traditional Goan buffet." },
      { name: "Chapora Fort", description: "The famous 'Dil Chahta Hai' fort with panoramic views of Vagator Beach and the coastline." }
    ],
    localFoods: [
      { dish: "Fish Curry Rice", description: "The quintessential Goan meal — tangy kokum-based fish curry served with steamed rice. Try kingfish or pomfret." },
      { dish: "Pork Vindaloo", description: "A fiery, tangy pork curry with Kashmiri chillies and vinegar — Goa's most famous dish worldwide." },
      { dish: "Bebinca", description: "A traditional 7-layered Goan dessert made from coconut milk, eggs, and ghee — rich and aromatic." },
      { dish: "Prawn Balchão", description: "Spicy pickled prawns in a tangy tomato-chilli sauce — perfect with poi (Goan bread rolls)." },
      { dish: "Xacuti (Shakuti)", description: "A complex coconut-based curry with roasted spices, typically made with chicken or lamb." },
      { dish: "Feni", description: "Goa's iconic spirit distilled from cashew apples or coconut sap — try it as a cocktail at a beach shack." },
      { dish: "Poi & Chouriço", description: "Soft Goan bread rolls stuffed with spiced pork sausage — the ultimate Goan breakfast combo." }
    ],
    hiddenGems: [
      { name: "Butterfly Beach", description: "A secluded cove in South Goa accessible only by boat — pristine sand, turquoise water, and no crowds." },
      { name: "Divar Island", description: "A sleepy island in the Mandovi River with Portuguese-era churches, paddy fields, and zero tourist infrastructure." },
      { name: "Cola Beach", description: "A hidden lagoon beach surrounded by palm-covered cliffs — one of Goa's best-kept secrets in Canacona." },
      { name: "Chorla Ghat", description: "A lush mountain pass at the Goa-Karnataka border with dense forests, waterfalls, and birdwatching trails." },
      { name: "Rachol Seminary", description: "One of Asia's oldest seminaries (1580), with a stunning church, library, and peaceful grounds — rarely visited." }
    ],
    packing: ["Swimwear & beach towels", "Sunscreen (SPF 50+)", "Polarized sunglasses", "Light linen clothing", "Insect repellent"],
    activities: [
      {
        interests: ["Beaches", "Food"],
        morning: [{ title: "Baga Beach Water Sports", description: "Try parasailing or jet skiing, then relax on a beach bed with fresh coconut water.", cost: 2000, location: "North Goa" }],
        afternoon: [{ title: "Portuguese Lunch at Gunpowder", description: "Savor authentic coastal food like fish curry, appams, and local pork vindaloo in a beautiful garden villa.", cost: 1200, location: "Assagao" }],
        evening: [{ title: "Sunset at Curlies Shack", description: "Enjoy fresh calamari, cold beverages, and live acoustic music on Anjuna beach as the sun sets.", cost: 1500, location: "Anjuna" }]
      },
      {
        interests: ["Historical", "Nature"],
        morning: [{ title: "Basilica of Bom Jesus & Old Goa", description: "Visit the UNESCO World Heritage site housing the sacred relics of St. Francis Xavier.", cost: 200, location: "Old Goa" }],
        afternoon: [{ title: "Sahakari Spice Plantation Tour", description: "Walk through arrays of cardamom and vanilla, feed elephants, and enjoy a traditional Goan buffet lunch.", cost: 800, location: "Ponda" }],
        evening: [{ title: "Fontainhas Latin Quarter Walk", description: "Stroll through colorful Portuguese-style houses, red-tiled roofs, and cozy bakeries.", cost: 500, location: "Panaji" }]
      },
      {
        interests: ["Adventure", "Nature"],
        morning: [{ title: "Dudhsagar Waterfalls Trek", description: "Board a 4x4 jeep through the Mollem National Park to the four-tiered white waterfall.", cost: 1500, location: "Sanguem" }],
        afternoon: [{ title: "Dolphin Sightseeing Cruise", description: "Take a boat ride into the Arabian sea to spot dolphins and see the historic Fort Aguada lighthouse.", cost: 800, location: "Candolim" }],
        evening: [{ title: "Candolim Night Market & Casino", description: "Check out handmade crafts at the market or board a floating offshore cruise casino.", cost: 2500, location: "Mandovi River" }]
      }
    ]
  }
};

// ─── Generic activity pool for procedural generation ─────────────────────────

const INTERESTS_DATA: Record<string, {
  title: string;
  description: string;
  cost: number;
  location: string;
}[]> = {
  Adventure: [
    { title: "Ziplining & Ropes Course", description: "Glide across forest canopies or canyon floors on a high-speed zipline trek.", cost: 1800, location: "Adventure Outpost" },
    { title: "ATV Quad Biking", description: "Navigate mud tracks, steep hills, and rugged forest trails on a powerful 4x4 quad bike.", cost: 2200, location: "Off-Road Park" },
    { title: "Hiking & Peak Climbing", description: "Climb to the highest panoramic viewpoint of the region, guided by a local mountaineer.", cost: 1200, location: "Summit Trailhead" },
    { title: "Rock Climbing or Bouldering", description: "Test your strength and technique on scenic natural rock faces under expert instruction.", cost: 1500, location: "Granite Crag" }
  ],
  Food: [
    { title: "Local Street Food Crawl", description: "Join a foodie guide through crowded alleys tasting 5-6 authentic local specialities.", cost: 900, location: "Historic Food Alley" },
    { title: "Hands-on Cooking Masterclass", description: "Learn to cook classic local dishes from scratch, including grinding spices and plating.", cost: 2500, location: "Culinary Studio" },
    { title: "Gourmet Tasting Dinner", description: "Indulge in a multi-course dinner highlighting regional organic ingredients and local wines.", cost: 3500, location: "Bistro District" },
    { title: "Food Market & Bakery Tour", description: "Sample fresh morning bakes, local cheeses, organic fruits, and artisan preserves.", cost: 1100, location: "Central Market" }
  ],
  Nature: [
    { title: "Botanical Gardens & Conservatory", description: "Explore themed glass domes showcasing exotic orchids, tropical ferns, and lily pads.", cost: 400, location: "Green Sanctuary" },
    { title: "Scenic Wildlife Safari", description: "Ride in an open-top vehicle to observe native birds, deer, and predators in their natural habitat.", cost: 1600, location: "National Park Reserve" },
    { title: "River Rafting or Kayaking", description: "Paddle down a gentle scenic river, surrounded by dense forests and rocky cliffs.", cost: 1400, location: "River Gorge" },
    { title: "Sunset Mountain Viewpoint", description: "Hike or take a cable car to a gorgeous viewpoint to witness the landscape illuminated in golden hues.", cost: 600, location: "Cloud Crest Point" }
  ],
  Shopping: [
    { title: "Traditional Souk & Crafts Market", description: "Bargain for intricate rugs, brass lanterns, handmade jewelry, and fragrant spices.", cost: 500, location: "Artisan Bazaar" },
    { title: "High-Street Fashion District", description: "Browse flagship boutiques, independent design concept stores, and premium outlets.", cost: 0, location: "Grand Promenade" },
    { title: "Antique & Flea Market Browsing", description: "Sift through retro collectibles, vintage fashion, second-hand books, and curiosities.", cost: 0, location: "Old Square Market" },
    { title: "Local Craft Shopping & Gift Tour", description: "Purchase locally sourced chocolates, handmade soap, hand-spun textiles, and pottery.", cost: 1000, location: "Craft Village" }
  ],
  Historical: [
    { title: "Grand Fortress & Citadel Tour", description: "Walk through defensive stone ramparts, armories, and royal chambers with an audio guide.", cost: 600, location: "Medieval Quarter" },
    { title: "Ancient Ruins Walk", description: "Explore columns, amphitheatres, and archaeological excavation sites dating back centuries.", cost: 800, location: "Heritage Park" },
    { title: "National Museum of History", description: "View priceless historical relics, interactive chronological displays, and royal artifacts.", cost: 500, location: "Museum Row" },
    { title: "Old Town Architectural Stroll", description: "Follow an expert guide to spot gargoyles, historic plaques, and learn regional folklore.", cost: 700, location: "Cathedral Square" }
  ],
  Beaches: [
    { title: "Beach Relaxation & Swimming", description: "Set up under a sun umbrella, swim in crystal-clear waters, and collect colorful shells.", cost: 300, location: "Coastal Coastline" },
    { title: "Snorkeling Cruise & Boat Ride", description: "Take a glass-bottom catamaran to coral reefs, snorkeling alongside vibrant sea turtles.", cost: 2200, location: "Coral Reef Bay" },
    { title: "Seaside Boardwalk Cycling", description: "Rent a cruiser bicycle to ride along a paved path bordering white sand dunes.", cost: 500, location: "Beachside Path" },
    { title: "Sunset Beach Bonfire & Drinks", description: "Sit on beanbags around a fire, roasting marshmallows, listening to acoustic guitar.", cost: 1200, location: "Sandy Point" }
  ]
};

// ─── Generic fallback data for unknown destinations ──────────────────────────

const DEFAULT_TOP_PLACES: PlaceRecommendation[] = [
  { name: "Central Historic District", description: "The heart of the old town — narrow lanes, grand plazas, and centuries-old architecture." },
  { name: "National Museum", description: "The region's premier museum showcasing art, history, and cultural artifacts." },
  { name: "Main Botanical Garden", description: "A lush green escape with themed gardens, glasshouses, and scenic walking trails." },
  { name: "Riverside / Waterfront Promenade", description: "A scenic walkway along the water with cafes, street performers, and sunset views." },
  { name: "Grand Fortress / Citadel", description: "A historic fortification offering panoramic views and a deep dive into local military history." },
  { name: "Local Market Square", description: "A vibrant open-air market with fresh produce, street food, handmade crafts, and souvenirs." },
  { name: "Scenic Mountain Viewpoint", description: "A hike or cable car ride to the region's highest accessible point for panoramic vistas." }
];

const DEFAULT_LOCAL_FOODS: FoodRecommendation[] = [
  { dish: "Signature Regional Curry", description: "The region's most iconic curry dish made with local spices and slow-cooked meats or vegetables." },
  { dish: "Local Street Snacks", description: "Fried dumplings, savory pastries, and grilled skewers found at bustling roadside stalls." },
  { dish: "Traditional Flatbread & Dips", description: "Freshly baked bread served with regional chutneys, pickles, and dipping sauces." },
  { dish: "Grilled Seafood Platter", description: "Locally caught fish, prawns, and shellfish grilled with herbs and citrus." },
  { dish: "Regional Dessert Specialty", description: "A famous sweet treat unique to this destination — often milk-based or fruit-based." },
  { dish: "Local Craft Beverages", description: "Regional wines, artisanal beers, or signature non-alcoholic drinks made from local ingredients." }
];

const DEFAULT_HIDDEN_GEMS: PlaceRecommendation[] = [
  { name: "Secret Garden / Courtyard", description: "A tucked-away green space behind historic buildings, popular only with locals." },
  { name: "Off-the-Beaten-Path Village", description: "A quiet hamlet just outside the city with authentic culture, handmade crafts, and home-cooked food." },
  { name: "Local Artist Enclave", description: "A neighborhood of independent galleries, studios, and street art — the creative pulse of the city." },
  { name: "Abandoned Historical Site", description: "An atmospheric ruin or decommissioned structure that few tourists ever discover." },
  { name: "Sunrise / Sunset Secret Spot", description: "A local-favorite viewpoint for golden-hour photography, away from the crowds." }
];

const DEFAULT_SAFETY_TIPS: string[] = [
  "Keep digital and physical copies of your passport, visa, and travel insurance in separate locations.",
  "Register with your country's embassy or consulate before traveling to unfamiliar regions.",
  "Avoid displaying expensive jewelry, cameras, or electronics in crowded areas.",
  "Use hotel safes for valuables and carry only the cash you need for the day.",
  "Share your daily itinerary with a trusted contact back home."
];

const DEFAULT_MONEY_SAVING_TIPS: string[] = [
  "Book accommodations with free cancellation and compare prices across Booking.com, Agoda, and Hostelworld.",
  "Eat where locals eat — ask hotel staff or taxi drivers for restaurant recommendations away from tourist zones.",
  "Use public transport or walk whenever possible instead of taxis.",
  "Visit attractions early in the morning for shorter queues and sometimes lower rates.",
  "Download offline maps (Google Maps or Maps.me) to avoid expensive roaming data charges."
];

// ─── Local plan generator ────────────────────────────────────────────────────

function generateLocalPlan(
  destination: string,
  days: number,
  budget: number,
  interests: string[],
  travelType: string
): TravelPlan {
  const normDest = destination.toLowerCase().trim();
  const baseData = POPULAR_DESTINATIONS[normDest];

  const formattedDest = destination.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const defaultSummary = `A curated trip to ${formattedDest} designed for ${travelType.toLowerCase()} travelers, focusing on ${interests.join(', ')} activities.`;
  const defaultWeather = "Pleasant and clear. Highs around 24°C during the day, cooling off nicely to 16°C at night.";
  const defaultTips = [
    "Always plan your transport ahead. Buying a day pass for trains/buses saves significant money.",
    "Make restaurant reservations at least 1-2 days in advance for popular districts.",
    "Carry a lightweight water bottle and power bank for long sightseeing days.",
    "Respect local customs: check if photography is allowed inside heritage structures."
  ];
  const defaultPacking = ["Comfortable athletic/walking shoes", "Sunscreen & sunglasses", "Light jacket or cardigan", "Universal charger & power bank", "Prescription medicines & basic first-aid"];

  const summary = baseData ? baseData.summary : defaultSummary;
  const weatherAdvisory = baseData ? baseData.weather : defaultWeather;
  const localTips = baseData ? baseData.tips : defaultTips;
  const safetyTips = baseData ? baseData.safetyTips : DEFAULT_SAFETY_TIPS;
  const moneySavingTips = baseData ? baseData.moneySavingTips : DEFAULT_MONEY_SAVING_TIPS;
  const topPlaces = baseData ? baseData.topPlaces : DEFAULT_TOP_PLACES;
  const localFoods = baseData ? baseData.localFoods : DEFAULT_LOCAL_FOODS;
  const hiddenGems = baseData ? baseData.hiddenGems : DEFAULT_HIDDEN_GEMS;
  const packingList = [...(baseData ? baseData.packing : defaultPacking)];

  // Assemble custom packing items based on travel type and interests
  if (travelType === 'Family') {
    packingList.push("Kid-friendly snacks & hydration packs", "Wet wipes & mini-first-aid kit");
  } else if (interests.includes('Adventure')) {
    packingList.push("Sturdy hiking boots", "Quick-dry activewear");
  }
  if (interests.includes('Beaches')) {
    packingList.push("Quick-dry microfiber towel", "Waterproof phone pouch");
  }

  // Build Itinerary
  const itinerary: DayPlan[] = [];
  const selectedInterests = interests.length > 0 ? interests : ['Nature', 'Historical'];

  for (let i = 1; i <= days; i++) {
    const dayInterest = selectedInterests[(i - 1) % selectedInterests.length];
    const theme = `${dayInterest} Exploration`;
    const activities: Activity[] = [];

    if (baseData) {
      const templateIdx = (i - 1) % baseData.activities.length;
      const tAct = baseData.activities[templateIdx];
      activities.push(
        { time: 'Morning', ...tAct.morning[0] },
        { time: 'Afternoon', ...tAct.afternoon[0] },
        { time: 'Evening', ...tAct.evening[0] }
      );
    } else {
      const actsPool = INTERESTS_DATA[dayInterest] || INTERESTS_DATA['Nature'];
      const mPool = actsPool.filter((_, idx) => idx % 3 === 0);
      const aPool = actsPool.filter((_, idx) => idx % 3 === 1);
      const ePool = actsPool.filter((_, idx) => idx % 3 === 2 || idx % 3 === 0);

      const morningAct = mPool[(i - 1) % mPool.length] || actsPool[0];
      const afternoonAct = aPool[(i - 1) % aPool.length] || actsPool[1];
      const eveningAct = ePool[(i - 1) % ePool.length] || actsPool[2];

      activities.push(
        { time: 'Morning', ...morningAct },
        { time: 'Afternoon', ...afternoonAct },
        { time: 'Evening', ...eveningAct }
      );
    }

    // Apply scaling based on budget
    const dailyBudgetCap = budget / days;
    let costMultiplier = 1.0;
    if (dailyBudgetCap < 2000) {
      costMultiplier = 0.4;
    } else if (dailyBudgetCap > 10000) {
      costMultiplier = 2.2;
    }

    activities.forEach(act => {
      act.cost = Math.round(act.cost * costMultiplier);
      if (act.cost > dailyBudgetCap * 0.4) {
        act.cost = Math.round(dailyBudgetCap * 0.15);
      }
    });

    itinerary.push({ day: i, theme, activities });
  }

  // Budget breakdown: Transport, Hotel, Food, Attractions, Shopping
  const transportAmt = Math.round(budget * 0.15);
  const hotelAmt = Math.round(budget * 0.35);
  const foodAmt = Math.round(budget * 0.20);
  const attractionsAmt = Math.round(budget * 0.20);
  const shoppingAmt = Math.round(budget * 0.10);
  const finalBudgetTotal = transportAmt + hotelAmt + foodAmt + attractionsAmt + shoppingAmt;

  const budgetBreakdown: BudgetAllocation[] = [
    { category: "Transport", amount: transportAmt, percentage: Math.round((transportAmt / finalBudgetTotal) * 100) },
    { category: "Hotel", amount: hotelAmt, percentage: Math.round((hotelAmt / finalBudgetTotal) * 100) },
    { category: "Food", amount: foodAmt, percentage: Math.round((foodAmt / finalBudgetTotal) * 100) },
    { category: "Attractions", amount: attractionsAmt, percentage: Math.round((attractionsAmt / finalBudgetTotal) * 100) },
    { category: "Shopping", amount: shoppingAmt, percentage: Math.round((shoppingAmt / finalBudgetTotal) * 100) },
  ];

  return {
    destination: formattedDest,
    days,
    budget,
    interests,
    travelType,
    summary,
    itinerary,
    budgetBreakdown,
    packingList,
    localTips,
    safetyTips,
    moneySavingTips,
    weatherAdvisory,
    topPlaces,
    localFoods,
    hiddenGems,
    generatedBy: 'offline' as const,
  };
}

// ─── Gemini API integration ─────────────────────────────────────────────────

async function generateGeminiPlan(
  destination: string,
  days: number,
  budget: number,
  interests: string[],
  travelType: string,
  apiKey: string
): Promise<TravelPlan> {
  const modelName = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const prompt = `You are an expert AI Travel Planner. Generate a highly detailed, personalized, and realistic travel plan.
Destination: ${destination}
Duration: ${days} Days
Total Budget: ₹${budget} (INR)
Travel Interests: ${interests.join(', ')}
Travel Type: ${travelType}

Generate a valid JSON object matching the TypeScript interface below. Do not wrap the JSON in markdown code blocks. Output ONLY raw valid JSON.

TypeScript Schema:
interface Activity {
  time: 'Morning' | 'Afternoon' | 'Evening';
  title: string;
  description: string;
  cost: number; // in INR
  location: string;
}
interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[]; // exactly 3: Morning, Afternoon, Evening
}
interface BudgetAllocation {
  category: string; // one of: "Transport", "Hotel", "Food", "Attractions", "Shopping"
  amount: number; // in INR
  percentage: number; // integer 0-100
}
interface PlaceRecommendation {
  name: string;
  description: string;
}
interface FoodRecommendation {
  dish: string;
  description: string;
}
interface TravelPlan {
  destination: string;
  days: number;
  budget: number;
  interests: string[];
  travelType: string;
  summary: string; // 2-3 sentence overview
  itinerary: DayPlan[]; // ${days} days
  budgetBreakdown: BudgetAllocation[]; // 5 categories that sum to the total budget
  packingList: string[]; // 6-10 items
  localTips: string[]; // 4-5 practical travel tips
  safetyTips: string[]; // 4-5 safety warnings and precautions
  moneySavingTips: string[]; // 4-5 budget optimization tips
  weatherAdvisory: string;
  topPlaces: PlaceRecommendation[]; // 7-10 must-visit places
  localFoods: FoodRecommendation[]; // 6-8 famous local dishes
  hiddenGems: PlaceRecommendation[]; // 4-5 less-crowded secret spots
}

Stay within ₹${budget}. Give realistic, practical suggestions. Ensure all JSON attributes are present.`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API returned error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response returned from Gemini API");
  }

  try {
    const parsed: TravelPlan = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("JSON parsing error for response:", text);
    throw new Error("Failed to parse the AI response as valid TravelPlan JSON.");
  }
}

// ─── Date Formatting Helper ──────────────────────────────────────────────────

function getFormattedDateTime(): string {
  const now = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getTravelPlan(
  destination: string,
  days: number,
  budget: number,
  interests: string[],
  travelType: string,
  apiKey?: string | null
): Promise<TravelPlan> {
  // Simulate network delay to allow the loading animation to shine
  await new Promise(resolve => setTimeout(resolve, 3000));

  const createdTime = getFormattedDateTime();

  if (apiKey && apiKey.trim().length > 0) {
    try {
      const geminiPlan = await generateGeminiPlan(destination, days, budget, interests, travelType, apiKey);
      geminiPlan.generatedBy = 'gemini';
      geminiPlan.createdAt = createdTime;
      geminiPlan.fallbackHappened = false;
      return geminiPlan;
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local simulated plan:", e);
      const fallbackPlan = generateLocalPlan(destination, days, budget, interests, travelType);
      fallbackPlan.generatedBy = 'offline';
      fallbackPlan.createdAt = createdTime;
      fallbackPlan.fallbackHappened = true;
      return fallbackPlan;
    }
  }

  const offlinePlan = generateLocalPlan(destination, days, budget, interests, travelType);
  offlinePlan.generatedBy = 'offline';
  offlinePlan.createdAt = createdTime;
  offlinePlan.fallbackHappened = false;
  return offlinePlan;
}
