import { 
  QuizQuestion, 
  GlossaryTerm, 
  Badge 
} from '../types';

export const QUALITATIVE_METHODS = [
  {
    id: 'wawancara',
    name: 'WAWANCARA',
    tagline: 'Tanya Jawab Langsung',
    badgeColor: 'bg-amber-500 text-white',
    headerBg: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-400',
    lightBg: 'bg-amber-50/70',
    iconName: 'MessageSquare',
    modes: ['Tatap Muka', 'Telepon / Daring'],
    summary: 'Metode pengumpulan data melalui percakapan langsung dan mendalam antara peneliti (pewawancara) dan narasumber (informan) untuk menggali makna, pengalaman, dan pandangan subjektif.',
    keyPoints: [
      'Memungkinkan probing (pertanyaan pendalaman) secara fleksibel',
      'Mendeteksi nada suara, jeda ragu, dan ekspresi non-verbal (tatap muka)',
      'Cocok untuk isu personal, sensitif, atau riwayat hidup (life history)',
    ],
    simulationQuestions: [
      {
        id: 1,
        question: 'Bagaimana perasaan Anda ketika fasilitas taman kota ini mulai direvitalisasi?',
        answerTatapMuka: 'Informan tersenyum lebar dan antusias: "Sangat senang! Dulu kumuh dan rawan, sekarang anak-anak bisa bebas bermain sore hari."',
        answerTelepon: 'Informan berkata: "Ya senang sekali, sekarang lebih aman untuk anak-anak bermain."',
        insight: 'Wawancara tatap muka menangkap bahasa tubuh antusiasme yang memperkaya konteks data.'
      },
      {
        id: 2,
        question: 'Apakah ada kendala interaksi antarwarga setelah adanya perubahan ini?',
        answerTatapMuka: 'Informan sempat menghela nafas dan melihat ke sekeliling sebelum berbisik: "Sebenarnya pedagang lama merasa agak tersingkir oleh aturan baru."',
        answerTelepon: 'Informan terdiam 3 detik lalu menjawab singkat: "Sedikit ada gesekan dengan pedagang."',
        insight: 'Jeda dan kehati-hatian mengindikasikan isu relasi kuasa lokal yang membutuhkan verifikasi lebih lanjut.'
      },
      {
        id: 3,
        question: 'Menurut Anda, apa yang paling dibutuhkan warga dari pemerintah saat ini?',
        answerTatapMuka: '"Ruang dialog rutin. Jangan hanya membangun fisik, tapi bangun juga paguyubannya."',
        answerTelepon: '"Perlu ruang musyawarah yang transparan setiap bulan."',
        insight: 'Kedua mode berhasil menangkap gagasan inti tentang perlunya partisipasi deliberatif warga.'
      }
    ],
    flowStep: 'Kumpul Informasi'
  },
  {
    id: 'observasi',
    name: 'OBSERVASI',
    tagline: 'Amati Perilaku Nyata',
    badgeColor: 'bg-emerald-600 text-white',
    headerBg: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-400',
    lightBg: 'bg-emerald-50/70',
    iconName: 'Eye',
    modes: ['Terstruktur', 'Partisipan', 'Lingkungan Alamiah'],
    summary: 'Teknik pengamatan sistematis terhadap aktivitas, interaksi sosial, dan pola perilaku manusia di lingkungan alaminya tanpa manipulasi buatan.',
    keyPoints: [
      'Observasi Partisipan: Peneliti ikut terlibat dalam aktivitas kelompok sasaran',
      'Observasi Terstruktur: Menggunakan lembar checklist perilaku yang telah dibakukan',
      'Mengurangi kesenjangan antara apa yang orang katakan (wawancara) dan apa yang sebenarnya mereka lakukan'
    ],
    simulationLocations: [
      {
        id: 'taman',
        name: 'Taman Bermain Komunitas',
        items: [
          { time: '16:15', note: '3 kelompok ibu berkumpul di bangku barat saling berbagi makanan kecil.', category: 'Interaksi Sosial' },
          { time: '16:30', note: 'Anak-anak bergiliran menggunakan ayunan tanpa pengawasan orang dewasa langsung.', category: 'Kemandirian & Norma' },
          { time: '17:00', note: 'Pedagang keliling di luar pagar berinteraksi dengan ramah kepada warga.', category: 'Ekonomi Informal' }
        ]
      },
      {
        id: 'ruang_belajar',
        name: 'Balai Warga / Ruang Belajar',
        items: [
          { time: '19:00', note: 'Remaja mendominasi meja dengan akses Wi-Fi gratis untuk belajar kelompok.', category: 'Literasi Digital' },
          { time: '19:40', note: 'Tokoh masyarakat masuk, seluruh remaja serentak memberi salam tanda hormat.', category: 'Hierarki Sosial' },
          { time: '20:15', note: 'Terjadi diskusi spontan mengenai persiapan festival 17 Agustus.', category: 'Kohesi Sosial' }
        ]
      }
    ],
    flowStep: 'Analisis Perilaku'
  },
  {
    id: 'studi_kasus',
    name: 'STUDI KASUS',
    tagline: 'Analisis Kasus Mendalam',
    badgeColor: 'bg-cyan-600 text-white',
    headerBg: 'from-cyan-600 to-blue-700',
    borderColor: 'border-cyan-400',
    lightBg: 'bg-cyan-50/70',
    iconName: 'FolderArchive',
    modes: ['Multi-Sumber Data', 'Kumpulan Data', 'Gejala Sosial'],
    summary: 'Penyelidikan mendalam terhadap suatu kasus spesifik (individu, komunitas, kebijakan, atau fenomena sosial) dalam konteks kehidupan nyata dengan menggunakan beragam sumber bukti (triangulasi data).',
    keyPoints: [
      'Menggabungkan arsip dokumen, wawancara mendalam, dan observasi fisik',
      'Fokus pada pertanyaan "Mengapa" (Why) dan "Bagaimana" (How) fenomena berlangsung',
      'Membongkar kompleksitas situasi mikro yang tidak bisa ditangkap sekadar angka'
    ],
    evidenceDocs: [
      { id: 'doc1', title: 'Notulensi Rapat Paguyuban 2024', type: 'Arsip Dokumen', excerpt: 'Kesepakatan pembagian giliran ronda malam dan iuran kebersihan mandiri.' },
      { id: 'doc2', title: 'Transkrip Wawancara Tokoh Pemuda', type: 'Wawancara Narasumber', excerpt: 'Pemuda menghendaki ruang kreasi seni bukan sekadar lapangan parkir komersial.' },
      { id: 'doc3', title: 'Data Statistik Kriminalitas Lokal', type: 'Data Kuantitatif', excerpt: 'Penurunan angka pencurian sebesar 45% pasca pemasangan penerangan swadaya.' }
    ],
    flowStep: 'Lapor Kasus'
  }
];

