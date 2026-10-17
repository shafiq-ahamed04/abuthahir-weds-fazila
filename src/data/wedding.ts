export interface WeddingEvent {
  id: string;
  title: string;
  day: string;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  city: string;
  description?: string;
  image: string;
  googleMapsUrl?: string;
}

export interface QuranicVerse {
  arabic: string;
  english: string;
  reference: string;
  surahName: string;
  theme?: string;
}

export interface WeddingData {
  couple: {
    groom: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
    bride: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
    hashtag: string;
    tagline: string;
  };
  events: {
    nikah: WeddingEvent;
    walima: WeddingEvent;
  };
  settings: {
    language: string;
    hasBackgroundMusic: boolean;
    isPublic: boolean;
  };
  verses: {
    bismillah: {
      arabic: string;
      english: string;
    };
    quranicQuote: QuranicVerse;
    reflections: QuranicVerse[];
    dua: {
      title: string;
      arabic: string;
      english: string;
      transliteration: string;
      image: string;
    };
  };
  story: {
    badge: string;
    tagline: string;
    quote: string;
    quoteRef: string;
    intro: string;
    image: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    groom: {
      name: "Abuthahir",
      role: "The Groom",
      bio: "A man of faith, kindness and purpose, looking forward to this new chapter with the blessings of Allah.",
      image: "",
    },
    bride: {
      name: "Fazila",
      role: "The Bride",
      bio: "A woman of grace, faith and beautiful character, stepping into this journey with trust in His plan.",
      image: "",
    },
    hashtag: "#AbuthahirAndFazila",
    tagline: "A JOURNEY OF FAITH, LOVE AND A BEAUTIFUL BEGINNING",
  },
  events: {
    nikah: {
      id: "nikah",
      title: "NIKAH",
      day: "Sunday",
      date: "2027-03-21",
      displayDate: "Sunday, 21 March 2027",
      time: "11:00 AM",
      venue: "A.P Mahal",
      city: "Kumbakonam",
      description: "The sacred Islamic union ceremony",
      image: "/nikah-venue.jpg",
      googleMapsUrl: "https://maps.google.com/?q=A.P+Mahal+Kumbakonam",
    },
    walima: {
      id: "walima",
      title: "WALIMA",
      day: "Tuesday",
      date: "2027-03-23",
      displayDate: "Tuesday, 23 March 2027",
      time: "12:00 PM",
      venue: "LKS Mahal",
      city: "Trichy",
      description: "The joyous wedding banquet and celebration",
      image: "/walima-venue.jpg",
      googleMapsUrl: "https://maps.google.com/?q=LKS+Mahal+Trichy",
    },
  },
  settings: {
    language: "English",
    hasBackgroundMusic: false,
    isPublic: true,
  },
  story: {
    badge: "OUR STORY",
    tagline: "Two Hearts One Deen",
    quote: "“And We created you in pairs.”",
    quoteRef: "SURAH AN-NABA (78:8)",
    intro:
      "A journey brought together by His Qadr, strengthened by faith, and filled with hope for a blessed future, Insha'Allah.",
    image: "",
  },
  verses: {
    bismillah: {
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      english: "In the name of Allah, the Most Gracious, the Most Merciful",
    },
    // Primary verse Ar-Rum 30:21
    quranicQuote: {
      arabic:
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
      english:
        "And among His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
      reference: "30:21",
      surahName: "SURAH AR-RUM",
    },
    reflections: [
      {
        arabic:
          "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
        english:
          "And among His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy.",
        reference: "30:21",
        surahName: "SURAH AR-RUM",
      },
      {
        arabic:
          "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        english:
          "Our Lord! Grant us from our spouses and offspring a comfort to our eyes and make us a leader for the righteous.",
        reference: "25:74",
        surahName: "SURAH AL-FURQAN",
      },
      {
        arabic:
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        english:
          "Our Lord! Give us in this world that which is good and in the Hereafter that which is good, and save us from the punishment of the Fire.",
        reference: "2:201",
        surahName: "SURAH AL-BAQARAH",
      },
    ],
    dua: {
      title: "A DUA FOR THE COUPLE",
      arabic: "بَارَكَ اللَّهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ",
      english:
        "“May Allah bless both of them, shower His blessings upon them, and unite them in goodness.”",
      transliteration: "Bārakallāhu lahumā wa bāraka 'alayhimā wa jama'a baynahumā fī khayr",
      image: "/dua-arch.jpg",
    },
  },
};
