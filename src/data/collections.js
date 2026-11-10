import { getAssetUrl } from '../utils/assetPath';
// Juthika by Momita Luxury Assamese Silk Boutique — Curated Collections & Editorial Stories

export const SIGNATURE_COLLECTIONS = [
  {
    id: "col-muga",
    title: "Muga Silk — The Golden Heritage",
    subtitle: "The Golden Heritage",
    category: "Muga Silk",
    slug: "muga-silk",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800",
    description: "Naturally golden, wild silk found exclusively in Assam. Woven with pure zari that gains richer luster with every passing generation.",
    tag: "",
    accent: "Natural Gold"
  },
  {
    id: "col-eri",
    title: "Eri Silk — The Art of Natural Comfort",
    subtitle: "The Art of Natural Comfort",
    category: "Eri Silk",
    slug: "eri-silk",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/erisilksari_18749ea6-7a3f-4c6c-9a09-1618d14a8328.jpg?v=1770292936&width=1800",
    videoUrl: getAssetUrl('/videos/gmm.mp4'),
    isVideo: true,
    videoBadge: "Atelier Film",
    description: "Cruelty-free Ahimsa peace silk with an exquisite woolen-cotton handfeel. Naturally isothermal, soothing, and timelessly understated.",
    tag: "Couture Video",
    accent: "Earthy Almond"
  },
  {
    id: "col-paat",
    title: "Paat Silk — The Beauty of Fine Weaves",
    subtitle: "The Beauty of Fine Weaves",
    category: "Paat Silk",
    slug: "paat-silk",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/teal.jpg?v=1766847656&width=1800",
    description: "Lustrous white mulberry silk renowned for its delicate drape and brilliant absorption of ceremonial jewel tones and silver Guna.",
    tag: "",
    accent: "Pearl White"
  },
  {
    id: "col-bridal",
    title: "Bridal Couture — Made for Your Most Precious Moments",
    subtitle: "Made for Your Most Precious Moments",
    category: "Bridal Couture",
    slug: "bridal-couture",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/mekhelasador_4de2660f-1617-463b-ac9c-c525dd93f96e.jpg?v=1759510815&width=1800",
    description: "Bespoke bridal Mekhela Chador ensembles and heirloom sarees crafted over hundreds of loom hours by Sualkuchi's master artisans.",
    tag: "",
    accent: "Vermilion & Gold"
  }
];

export const ALL_COLLECTIONS = [
  ...SIGNATURE_COLLECTIONS,
  {
    id: "col-sarees",
    title: "Sarees — Six Yards of Grace",
    subtitle: "Six Yards of Grace",
    category: "Sarees",
    slug: "sarees",
    heroImage: "https://thesilkchamber.com/cdn/shop/products/gunamuga.jpg?v=1651663863&width=1800",
    description: "Classic sarees reimagined with Assamese temple motifs, rich Guna pallus, and featherlight draping for grand celebrations.",
    tag: "",
    accent: "Royal Zari"
  },
  {
    id: "col-occasion",
    title: "Occasion Wear — Contemporary Grandeur",
    subtitle: "Contemporary Grandeur",
    category: "Occasion Wear",
    slug: "occasion-wear",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/erikp_3649e180-cde4-4052-bf27-234ba580ef55.jpg?v=1713617452&width=1800",
    description: "Structured capes, flared silhouettes, and architectural evening wear tailored from pure Assamese handloom silks.",
    tag: "",
    accent: "Champagne Glow"
  },
  {
    id: "col-rtw",
    title: "Ready-to-Wear — Modern Silk Essentials",
    subtitle: "Modern Silk Essentials",
    category: "Ready-to-Wear",
    slug: "ready-to-wear",
    heroImage: "https://thesilkchamber.com/cdn/shop/files/kperisari_4e0389a4-2f66-4583-bcce-3088a728a035.jpg?v=1739620090&width=1800",
    description: "Understated luxury for daily life: breathable Eri silk overlays, minimalist tunics, and versatile artisanal wraps.",
    tag: "",
    accent: "Natural Dye"
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: "lb-01",
    title: "Dawn on the Brahmaputra",
    subtitle: "Pure Muga Mekhela Chador with Antique Kingkhap Zari",
    category: "Muga Silk",
    image: "https://thesilkchamber.com/cdn/shop/files/mugasari_4c4c1055-f4e5-4275-929e-47cca7fd8daf.jpg?v=1758283256&width=1800",
    aspect: "tall",
    location: "Sualkuchi Ghats, Assam",
    caption: "The radiant amber sheen of wild Muga catches the early morning mist of the mighty Brahmaputra river."
  },
  {
    id: "lb-02",
    title: "Imperial Vows",
    subtitle: "Mulberry Paat Bridal Ensemble in Pearl & Scarlet",
    category: "Bridal Couture",
    image: "https://thesilkchamber.com/cdn/shop/files/mekhelasador_4de2660f-1617-463b-ac9c-c525dd93f96e.jpg?v=1759510815&width=1800",
    aspect: "wide",
    location: "Ahom Palace Courtyard, Sibsagar",
    caption: "Ceremonial opulence rooted in 600 years of royal Ahom kingdom matrimonial heritage."
  },
  {
    id: "lb-03",
    title: "The Whispering Cocoon",
    subtitle: "Ahimsa Eri Silk Draped Cocoon Wrap",
    category: "Eri Silk",
    image: "https://thesilkchamber.com/cdn/shop/files/erisilksari_18749ea6-7a3f-4c6c-9a09-1618d14a8328.jpg?v=1770292936&width=1800",
    aspect: "tall",
    location: "Majuli River Island",
    caption: "Natural undyed fibers gathered without harm to the silk moth, offering gentle thermal sanctuary."
  },
  {
    id: "lb-04",
    title: "The Golden Pallu",
    subtitle: "Six-Yard Sualkuchi Muga Saree with Moora Motifs",
    category: "Sarees",
    image: "https://thesilkchamber.com/cdn/shop/products/gunamuga.jpg?v=1651663863&width=1800",
    aspect: "square",
    location: "Old Atelier, Sualkuchi",
    caption: "Intricate throw-shuttle gold Guna zari work that took four master weavers thirty-two days to finish."
  },
  {
    id: "lb-05",
    title: "Modern Solitude",
    subtitle: "Botanical Dyed Eri Silk Trench & Trousers",
    category: "Ready-to-Wear",
    image: "https://thesilkchamber.com/cdn/shop/files/kperisari_4e0389a4-2f66-4583-bcce-3088a728a035.jpg?v=1739620090&width=1800",
    aspect: "tall",
    location: "Guwahati Design Pavilion",
    caption: "Contemporary cosmopolitan lines tailored from indigenous heritage textiles."
  },
  {
    id: "lb-06",
    title: "Midnight Sovereign",
    subtitle: "Indigo Paat Silk with Silver Rupahi Motifs",
    category: "Occasion Wear",
    image: "https://thesilkchamber.com/cdn/shop/files/paatrose.jpg?v=1690632178&width=1800",
    aspect: "wide",
    location: "Private Residence, New Delhi",
    caption: "A timeless dialogue between deep mineral indigo and shimmering handwoven silver zari."
  }
];