export const QUANTITATIVE_METHODS = [
  {
    id: 'survei',
    name: 'SURVEI',
    tagline: 'Pengumpulan Data & Kuesioner',
    badgeColor: 'bg-rose-600 text-white',
    headerBg: 'from-rose-600 to-red-700',
    borderColor: 'border-rose-400',
    lightBg: 'bg-rose-50/70',
    iconName: 'FileCheck',
    modes: ['Kuesioner Terstandar', 'Polling Opini', 'Survei Digital / Cetak'],
    summary: 'Metode pengumpulan data dari sampel yang mewakili populasi menggunakan instrumen kuesioner terstruktur dengan skala ukur seragam.',
    keyPoints: [
      'Mampu menjangkau populasi responden dalam jumlah besar secara efisien',
      'Menghasilkan data numerik atau persentase yang dapat digeneralisasi',
      'Instrumen harus diuji validitas dan reliabilitasnya sebelum disebar'
    ],
    flowStep: 'Memahami Masyarakat'
  },
  {
    id: 'eksperimen',
    name: 'EKSPERIMEN',
    tagline: 'Pengujian & Percobaan Sosial',
    badgeColor: 'bg-emerald-600 text-white',
    headerBg: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-400',
    lightBg: 'bg-emerald-50/70',
    iconName: 'FlaskConical',
    modes: ['Kelompok Kontrol (A)', 'Kelompok Perlakuan (B)', 'Uji Kausalitas'],
    summary: 'Rancangan riset ilmiah untuk menguji hubungan sebab-akibat dengan cara memanipulasi Variabel Bebas dan mengamati dampaknya terhadap Variabel Terikat.',
    keyPoints: [
      'Kelompok A (Kontrol): Tidak diberikan perlakuan (baseline alami)',
      'Kelompok B (Eksperimen): Diberikan intervensi khusus (treatment)',
      'Pengacakan (Random Assignment) mencegah variabel perancu (confounding)'
    ],
    flowStep: 'Menguji Teori'
  },
  {
    id: 'statistik',
    name: 'STATISTIK',
    tagline: 'Analisis & Interpretasi Data',
    badgeColor: 'bg-sky-600 text-white',
    headerBg: 'from-sky-600 to-indigo-700',
    borderColor: 'border-sky-400',
    lightBg: 'bg-sky-50/70',
    iconName: 'BarChart3',
    modes: ['Korelasi Antarvariabel', 'Regresi & Prediksi', 'Visualisasi Grafik'],
    summary: 'Perangkat matematis untuk merangkum, menguji signifikansi hubungan data, dan menarik inferensi rasional dari data empiris.',
    keyPoints: [
      'Korelasi (r) mengukur kekuatan hubungan, BUKAN bukti sebab-akibat (kausalitas)',
      'Regresi membantu memodelkan dan memprediksi tren perubahan sosial',
      'Grafik batang, sebaran, dan persentase memudahkan komunikasi data ilmiah'
    ],
    flowStep: 'Mengolah Hasil'
  }
];

