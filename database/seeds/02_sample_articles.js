exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('articles').del();

  // Get admin user ID
  const adminUser = await knex('users').first('user_id');
  const userId = adminUser ? adminUser.user_id : 1;

  // Sample articles with some highlighted
  await knex('articles').insert([
    {
      title: 'Membangun Karir di Dunia Teknologi',
      subtitle: 'Panduan lengkap untuk siswa SMK yang ingin berkarir di bidang IT',
      category: 'TECH',
      content: JSON.stringify([
        'Dunia teknologi menawarkan berbagai peluang karir yang menjanjikan. Sebagai siswa SMK, Anda memiliki kesempatan untuk memulai karir di bidang ini dengan persiapan yang tepat.',
        'Untuk sukses di dunia teknologi, ada beberapa skill fundamental yang perlu dikuasai: Programming dan coding, Problem solving, Komunikasi dan teamwork, serta Continuous learning.',
        'Beberapa jalur karir yang bisa Anda pilih antara lain: Web Developer, Mobile App Developer, UI/UX Designer, Network Engineer, dan Data Analyst.',
        'Mulailah dengan membangun portfolio dan terus belajar teknologi terbaru untuk meningkatkan peluang karir Anda.'
      ]),
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: true
    },
    {
      title: 'Tips Sukses Menghadapi Ujian Nasional',
      subtitle: 'Strategi belajar efektif untuk meraih nilai maksimal',
      category: 'EDUCATION',
      content: JSON.stringify([
        'Ujian Nasional adalah momen penting dalam perjalanan pendidikan. Dengan persiapan yang matang, Anda bisa meraih hasil terbaik.',
        'Jaga kesehatan fisik dan mental Anda dengan tidur yang cukup (7-8 jam), makan makanan bergizi, olahraga teratur, dan hindari stres berlebihan.',
        'Buat jadwal belajar yang terstruktur dan fokus pada materi yang belum dikuasai. Gunakan teknik pomodoro untuk meningkatkan konsentrasi.',
        'Latihan soal-soal dari tahun sebelumnya juga sangat membantu untuk memahami pola dan tipe soal yang akan muncul.'
      ]),
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: true
    },
    {
      title: 'Pentingnya Prakerin untuk Siswa SMK',
      subtitle: 'Manfaat praktik kerja industri dalam mempersiapkan masa depan',
      category: 'CAREER',
      content: JSON.stringify([
        'Praktik Kerja Industri (Prakerin) adalah kesempatan emas bagi siswa SMK untuk mendapatkan pengalaman kerja nyata di dunia industri.',
        'Manfaat Prakerin meliputi pengalaman kerja profesional, networking dengan industri, pemahaman budaya kerja, dan kesempatan mendapat pekerjaan setelah lulus.',
        'Jadilah proaktif, tunjukkan antusiasme, dan manfaatkan setiap kesempatan untuk belajar hal baru selama prakerin.',
        'Jangan lupa untuk membangun hubungan baik dengan mentor dan rekan kerja, karena ini bisa menjadi nilai tambah untuk karir Anda di masa depan.'
      ]),
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: true
    },
    {
      title: 'Mengenal Jurusan RPL di SMK',
      subtitle: 'Rekayasa Perangkat Lunak: Peluang dan Prospek Karir',
      category: 'EDUCATION',
      content: JSON.stringify([
        'Jurusan Rekayasa Perangkat Lunak (RPL) adalah salah satu jurusan favorit di SMK yang mempersiapkan siswa menjadi programmer profesional.',
        'Di jurusan RPL, siswa akan mempelajari dasar-dasar pemrograman, database management, web dan mobile development, serta project management.',
        'Lulusan RPL memiliki peluang karir yang sangat luas di era digital ini, dengan gaji yang kompetitif dan kesempatan untuk bekerja di perusahaan teknologi ternama.',
        'Tidak hanya bekerja di perusahaan, lulusan RPL juga bisa menjadi freelancer atau membuka startup sendiri.'
      ]),
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Kompetisi Skill untuk Siswa SMK',
      subtitle: 'Asah kemampuan dan raih prestasi melalui kompetisi',
      category: 'COMPETITION',
      content: JSON.stringify([
        'Kompetisi skill seperti LKS (Lomba Kompetensi Siswa) adalah ajang untuk menguji dan mengasah kemampuan siswa SMK.',
        'Manfaat mengikuti kompetisi antara lain: Meningkatkan skill teknis, membangun kepercayaan diri, mendapat sertifikat dan penghargaan, serta networking dengan siswa lain.',
        'Jangan takut untuk mencoba! Setiap kompetisi adalah kesempatan belajar yang berharga.',
        'Persiapkan diri dengan latihan intensif dan pelajari kompetisi-kompetisi sebelumnya untuk memahami standar yang diharapkan.'
      ]),
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Soft Skills yang Wajib Dimiliki Lulusan SMK',
      subtitle: 'Keterampilan non-teknis yang penting untuk sukses berkarir',
      category: 'CAREER',
      content: JSON.stringify([
        'Selain kemampuan teknis, soft skills sangat penting untuk kesuksesan karir jangka panjang.',
        'Soft skills penting yang harus dimiliki meliputi komunikasi efektif, leadership, time management, adaptabilitas, dan critical thinking.',
        'Ikuti organisasi siswa, volunteer, dan aktif dalam kegiatan ekstrakurikuler untuk mengembangkan soft skills Anda.',
        'Soft skills ini akan membedakan Anda dari kandidat lain saat melamar pekerjaan dan membantu Anda berkembang dalam karir.'
      ]),
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Beasiswa untuk Siswa Berprestasi',
      subtitle: 'Panduan mendapatkan beasiswa untuk melanjutkan pendidikan',
      category: 'EDUCATION',
      content: JSON.stringify([
        'Banyak program beasiswa yang tersedia untuk siswa SMK berprestasi yang ingin melanjutkan pendidikan ke jenjang lebih tinggi.',
        'Jenis beasiswa yang tersedia antara lain: Beasiswa akademik, beasiswa prestasi non-akademik, beasiswa ekonomi kurang mampu, dan beasiswa dari perusahaan.',
        'Persiapkan dokumen dengan baik, tulis essay yang menarik, dan tunjukkan komitmen Anda untuk terus belajar dan berkembang.',
        'Jangan hanya fokus pada satu beasiswa. Apply ke beberapa program beasiswa untuk meningkatkan peluang Anda mendapatkan funding.'
      ]),
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Membangun Portfolio untuk Fresh Graduate',
      subtitle: 'Panduan membuat portfolio yang menarik perhatian recruiter',
      category: 'CAREER',
      content: JSON.stringify([
        'Portfolio adalah senjata utama untuk fresh graduate dalam melamar pekerjaan. Portfolio yang baik bisa membedakan Anda dari kandidat lain.',
        'Isi portfolio Anda dengan project dari sekolah, project pribadi, sertifikat dan achievement, serta daftar skills dan teknologi yang dikuasai.',
        'Gunakan GitHub untuk programmer, Behance/Dribbble untuk designer, atau buat website portfolio sendiri untuk showcase karya Anda.',
        'Update portfolio secara berkala dengan project terbaru dan pastikan setiap project memiliki deskripsi yang jelas dan screenshot/demo yang menarik.'
      ]),
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Teknologi Cloud Computing untuk Pemula',
      subtitle: 'Memahami dasar-dasar cloud dan peluang karirnya',
      category: 'TECH',
      content: JSON.stringify([
        'Cloud computing adalah teknologi yang memungkinkan akses ke sumber daya komputasi melalui internet. Teknologi ini semakin penting di era digital.',
        'Platform cloud populer seperti AWS, Google Cloud, dan Microsoft Azure menawarkan berbagai layanan untuk developer dan bisnis.',
        'Keuntungan cloud computing meliputi skalabilitas, cost-effective, aksesibilitas dari mana saja, dan keamanan data yang terjamin.',
        'Mulai belajar cloud computing dengan mengikuti tutorial gratis dan dapatkan sertifikasi untuk meningkatkan peluang karir Anda.'
      ]),
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Menjadi UI/UX Designer Profesional',
      subtitle: 'Langkah-langkah memulai karir sebagai designer',
      category: 'DESIGN',
      content: JSON.stringify([
        'UI/UX Designer adalah profesi yang sangat dibutuhkan di industri digital. Designer yang baik bisa menciptakan produk yang user-friendly dan menarik.',
        'Skill yang perlu dikuasai meliputi design thinking, wireframing, prototyping, user research, dan tools seperti Figma atau Adobe XD.',
        'Pelajari prinsip-prinsip desain, psikologi warna, typography, dan interaction design untuk membuat interface yang intuitif.',
        'Bangun portfolio dengan project nyata dan terus update dengan trend design terbaru untuk tetap kompetitif di industri.'
      ]),
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Cybersecurity: Melindungi Dunia Digital',
      subtitle: 'Pentingnya keamanan siber di era modern',
      category: 'TECH',
      content: JSON.stringify([
        'Cybersecurity menjadi semakin penting seiring meningkatnya ancaman cyber di dunia digital. Setiap organisasi membutuhkan profesional keamanan siber.',
        'Ancaman cyber yang umum meliputi malware, phishing, ransomware, dan DDoS attack. Memahami ancaman ini adalah langkah pertama untuk melindungi sistem.',
        'Karir di bidang cybersecurity sangat menjanjikan dengan demand yang terus meningkat dan gaji yang kompetitif.',
        'Mulai dengan mempelajari fundamental networking, sistem operasi, dan ambil sertifikasi seperti CEH atau CompTIA Security+.'
      ]),
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Internet of Things (IoT) untuk Smart Living',
      subtitle: 'Bagaimana IoT mengubah cara hidup kita',
      category: 'TECH',
      content: JSON.stringify([
        'Internet of Things (IoT) menghubungkan perangkat fisik ke internet, memungkinkan mereka berkomunikasi dan berbagi data.',
        'Aplikasi IoT ada di mana-mana: smart home, wearable devices, smart city, industrial automation, dan healthcare monitoring.',
        'Teknologi IoT menggunakan sensor, actuator, microcontroller, dan connectivity protocol seperti WiFi, Bluetooth, dan LoRa.',
        'Peluang karir di bidang IoT sangat luas, dari hardware engineer hingga data analyst yang mengolah data dari IoT devices.'
      ]),
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Data Science dan Big Data Analytics',
      subtitle: 'Mengolah data menjadi insight berharga',
      category: 'TECH',
      content: JSON.stringify([
        'Data Science adalah ilmu yang menggabungkan statistik, programming, dan domain knowledge untuk mengekstrak insight dari data.',
        'Skill yang dibutuhkan meliputi Python/R programming, SQL, machine learning, data visualization, dan statistical analysis.',
        'Data scientist bekerja dengan big data untuk membantu perusahaan membuat keputusan berbasis data dan memprediksi trend masa depan.',
        'Mulai dengan mempelajari Python dan library seperti Pandas, NumPy, dan Scikit-learn untuk memulai journey sebagai data scientist.'
      ]),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Mobile App Development dengan Flutter',
      subtitle: 'Membuat aplikasi iOS dan Android dengan satu codebase',
      category: 'TECH',
      content: JSON.stringify([
        'Flutter adalah framework dari Google untuk membuat aplikasi mobile cross-platform dengan performa native.',
        'Keuntungan Flutter meliputi hot reload untuk development cepat, UI yang indah dan customizable, serta performa yang hampir sama dengan native.',
        'Dengan Flutter, developer bisa membuat aplikasi untuk iOS, Android, web, dan desktop dari satu codebase yang sama.',
        'Pelajari Dart programming language dan mulai membuat project sederhana untuk memahami konsep Flutter development.'
      ]),
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Artificial Intelligence dan Machine Learning',
      subtitle: 'Memahami kecerdasan buatan dan aplikasinya',
      category: 'TECH',
      content: JSON.stringify([
        'Artificial Intelligence (AI) dan Machine Learning (ML) adalah teknologi yang memungkinkan komputer belajar dan membuat keputusan seperti manusia.',
        'Aplikasi AI ada di berbagai bidang: image recognition, natural language processing, recommendation systems, dan autonomous vehicles.',
        'Untuk memulai AI/ML, pelajari fundamental mathematics (linear algebra, calculus, statistics) dan programming dengan Python.',
        'Ikuti online courses dan praktikkan dengan dataset dari Kaggle untuk mengasah skill machine learning Anda.'
      ]),
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Blockchain dan Cryptocurrency',
      subtitle: 'Teknologi di balik mata uang digital',
      category: 'TECH',
      content: JSON.stringify([
        'Blockchain adalah teknologi distributed ledger yang menjadi fondasi cryptocurrency seperti Bitcoin dan Ethereum.',
        'Keuntungan blockchain meliputi transparansi, keamanan, desentralisasi, dan immutability data yang tersimpan.',
        'Blockchain tidak hanya untuk cryptocurrency, tapi juga supply chain, healthcare records, voting systems, dan smart contracts.',
        'Pelajari Solidity untuk membuat smart contracts di Ethereum atau explore blockchain platforms lain seperti Hyperledger dan Polkadot.'
      ]),
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Game Development untuk Pemula',
      subtitle: 'Memulai karir sebagai game developer',
      category: 'TECH',
      content: JSON.stringify([
        'Game development menggabungkan programming, design, art, dan storytelling untuk menciptakan pengalaman interaktif.',
        'Engine populer untuk pemula: Unity (C#), Unreal Engine (C++), Godot (GDScript), dan GameMaker Studio.',
        'Mulai dengan game sederhana seperti platformer 2D atau puzzle game sebelum beralih ke project 3D yang kompleks.',
        'Join game jams untuk belajar, networking, dan membangun portfolio dengan deadline yang ketat.'
      ]),
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'DevOps dan CI/CD Pipeline',
      subtitle: 'Automasi deployment untuk developer modern',
      category: 'TECH',
      content: JSON.stringify([
        'DevOps adalah kultur dan praktik yang menggabungkan development dan operations untuk delivery software yang lebih cepat.',
        'CI/CD (Continuous Integration/Continuous Deployment) mengotomasi testing dan deployment code ke production.',
        'Tools DevOps yang populer: Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions, dan Terraform.',
        'Kuasai Linux command line, scripting, dan cloud platforms untuk menjadi DevOps engineer yang kompeten.'
      ]),
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Web3 dan Decentralized Applications',
      subtitle: 'Masa depan internet yang terdesentralisasi',
      category: 'TECH',
      content: JSON.stringify([
        'Web3 adalah evolusi internet yang berbasis blockchain, memberikan kontrol data kembali ke user.',
        'DApps (Decentralized Applications) berjalan di blockchain tanpa central authority, lebih transparan dan resistant terhadap censorship.',
        'Teknologi Web3 meliputi smart contracts, IPFS untuk storage, dan wallet integration untuk autentikasi.',
        'Pelajari Web3.js atau Ethers.js untuk berinteraksi dengan blockchain dari aplikasi web Anda.'
      ]),
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Augmented Reality dan Virtual Reality',
      subtitle: 'Teknologi immersive untuk masa depan',
      category: 'TECH',
      content: JSON.stringify([
        'AR (Augmented Reality) menambahkan elemen digital ke dunia nyata, sementara VR (Virtual Reality) menciptakan dunia virtual sepenuhnya.',
        'Platform AR/VR: ARKit/ARCore untuk mobile AR, Unity/Unreal untuk VR development, dan WebXR untuk AR/VR di browser.',
        'Aplikasi AR/VR ada di gaming, education, training, real estate, healthcare, dan e-commerce.',
        'Hardware VR seperti Meta Quest dan AR glasses semakin affordable, membuka peluang karir di spatial computing.'
      ]),
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Database Management dan SQL',
      subtitle: 'Menguasai pengelolaan data aplikasi',
      category: 'TECH',
      content: JSON.stringify([
        'Database adalah fondasi setiap aplikasi modern untuk menyimpan dan mengelola data secara efisien.',
        'SQL (Structured Query Language) adalah bahasa standard untuk berinteraksi dengan relational database seperti MySQL, PostgreSQL, dan SQL Server.',
        'Pelajari database design, normalization, indexing, dan query optimization untuk performa aplikasi yang baik.',
        'Explore juga NoSQL databases seperti MongoDB, Redis, dan Cassandra untuk use case yang berbeda.'
      ]),
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    },
    {
      title: 'Robotics dan Automation',
      subtitle: 'Membangun robot untuk berbagai aplikasi',
      category: 'TECH',
      content: JSON.stringify([
        'Robotics menggabungkan mechanical engineering, electronics, dan computer science untuk menciptakan mesin yang dapat bergerak dan berinteraksi.',
        'Platform robotics untuk pemula: Arduino untuk embedded systems, Raspberry Pi untuk computing, dan ROS (Robot Operating System).',
        'Aplikasi robotics ada di manufacturing automation, autonomous vehicles, drones, medical robots, dan home automation.',
        'Kuasai sensor integration, motor control, computer vision, dan path planning algorithms untuk robotics development.'
      ]),
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      created_by: userId,
      updated_by: userId,
      is_highlight: false
    }
  ]);
};