export const PITFALLS_DATA = [
  {
    id: 'bias',
    name: 'BIAS',
    tagline: 'Pemilihan Data yang Tidak Adil',
    badgeColor: 'bg-orange-600 text-white',
    headerBg: 'from-orange-600 to-amber-700',
    borderColor: 'border-orange-400',
    lightBg: 'bg-orange-50/80',
    iconName: 'FilterX',
    visualMetaphor: 'Corong Penyaring yang Rusak',
    concept: 'Data yang Benar vs Data Hanya Tertentu (Cherry-Picking)',
    detail: 'Terjadi ketika peneliti secara sadar atau tidak sadar hanya mengumpulkan, menyeleksi, atau menampilkan data yang mendukung hipotesisnya sendiri, sambil mengabaikan fakta yang bertentangan.',
    subtypes: [
      { name: 'Bias Konfirmasi', desc: 'Hanya mencari bukti pendukung keyakinan awal.' },
      { name: 'Bias Seleksi', desc: 'Pemilihan responden yang tidak adil atau tidak acak.' }
    ],
    concreteExample: 'Contoh: Melaporkan hanya 15 testimoni warga yang puas dengan program bantuan pangan, dan membuang 85 keluhan warga yang tidak menerima bantuan.',
    chainImpact: 'Proses Terganggu',
    solution: 'Gunakan protokol pengumpulan data terstandar, double-blind review, dan laporkan seluruh temuan baik yang sejalan maupun bertolak belakang.'
  },
  {
    id: 'subjektivitas',
    name: 'SUBJEKTIVITAS',
    tagline: 'Perasaan Mempengaruhi Analisis',
    badgeColor: 'bg-emerald-600 text-white',
    headerBg: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-400',
    lightBg: 'bg-emerald-50/80',
    iconName: 'Glasses',
    visualMetaphor: 'Kacamata Emosional Terapung',
    concept: 'Analisis Netral vs Perasaan, Keinginan & Kepentingan',
    detail: 'Terjadi ketika peneliti membiarkan praduga moral, sentimen emosional, afiliasi politik, atau keuntungan finansial pribadi mewarnai penafsiran fakta objektif.',
    subtypes: [
      { name: 'Konflik Kepentingan', desc: 'Ada insentif materi atau karier jika riset menghasilkan kesimpulan tertentu.' },
      { name: 'Refleksivitas Lemah', desc: 'Gagal menyadari posisi sosial dan asumsi nilai diri sendiri.' }
    ],
    concreteExample: 'Contoh: Menafsirkan data kepuasan layanan publik berdasarkan kedekatan politik dengan walikota petahana.',
    chainImpact: 'Analisis Terpengaruh',
    solution: 'Praktikkan refleksivitas (reflexivity), gunakan peer-debriefing (diskusi kritis bersama sejawat), dan deklarasikan potensi konflik kepentingan secara terbuka.'
  },
  {
    id: 'generalisasi',
    name: 'GENERALISASI (Salah)',
    tagline: 'Sampel Kecil Diklaim Mewakili Semua',
    badgeColor: 'bg-blue-600 text-white',
    headerBg: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-400',
    lightBg: 'bg-blue-50/80',
    iconName: 'Globe',
    visualMetaphor: 'Peta Dunia Terfragmentasi',
    concept: 'Menganggap Sampel Kecil Mewakili Seluruh Orang',
    detail: 'Menarik kesimpulan universal tentang seluruh populasi masyarakat yang luas berdasarkan sampel yang terlalu sedikit, tidak representatif, atau berasal dari satu klaster sempit.',
    subtypes: [
      { name: 'Sampel Terlalu Kecil', desc: 'Jumlah observasi tidak memenuhi batas kecukupan statistik.' },
      { name: 'Bias Kelompok Tertentu', desc: 'Hanya menyurvei pengguna media sosial lalu mengklaim mewakili seluruh rakyat Indonesia.' }
    ],
    concreteExample: 'Contoh: Melakukan survei pada 10 orang mahasiswa di kafe elit dan menyimpulkan gaya hidup seluruh 1 juta pemuda di kota tersebut!',
    chainImpact: 'Kesimpulan Tidak Valid',
    solution: 'Hitung ukuran sampel dengan rumus ilmiah (misal: rumus Slovin atau margin of error standar), terapkan teknik stratified random sampling, dan batasi lingkup klaim temuan.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'kualitatif',
    scenario: 'Seorang peneliti ingin memahami bagaimana pedagang pasar tradisional menghadapi trauma kebakaran pasar dan bangkit kembali membangun lapak mereka.',
    question: 'Metode mana yang paling tepat dan kaya untuk tujuan riset sosial ini?',
    options: [
      { id: 'a', text: 'Kuesioner tertutup pilihan ganda dengan 500 responden', isCorrect: false, explanation: 'Kuesioner tertutup hanya menghasilkan data angka dangkal dan tidak mampu menangkap nuansa emosi, trauma, dan makna pemulihan.' },
      { id: 'b', text: 'Wawancara mendalam (In-depth Interview) dan Observasi Partisipan', isCorrect: true, explanation: 'Tepat! Pendekatan kualitatif (wawancara mendalam) memungkinkan peneliti menggali narasi personal, riwayat hidup, dan makna subjektif pedagang secara empati.' },
      { id: 'c', text: 'Eksperimen laboratorium dengan kelompok kontrol', isCorrect: false, explanation: 'Trauma manusia di dunia nyata tidak etis dan mustahil direplikasi dalam eksperimen laboratorium terkontrol.' },
      { id: 'd', text: 'Polling singkat melalui SMS', isCorrect: false, explanation: 'Terlalu dangkal untuk menggali dinamika psikososial pemulihan pasca-bencana.' }
    ]
  },
  {
    id: 2,
    topic: 'bias',
    scenario: 'Tim peneliti hendak menguji efektivitas kurikulum digital baru. Mereka mengabaikan 40 sekolah pedesaan yang gagal menjalankan program karena kendala sinyal, dan hanya mempublikasikan laporan sukses dari 5 sekolah perkotaan favorit berfasilitas lengkap.',
    question: 'Kecacatan metodologis apa yang paling mencolok pada kasus di atas?',
    options: [
      { id: 'a', text: 'Bias Seleksi & Bias Konfirmasi (Cherry-Picking)', isCorrect: true, explanation: 'Tepat sekali! Memilih secara sepihak hanya data yang sukses dan menyembunyikan data kegagalan adalah bentuk cherry-picking yang merusak integritas riset.' },
      { id: 'b', text: 'Regresi linier sederhana', isCorrect: false, explanation: 'Regresi linier adalah teknik statistik analitis, bukan pelanggaran etika metodologis.' },
      { id: 'c', text: 'Observasi terstruktur alami', isCorrect: false, explanation: 'Kasus ini bukan tentang teknik pengamatan melainkan manipulasi sampel data.' },
      { id: 'd', text: 'Generalisasi yang tepat', isCorrect: false, explanation: 'Ini justru tindakan manipulatif yang membuat kesimpulan sama sekali tidak valid.' }
    ]
  },
  {
    id: 3,
    topic: 'generalisasi',
    scenario: 'Sebuah lembaga polling menggelar survei cepat di akun Instagram mereka yang diikuti oleh 10.000 pengikut muda perkotaan. Mereka merilis headline berita: "90% Rakyat Indonesia Menolak Bekerja dari Kantor (WFO)".',
    question: 'Mengapa klaim generalisasi tersebut salah besar menurut ilmu sosial?',
    options: [
      { id: 'a', text: 'Karena sampelnya terlalu besar sehingga sulit dianalisis', isCorrect: false, explanation: 'Bukan ukuran yang menjadi masalah, melainkan representasi kelompoknya.' },
      { id: 'b', text: 'Karena Instagram sudah terlalu banyak digunakan di desa', isCorrect: false, explanation: 'Faktanya, pengikut akun Instagram tersebut tidak mewakili jutaan petani, buruh pabrik, atau pekerja luar jaringan di seluruh nusantara.' },
      { id: 'c', text: 'Sampel tidak representatif (hanya segmen pemuda digital perkotaan) diklaim mewakili seluruh rakyat Indonesia', isCorrect: true, explanation: 'Tepat! Terjadi kesalahan generalisasi fatal: mengambil sampel dari kelompok homogen digital lalu mengklaimnya sebagai suara seluruh penduduk.' },
      { id: 'd', text: 'Karena harusnya menggunakan wawancara telepon saja', isCorrect: false, explanation: 'Masalah intinya adalah bias demografi responden, bukan sekadar instrumen medianya.' }
    ]
  },
  {
    id: 4,
    topic: 'kuantitatif',
    scenario: 'Sebuah yayasan pendidikan ingin membuktikan apakah "Sarapan Bergizi Gratis" meningkatkan konsentrasi belajar siswa SD.',
    question: 'Bagaimana desain Eksperimen Sosial yang paling sahih untuk menguji hubungan sebab-akibat tersebut?',
    options: [
      { id: 'a', text: 'Memberi sarapan kepada seluruh siswa lalu mewawancarai kepala sekolah', isCorrect: false, explanation: 'Tanpa kelompok pembanding (kontrol), peneliti tidak tahu apakah peningkatan konsentrasi disebabkan oleh sarapan atau faktor lain seperti ujian.' },
      { id: 'b', text: 'Membagi siswa acak: Kelompok A (Mendapat Sarapan) vs Kelompok B (Kontrol/Tidak Mendapat Sarapan Tambahan) lalu membandingkan skor konsentrasi', isCorrect: true, explanation: 'Sempurna! Ini adalah desain eksperimen klasik ilmiah: Kelompok Perlakuan vs Kelompok Kontrol dengan random assignment untuk menguji variabel bebas terhadap variabel terikat.' },
      { id: 'c', text: 'Menyebar polling media sosial kepada wali murid', isCorrect: false, explanation: 'Polling opini tidak dapat membuktikan efek fisiologis dan kognitif sebab-akibat secara empiris.' },
      { id: 'd', text: 'Melakukan observasi tanpa mencatat data apa pun', isCorrect: false, explanation: 'Penelitian ilmiah membutuhkan pencatatan dan pengukuran yang teruji.' }
    ]
  },
  {
    id: 5,
    topic: 'subjektivitas',
    scenario: 'Seorang peneliti yang juga merupakan konsultan berbayar sebuah perusahaan tambang menulis riset bahwa keberadaan tambang 100% membawa kedamaian dan tanpa keluhan warga, meskipun warga desa sering berdemonstrasi.',
    question: 'Prinsip riset sosial apa yang dilanggar secara fatal oleh peneliti tersebut?',
    options: [
      { id: 'a', text: 'Objektivitas & Bebas dari Konflik Kepentingan', isCorrect: true, explanation: 'Tepat! Keterikatan finansial dan pemihakan emosional/materiil telah melanggar prinsip objektivitas dan integritas etis ilmiah.' },
      { id: 'b', text: 'Teknik sampling acak sederhana', isCorrect: false, explanation: 'Pelanggaran utamanya adalah integritas dan etika netralitas analisis.' },
      { id: 'c', text: 'Kecepatan publikasi jurnal', isCorrect: false, explanation: 'Kecepatan bukan standar metodologis ilmu sosial.' },
      { id: 'd', text: 'Variabel bebas yang berlebihan', isCorrect: false, explanation: 'Bukan masalah jumlah variabel, melainkan benturan kepentingan (subjektivitas berbayar).' }
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Variabel Bebas (Independent Variable)',
    category: 'Kuantitatif',
    definition: 'Faktor atau perlakuan yang diubah/dimanipulasi oleh peneliti untuk melihat dampaknya terhadap variabel lain.',
    example: 'Pemberian insentif pelatihan kerja.'
  },
  {
    term: 'Variabel Terikat (Dependent Variable)',
    category: 'Kuantitatif',
    definition: 'Variabel hasil yang diukur atau diamati untuk melihat apakah dipengaruhi oleh variabel bebas.',
    example: 'Tingkat produktivitas kerja karyawan.'
  },
  {
    term: 'Triangulasi Data',
    category: 'Kualitatif',
    definition: 'Teknik pemeriksaan keabsahan data dengan memanfaatkan berbagai sumber (wawancara, arsip dokumen, observasi) untuk memverifikasi temuan yang sama.',
    example: 'Mencocokkan pernyataan lurah dengan dokumen anggaran desa dan pengamatan langsung pembangunan balai.'
  },
  {
    term: 'Bias Konfirmasi (Confirmation Bias)',
    category: 'Etika & Validitas',
    definition: 'Kecenderungan psikologis peneliti untuk hanya menyukai, mencari, dan mengingat informasi yang memperkuat keyakinan awalnya.',
    example: 'Hanya mencatat warga yang memuji program dan mengabaikan warga yang protes.'
  },
  {
    term: 'Kelompok Kontrol (Control Group)',
    category: 'Kuantitatif',
    definition: 'Kelompok partisipan dalam eksperimen yang tidak menerima perlakuan khusus, berfungsi sebagai tolok ukur perbandingan.',
    example: 'Siswa kelas kontrol yang tetap menggunakan metode belajar konvensional.'
  },
  {
    term: 'Refleksivitas (Reflexivity)',
    category: 'Kualitatif',
    definition: 'Kesadaran kritis peneliti tentang bagaimana latar belakang, bias pribadi, gender, dan posisinya dapat mempengaruhi cara ia mengumpulkan dan menafsirkan data.',
    example: 'Peneliti menyadari posisinya sebagai pendatang perkotaan saat meneliti norma adat di suku pedalaman.'
  },
  {
    term: 'Korelasi vs Kausalitas',
    category: 'Kuantitatif',
    definition: 'Prinsip statistik bahwa dua variabel yang bergerak bersamaan (berkorelasi) belum tentu memiliki hubungan sebab-akibat langsung.',
    example: 'Penjualan es krim naik bersamaan dengan kasus tenggelam di pantai (keduanya disebabkan oleh musim kemarau, bukan es krim menyebabkan tenggelam).'
  },
  {
    term: 'Sampel Representatif',
    category: 'Kuantitatif',
    definition: 'Sebagian kecil populasi yang memiliki proporsi karakteristik (usia, jenis kelamin, ekonomi, wilayah) serupa dengan populasi aslinya.',
    example: 'Survei nasional yang mengambil proporsi penduduk pulau Jawa dan luar Jawa sesuai data sensus BPS.'
  }
];

export const COMPARISON_SUMMARY_QUOTE = {
  quote: "Penelitian kuantitatif menjelaskan seberapa besar, sedangkan penelitian kualitatif menjelaskan alasannya.",
  quantitativeKeyword: "Seberapa besar (Prevalensi & Besaran)",
  qualitativeKeyword: "Alasannya (Makna & Konteks Mendalam)"
};

export const COMPARISON_POINTS_QUANTITATIVE = [
  {
    num: 1,
    title: 'Data berbentuk angka',
    detail: 'Pengukuran terstruktur, skor numerik, indeks, persentase, dan variabel berskala kuantitatif.',
    icon: 'TrendingUp'
  },
  {
    num: 2,
    title: 'Sampel besar',
    detail: 'Ratusan hingga ribuan responden terpilih secara acak demi keterwakilan populasi (representasi).',
    icon: 'Users'
  },
  {
    num: 3,
    title: 'Survei & Eksperimen',
    detail: 'Kuesioner skala Likert, polling masal, dan intervensi laboratorium uji coba terkontrol (A/B testing).',
    icon: 'FlaskConical'
  },
  {
    num: 4,
    title: 'Temukan pola umum',
    detail: 'Menarik kesimpulan kausalitas, korelasi antar-variabel, dan generalisasi hukum makro bagi masyarakat luas.',
    icon: 'BarChart3'
  }
];

export const COMPARISON_POINTS_QUALITATIVE = [
  {
    num: 1,
    title: 'Data berbentuk narasi',
    detail: 'Transkrip kutipan percakapan lisan, catatan harian lapangan, foto artefak, dan dokumen sejarah.',
    icon: 'BookOpen'
  },
  {
    num: 2,
    title: 'Sampel kecil & mendalam',
    detail: '5 hingga 25 informan kunci yang dipilih purposif untuk menggali pengalaman hidup secara intensif.',
    icon: 'UserCheck'
  },
  {
    num: 3,
    title: 'Observasi & Wawancara',
    detail: 'Tanya jawab langsung tatap muka (in-depth interview), observasi partisipan, dan telaah studi kasus.',
    icon: 'MessageSquare'
  },
  {
    num: 4,
    title: 'Temukan makna mendalam',
    detail: 'Membedah motivasi emosional, nilai budaya lokal, relasi kuasa, dan alasan tersembunyi di balik perilaku.',
    icon: 'Heart'
  }
];

export const TABLE_5_COMPARISONS = [
  {
    dimensi: 'Fokus Utama',
    kuantitatif: 'Menguji hipotesis, mengidentifikasi pola, membuat generalisasi.',
    kualitatif: 'Memahami makna, menjelajahi proses, menghasilkan teori.',
    penjelasan: 'Kuantitatif bersifat deduktif (menguji teori yang sudah ada), sedangkan kualitatif bersifat induktif (membangun pemahaman dari bawah ke atas).'
  },
  {
    dimensi: 'Pertanyaan Kunci',
    kuantitatif: 'Berapa banyak?, Apa hubungannya?',
    kualitatif: 'Mengapa?, Bagaimana?',
    penjelasan: 'Kuantitatif menanyakan kuantitas dan korelasi matematis; kualitatif menanyakan proses dinamis dan alasan di balik peristiwa.'
  },
  {
    dimensi: 'Data',
    kuantitatif: 'Angka, statistik.',
    kualitatif: 'Kata-kata, teks, gambar, narasi.',
    penjelasan: 'Kuantitatif mengagregasi matriks data angka terukur; kualitatif menganalisis data tekstual kaya nuansa emosional dan kontekstual.'
  },
  {
    dimensi: 'Metode',
    kuantitatif: 'Survei, eksperimen, analisis statistik.',
    kualitatif: 'Wawancara mendalam, observasi partisipatif, studi kasus.',
    penjelasan: 'Kuantitatif menggunakan instrumen baku (kuesioner/alat ukur); kualitatif mengandalkan peneliti sendiri sebagai instrumen utama (human instrument).'
  },
  {
    dimensi: 'Kekuatan',
    kuantitatif: 'Objektif, dapat digeneralisasi, luas cakupannya.',
    kualitatif: 'Mendalam, kaya konteks, mengungkapkan nuansa.',
    penjelasan: 'Kuantitatif unggul dalam presisi dan generalisasi makro; kualitatif unggul dalam keotentikan dan detail mikro yang tak teraba angka.'
  },
  {
    dimensi: 'Kelemahan',
    kuantitatif: 'Mungkin dangkal, kehilangan konteks dan makna.',
    kualitatif: 'Subjektif, sulit untuk digeneralisasi, cakupannya terbatas.',
    penjelasan: 'Kuantitatif dapat mereduksi kompleksitas manusia menjadi deretan angka kering; kualitatif rentan bias peneliti dan tidak dapat diklaim berlaku untuk semua orang.'
  }
];

// ==========================================
// GAMIFIKASI: BADGES & LEVEL SYSTEM
// ==========================================

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge_first_step',
    title: 'Langkah Perdana Peneliti',
    description: 'Menjelajahi modul metodologi riset pertama kali dan memulai pembelajaran.',
    icon: 'Compass',
    category: 'dasar',
    requiredXp: 30
  },
  {
    id: 'badge_concept_explorer',
    title: 'Penjelajah Konsep Kunci',
    description: 'Mendalami prinsip-prinsip metodologi riset sosial dan glosarium ilmiah.',
    icon: 'Layers',
    category: 'dasar',
    requiredXp: 120
  },
  {
    id: 'badge_method_designer',
    title: 'Perancang Metodologi Ulung',
    description: 'Menyusun rancangan instrumen riset dan simulasi metodologi sosial di Lab Riset.',
    icon: 'FlaskConical',
    category: 'kritis',
    requiredXp: 220
  },
  {
    id: 'badge_bias_hunter',
    title: 'Pemburu Bias Metodologis',
    description: 'Membongkar corong bias konfirmasi, kacamata subjektivitas, dan generalisasi keliru di Modul 3.',
    icon: 'ShieldAlert',
    category: 'kritis',
    requiredXp: 320
  },
  {
    id: 'badge_sampling_expert',
    title: 'Kalkulator Sampel Ilmiah',
    description: 'Menghitung ukuran sampel dengan formula Slovin dan mengeksplorasi visualisasi sebaran populasi.',
    icon: 'Calculator',
    category: 'kuantitatif',
    requiredXp: 450
  },
  {
    id: 'badge_scholar',
    title: 'Cendekiawan Metodologi',
    description: 'Menuntaskan pembelajaran seluruh modul riset kualitatif, kuantitatif, dan rancangan instrumen.',
    icon: 'GraduationCap',
    category: 'master',
    requiredXp: 600
  }
];

export interface LevelInfo {
  name: string;
  badgeTitle: string;
  minXp: number;
  maxXp: number;
  levelIndex: number;
  nextLevelName?: string;
  color: string;
}

export const LEVELS_CONFIG: LevelInfo[] = [
  {
    name: 'Asisten Peneliti Pemula',
    badgeTitle: 'Tingkat 1 - Asisten Riset',
    minXp: 0,
    maxXp: 150,
    levelIndex: 1,
    nextLevelName: 'Peneliti Lapangan Aktif',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Peneliti Lapangan Aktif',
    badgeTitle: 'Tingkat 2 - Peneliti Lapangan',
    minXp: 150,
    maxXp: 350,
    levelIndex: 2,
    nextLevelName: 'Analis Metodologi Kritis',
    color: 'from-indigo-600 to-violet-600'
  },
  {
    name: 'Analis Metodologi Kritis',
    badgeTitle: 'Tingkat 3 - Analis Kritis',
    minXp: 350,
    maxXp: 600,
    levelIndex: 3,
    nextLevelName: 'Master Metodologi Sosial',
    color: 'from-violet-600 to-amber-600'
  },
  {
    name: 'Master Metodologi Sosial',
    badgeTitle: 'Tingkat 4 - Cendekiawan Utama',
    minXp: 600,
    maxXp: 1000,
    levelIndex: 4,
    color: 'from-amber-500 via-rose-500 to-indigo-700'
  }
];

export function getUserLevelInfo(xp: number): LevelInfo {
  if (xp >= 600) return LEVELS_CONFIG[3];
  if (xp >= 350) return LEVELS_CONFIG[2];
  if (xp >= 150) return LEVELS_CONFIG[1];
  return LEVELS_CONFIG[0];
}




