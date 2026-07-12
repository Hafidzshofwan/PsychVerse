/* PsychVerse — basis data pengetahuan (ICD-10 Bab V, PPDGJ-III, metadata sumber).
   Dimuat sebelum app.js. Konten sintetis/edukasional — Draft, perlu tinjauan klinisi. */
const KNOWLEDGE_META={source:"PPDGJ-III (Depkes RI, 1993) — Bab V ICD-10: Klasifikasi Gangguan Jiwa & Perilaku",contentVersion:"ppdgj3-icd10-1.1",effectiveDate:"2026-07-12",license:"Kode & judul kategori: sesuai PPDGJ-III / ICD-10 Bab V (rujukan resmi). Pedoman diagnostik rinci: parafrase dari PPDGJ-III, dilengkapi bertahap.",ppdgj:"Sumber: Pedoman Penggolongan dan Diagnosis Gangguan Jiwa di Indonesia III (PPDGJ-III), Departemen Kesehatan RI, 1993."};
const SYN="[SINTETIS — non-produksi]";
const PEND="Pedoman diagnostik PPDGJ-III sedang dilengkapi (transkripsi bertahap).";
const PPDGJ_PD = {"F20–F29":{"deskripsi":"Skizofrenia adalah gangguan paling lazim dan penting dalam kelompok ini. Gangguan skizotipal memiliki banyak ciri khas skizofrenik dan mungkin berkaitan secara genetik, namun tanpa halusinasi/waham/gangguan perilaku besar dari skizofrenia. Kebanyakan gangguan waham mungkin tidak berkaitan dengan skizofrenia. Kelompok gangguan psikotik akut dan sementara (transient) terutama lazim di negara berkembang. Gangguan skizoafektif tetap dipertahankan walau kontroversial.","halaman":"p115-117"},"F20":{"deskripsi":"Gangguan skizofrenik umumnya ditandai distorsi pikiran dan persepsi yang mendasar dan khas, serta afek yang tidak wajar (inappropriate) atau tumpul (blunted). Kesadaran jernih dan kemampuan intelektual biasanya tetap dipertahankan, walaupun defisit kognitif tertentu dapat berkembang. Melibatkan fungsi paling mendasar yang memberi perasaan individualitas, keunikan, dan self-direction.","gejala_kelompok":{"catatan":"Tidak ada gejala patognomonik khusus; dalam praktek dibagi ke dalam kelompok yang penting untuk diagnosis dan sering terdapat bersama-sama.","a":"'thought echo' (isi pikiran diri sendiri terulang/bergema), 'thought insertion or withdrawal' (isi pikiran asing masuk / diambil keluar), dan 'thought broadcasting' (isi pikiran tersiar keluar).","b":"Waham dikendalikan (delusion of control), waham dipengaruhi (delusion of influence), atau 'passivity' yang jelas merujuk pada pergerakan tubuh/anggota gerak, atau pikiran, tindakan, atau penginderaan (sensations) khusus; persepsi delusional.","c":"Suara halusinasi yang berkomentar secara terus-menerus terhadap perilaku pasien, atau mendiskusikan pasien di antara mereka sendiri, atau jenis suara halusinasi lain yang berasal dari salah satu bagian tubuh.","d":"Waham menetap jenis lain yang menurut budayanya dianggap tidak wajar serta mustahil, misalnya identitas keagamaan/politik, kekuatan/kemampuan 'manusia super' (mengendalikan cuaca, berkomunikasi dengan makhluk asing dari dunia lain).","e":"Halusinasi menetap dari panca-indera apa saja, apabila disertai waham yang mengambang/setengah berbentuk tanpa kandungan afektif jelas, atau oleh ide-ide berlebihan (over-valued ideas) menetap, atau bila terjadi setiap hari selama berminggu/berbulan terus-menerus.","f":"Arus pikiran terputus (breaks) atau mengalami sisipan (interpolasi), berakibat inkoherensi, pembicaraan tidak relevan, atau neologisme.","g":"Perilaku katatonik: gaduh-gelisah (excitement), posturing, fleksibilitas serea (waxy flexibility), negativisme, mutisme, dan stupor.","h":"Gejala 'negatif': apatis, bicara jarang, respons emosional menumpul/tidak wajar, mengakibatkan penarikan diri sosial dan menurunnya kinerja sosial; harus jelas bukan akibat depresi atau medikasi neuroleptika.","i":"Perubahan konsisten dan bermakna dalam mutu keseluruhan perilaku pribadi: hilangnya minat, tak bertujuan, sikap malas, self-absorbed attitude, dan penarikan diri sosial."},"pedoman_diagnostik":"Minimal satu gejala amat jelas (biasanya dua atau lebih bila kurang tajam) dari kelompok (a)-(d), ATAU minimal dua gejala dari kelompok (e)-(h); harus ada jelas selama kurun waktu satu bulan atau lebih. Bila memenuhi gejala tetapi kurang dari satu bulan, didiagnosis dulu sebagai gangguan psikotik lir-skizofrenia akut (F23.2) dan diklasifikasi ulang bila menetap lebih lama. Kriteria lama 1 bulan hanya berlaku untuk gejala khas, tidak untuk fase prodromal nonpsikotik.","pengecualian":"Tidak boleh didiagnosis bila gejala depresif/manik luas kecuali gejala skizofrenik jelas mendahului. Bila gejala skizofrenik & afektif seimbang & sama banyak -> skizoafektif (F25). Tidak boleh bila ada penyakit otak nyata, atau dalam intoksikasi/putus zat. Gangguan serupa pada epilepsi/penyakit otak -> F06.2; diinduksi obat -> F1x.5.","pola_perjalanan_karakter_kelima":{"F20.x0":"Berkelanjutan","F20.x1":"Episodik dengan kemunduran progresif","F20.x2":"Episodik dengan kemunduran stabil","F20.x3":"Episodik berulang","F20.x4":"Remisi tak sempurna","F20.x5":"Remisi sempurna","F20.x8":"Lainnya","F20.x9":"Periode pengamatan kurang dari satu tahun"},"halaman":"p117-122"},"F20.0":{"deskripsi":"Jenis paling sering dijumpai. Didominasi waham yang relatif stabil, sering paranoid, biasanya disertai halusinasi (terutama pendengaran) dan gangguan persepsi. Gangguan afektif, dorongan kehendak, pembicaraan, dan gejala katatonik tidak menonjol.","pedoman_diagnostik":"Kriteria umum skizofrenia (F20) harus dipenuhi. Sebagai tambahan: halusinasi dan/atau waham harus menonjol; gangguan afektif, dorongan kehendak, pembicaraan, serta gejala katatonik relatif tidak nyata.","termasuk":["skizofrenia parafrenik"],"tak_termasuk":["keadaan paranoid involusional (F22.8)","paranoia (F22.0)"],"halaman":"p122-123"},"F20.1":{"deskripsi":"Perubahan afektif jelas; waham & halusinasi mengambang dan terputus-putus (fragmentary); perilaku tak bertanggung jawab & tak dapat diramalkan; mannerisme. Mood dangkal & tidak wajar (giggling, self-satisfied, self-absorbed smiling, lofty manner, grimaces, mannerisme, pranks, keluhan hipokondrik, ungkapan diulang-ulang). Proses pikir disorganisasi, pembicaraan rambling & inkoheren; kecenderungan menyendiri (solitary); perilaku hampa tujuan & hampa perasaan. Biasanya mulai umur 15-25 tahun; prognosis cenderung buruk.","pedoman_diagnostik":"Kriteria umum skizofrenia (F20) harus dipenuhi. Biasanya ditegakkan pertama kali pada remaja/dewasa muda. Kepribadian premorbid khas: pemalu dan menyendiri. Untuk diagnosis meyakinkan umumnya diperlukan pengamatan kontinu selama 2 atau 3 bulan untuk memastikan perilaku khas bertahan.","termasuk":["skizofrenia tak terorganisasi (disorganized)","hebefrenia"],"halaman":"p123-125"},"F20.2":{"deskripsi":"Gangguan psikomotor menonjol, bervariasi antara ekstrem (hiperkinesis vs stupor; kepatuhan otomatis vs negativisme). Sikap & posisi tubuh yang dipaksakan (constrained) dapat dipertahankan lama. Episode kegelisahan disertai kekerasan mungkin mencolok.","kriteria":{"a":"stupor (amat berkurangnya reaktivitas terhadap lingkungan serta gerakan & aktivitas spontan) atau mutisme;","b":"kegelisahan (aktivitas motorik tak bertujuan, tidak dipengaruhi stimuli eksternal);","c":"berpose (sukarela mengambil & mempertahankan sikap tubuh yang tidak wajar/bizarre);","d":"negativisme (perlawanan tak bermotif terhadap semua instruksi/upaya digerakkan, atau bergerak ke arah berlawanan);","e":"rigiditas (mempertahankan sikap tubuh kaku melawan upaya menggerakkan);","f":"fleksibilitas serea/'waxy flexibility' (mempertahankan posisi anggota gerak & tubuh yang dibentuk dari luar);","g":"gejala lain seperti command automatism (ketaatan otomatis terhadap perintah) dan perseverasi kata/kalimat."},"pedoman_diagnostik":"Kriteria umum skizofrenia (F20) harus dipenuhi. Satu atau lebih perilaku (a)-(g) harus mendominasi gambaran klinis. Pada pasien tidak komunikatif dengan manifestasi katatonik, diagnosis skizofrenia mungkin ditunda sampai bukti memadai gejala lain. Gejala katatonik bukan petunjuk diagnostik khusus skizofrenia; dapat diprovokasi penyakit otak, gangguan metabolik, alkohol/obat, dan gangguan mood.","termasuk":["stupor katatonik","katalepsi skizofrenik","katatonia skizofrenik","fleksibilitas serea skizofrenik"],"halaman":"p125-127"},"F20.3":{"deskripsi":"Memenuhi kriteria diagnostik umum skizofrenia tetapi tidak sesuai salah satu subtipe F20.0-F20.2, atau menampilkan gejala lebih dari satu subtipe tanpa predominasi jelas. Hanya untuk kondisi psikotik (residual F20.5 dan depresi pasca-skizofrenia F20.4 tidak termasuk) dan sesudah upaya klasifikasi ke 3 kategori sebelumnya.","pedoman_diagnostik":"(a) memenuhi kriteria diagnostik skizofrenia; (b) tidak memenuhi kriteria paranoid, hebefrenik, atau katatonik; (c) tidak memenuhi kriteria residual atau depresi pasca-skizofrenia.","termasuk":["skizofrenia tak khas"],"halaman":"p127"},"F20.4":{"deskripsi":"Episode depresif yang mungkin berlangsung lama, timbul sesudah serangan skizofrenia. Beberapa gejala skizofrenik ('positif' atau 'negatif', biasanya negatif) masih ada tetapi tidak lagi mendominasi. Disertai peningkatan risiko bunuh diri.","pedoman_diagnostik":"(a) pasien telah menderita skizofrenia yang memenuhi kriteria umum selama 12 bulan terakhir; (b) beberapa gejala skizofrenik masih tetap ada; (c) gejala depresif menonjol & mengganggu, memenuhi minimal kriteria episode depresif (F32.-), dan telah ada minimal 2 minggu. Bila tidak ada lagi gejala skizofrenik -> episode depresif (F32.-). Bila gejala skizofrenik masih jelas & menonjol -> tetap subtipe skizofrenia yang sesuai.","halaman":"p127-128"},"F20.5":{"deskripsi":"Stadium kronis dalam perkembangan skizofrenia; ada progresi jelas dari stadium awal (satu/lebih episode psikotik) ke stadium lanjut yang ditandai gejala 'negatif' jangka panjang, walau belum tentu ireversibel.","pedoman_diagnostik":"(a) gejala 'negatif' menonjol (perlambatan psikomotor, aktivitas menurun, afek menumpul, pasif & tak ada inisiatif, miskin kuantitas/isi pembicaraan, komunikasi nonverbal buruk, perawatan diri & kinerja sosial buruk); (b) minimal ada riwayat satu episode psikotik jelas di masa lampau memenuhi kriteria skizofrenia; (c) sedikitnya melampaui kurun waktu satu tahun di mana intensitas & frekuensi gejala nyata (waham/halusinasi) minimal & timbul sindrom 'negatif'; (d) tidak ada demensia/penyakit otak lain, depresi kronis, atau institusionalisasi yang menjelaskan hendaya negatif tersebut.","termasuk":["skizofrenia tak terinci kronis","'Restzustand'","keadaan residual skizofrenik"],"halaman":"p128-129"},"F20.6":{"deskripsi":"Tidak lazim; perkembangan perlahan tetapi progresif dari keanehan tingkah laku, ketidakmampuan memenuhi tuntutan masyarakat, dan penurunan kinerja menyeluruh. Tidak ada waham & halusinasi. Ciri 'negatif' khas residual (afek menumpul, hilangnya dorongan kehendak) timbul tanpa didahului gejala psikotik overt. Dapat berkembang menjadi gelandangan psikotik, pendiam, malas, tanpa tujuan.","pedoman_diagnostik":"Diagnosis sulit ditegakkan secara meyakinkan karena tergantung pemastian perkembangan perlahan & progresif dari gejala 'negatif' khas residual (F20.5) tanpa riwayat halusinasi, waham, atau manifestasi episode psikotik sebelumnya, disertai perubahan bermakna perilaku pribadi (kehilangan minat mencolok, kemalasan, dan penarikan diri sosial).","termasuk":["skizofrenia simpleks"],"halaman":"p129-130"},"F20.8":{"termasuk":["skizofrenia senestopatik","gangguan skizofreniform YTT"],"tak_termasuk":["gangguan lir-skizofrenia akut (F23.2)","skizofrenia siklik (F25.2)","skizofrenia laten (F23.2)"],"halaman":"p130"},"F20.9":{"halaman":"p130"},"F21":{"deskripsi":"Ditandai perilaku eksentrik dan anomali dalam berpikir & afek yang menyerupai skizofrenia, walaupun anomali skizofrenik khas & nyata tidak pernah terjadi pada stadium mana pun. Tidak ada gangguan yang khas/dominan; berjalan kronis dengan intensitas berfluktuasi. Kadang berkembang menjadi skizofrenia overt. Lebih lazim pada individu dengan hubungan keluarga penderita skizofrenik ('spektrum' genetik skizofrenia).","ciri":{"a":"afek tak wajar atau menyempit/konstriksi (individu tampak dingin & tak bersahabat);","b":"perilaku/penampakan aneh, eksentrik, atau ganjil;","c":"hubungan sosial buruk dengan orang lain & tendensi menarik diri;","d":"kepercayaan aneh atau pikiran magis yang mempengaruhi perilaku & tidak serasi dengan norma budaya;","e":"kecurigaan atau ide paranoid;","f":"pikiran obsesif yang direnungkan & tak terkendali, sering berisi dismorfofobik, seksual, atau agresif;","g":"persepsi pancaindera luar biasa termasuk somatosensory (tubuh) atau ilusi lain, depersonalisasi atau derealisasi;","h":"pemikiran samar-samar (vague), sirkumstansial, penuh kiasan (metaforis), sangat terinci & ruwet, atau stereotipik, tanpa inkoherensi yang jelas;","i":"sewaktu-waktu episode menyerupai psikotik sementara dengan ilusi kuat, halusinasi auditorik atau lainnya, dan gagasan mirip waham, biasanya tanpa provokasi dari luar."},"pedoman_diagnostik":"Rubrik ini tidak dianjurkan digunakan secara umum karena tidak dibatasi jelas dengan skizofrenia simpleks atau gangguan kepribadian skizoid/paranoid. Bila dipakai: tiga atau empat gejala khas di atas harus sudah ada, terus-menerus atau episodik, sedikitnya untuk 2 tahun lamanya. Individu tidak pernah memenuhi kriteria skizofrenia. Riwayat skizofrenia pada anggota keluarga terdekat memberi bobot tambahan tetapi bukan prasyarat.","termasuk":["skizofrenia ambang","skizofrenia laten","reaksi skizofrenik laten","skizofrenia prapsikotik","skizofrenia prodromal","skizofrenia pseudoneurotik","skizofrenia pseudopsikopatik","gangguan kepribadian skizotipal"],"tak_termasuk":["sindrom Asperger (F84.5)","gangguan kepribadian skizoid (F60.1)"],"halaman":"p130-132"},"F22":{"deskripsi":"Kelompok gangguan dengan waham berlangsung lama sebagai satu-satunya gejala klinis khas/paling mencolok, yang tidak dapat digolongkan sebagai gangguan organik, skizofrenik, atau afektif. Heterogen; hubungan dengan skizofrenia tidak pasti.","halaman":"p132-134"},"F22.0":{"deskripsi":"Berkembangnya waham tunggal atau sistem waham yang umumnya menetap, kadang seumur hidup. Isi waham beraneka ragam: kejaran, hipokondrik, kebesaran, litigious (perkara pengadilan), kecemburuan, keyakinan tubuh dibentuk abnormal, atau keyakinan orang lain menganggapnya berbau/homoseksual. Onset biasanya usia pertengahan. Selain perbuatan/sikap terkait waham, afek/pembicaraan/perilaku normal.","pedoman_diagnostik":"Waham merupakan satu-satunya ciri khas/gejala paling mencolok, harus ada minimal 3 bulan, bersifat khas pribadi (bukan subkultural). Gejala depresif/episode depresif penuh (F32.-) boleh intermiten asalkan waham menetap saat tidak ada gangguan mood. Tidak ada bukti penyakit otak; tidak ada/hanya kadang-kadang halusinasi auditorik; tanpa riwayat gejala skizofrenik (waham dikendalikan, thought broadcasting, dll).","termasuk":["paranoia","psikosis paranoid","keadaan paranoid","parafrenia (lanjut)","Beziehungswahn yang lebih peka"],"tak_termasuk":["gangguan kepribadian paranoid (F60.0)","psikosis paranoid psikogenik (F23.3)","reaksi paranoid (F23.3)","skizofrenia paranoid (F20.0)"],"halaman":"p132-134"},"F22.8":{"deskripsi":"Kategori residual untuk gangguan waham menetap yang tidak memenuhi kriteria F22.0. Termasuk gangguan dengan waham disertai suara halusinasi menetap atau gejala skizofrenik yang tidak cukup memenuhi kriteria skizofrenia (F20.-). Gangguan waham yang berlangsung kurang dari 3 bulan dimasukkan (sementara) ke F23.-.","termasuk":["dismorfofobia delusional","keadaan paranoid involusional","keluhan paranoia (querulans)"],"halaman":"p134"},"F22.9":{"halaman":"p134"},"F23":{"deskripsi":"Urutan diagnosis mencerminkan prioritas ciri kunci: (a) onset akut (dalam 2 minggu) sebagai ciri khas penentu seluruh kelompok; (b) adanya sindrom yang khas; (c) adanya stres akut yang terkait. Onset akut = perubahan dari keadaan tanpa gejala psikotik ke keadaan psikotik jelas dalam <=2 minggu. Onset mendadak (<=48 jam) dianjurkan ditentukan bila mungkin. Kesembuhan sempurna biasanya dalam 2-3 bulan.","karakter_kelima":{"F23.x0":"Tanpa penyerta stres akut","F23.x1":"Dengan penyerta stres akut"},"catatan_stres":"Stres akut = gejala psikotik pertama terjadi kira-kira 2 minggu sesudah satu/lebih kejadian yang dianggap menekan (kesedihan, kehilangan mitra/pekerjaan, perceraian, trauma perang/terorisme/penyiksaan). Kesulitan/problem berkepanjangan TIDAK dimasukkan sebagai sumber stres di sini.","halaman":"p135-142"},"F23.0":{"deskripsi":"Halusinasi, waham, dan gangguan persepsi jelas tetapi sangat bervariasi & berubah dari hari ke hari bahkan jam ke jam. Kekalutan emosional dengan perasaan senang/ekstase atau anxietas & iritabilitas. Gambaran polimorfik & tidak stabil yang khas.","pedoman_diagnostik":"(a) onset akut (<=2 minggu dari nonpsikotik ke psikotik jelas); (b) ada beberapa jenis halusinasi/waham yang berubah jenis & intensitas dari hari ke hari/dalam hari yang sama; (c) ada keadaan emosional yang sama beraneka ragamnya; (d) walaupun beraneka ragam, tidak satu pun gejala ada cukup konsisten memenuhi kriteria skizofrenia (F20.-) atau episode manik (F30.-)/depresif (F32.-).","termasuk":["bouffee delirante tanpa gejala skizofrenia atau YTT","psikosis sikloid tanpa gejala skizofrenia atau YTT"],"halaman":"p138-139"},"F23.1":{"deskripsi":"Memenuhi kriteria deskriptif gangguan psikotik polimorfik akut (F23.0), tetapi selalu disertai gejala skizofrenik yang khas.","pedoman_diagnostik":"Kriteria (a),(b),(c) yang khas untuk psikotik polimorfik akut harus dipenuhi; sebagai tambahan, gejala yang memenuhi kriteria skizofrenia (F20.-) harus sudah ada untuk sebagian besar waktu sejak munculnya gambaran klinis psikotik. Bila gejala skizofrenia menetap >1 bulan -> ubah ke skizofrenia (F20.-).","termasuk":["bouffee delirante dengan gejala skizofrenia","psikosis sikloid dengan gejala skizofrenia"],"halaman":"p139-140"},"F23.2":{"deskripsi":"Gejala psikotik akut yang relatif stabil dan memenuhi kriteria skizofrenia (F20.-) tetapi hanya berlangsung kurang dari 1 bulan. Variasi & instabilitas emosional mungkin ada tetapi tidak separah psikosis polimorfik akut.","pedoman_diagnostik":"(a) onset gejala psikotik akut (<=2 minggu dari nonpsikotik ke psikotik jelas); (b) gejala yang memenuhi kriteria skizofrenia (F20.-) sudah ada sebagian besar waktu sejak berkembangnya gambaran klinis psikotik jelas; (c) kriteria psikosis polimorfik akut tidak terpenuhi. Bila gejala skizofrenia menetap >1 bulan -> ubah ke skizofrenia (F20.-).","termasuk":["skizofrenia akut (tak terinci)","gangguan skizofreniform singkat","psikosis skizofreniform singkat","oneirofrenia","reaksi skizofrenik"],"tak_termasuk":["gangguan waham organik lir-skizofrenia (F06.2)","gangguan skizofreniform YTT (F20.8)"],"halaman":"p140-141"},"F23.3":{"deskripsi":"Waham & halusinasi yang secara komparatif stabil merupakan gambaran klinis utama tetapi tidak memenuhi kriteria skizofrenia (F20.-). Waham kejaran/rujukan lazim; halusinasi biasanya auditorik (suara berbicara langsung dengan pasien).","pedoman_diagnostik":"(a) onset gejala psikotik akut (<=2 minggu dari nonpsikotik ke psikotik jelas); (b) waham & halusinasi sudah ada sebagian besar waktu sejak berkembangnya keadaan psikotik jelas; (c) baik kriteria skizofrenia (F20.-) maupun psikotik polimorfik akut (F23.0) tidak terpenuhi. Bila waham menetap >3 bulan -> gangguan waham menetap (F22.-). Bila hanya halusinasi menetap >3 bulan -> psikosis nonorganik lainnya (F28).","termasuk":["reaksi paranoid","psikosis paranoid psikogenik"],"halaman":"p141-142"},"F23.8":{"deskripsi":"Gangguan psikotik akut lain yang tidak dapat diklasifikasikan ke kategori mana pun dalam F23 (mis. keadaan psikotik akut dengan waham & halusinasi jelas yang menetap hanya untuk sebagian kecil waktu; keadaan gaduh-gelisah tak khas), dengan syarat tidak ada tanda penyebab organik.","halaman":"p142"},"F23.9":{"termasuk":["psikosis reaktif (singkat) YTT"],"halaman":"p142"},"F24":{"deskripsi":"Gangguan waham yang jarang, dialami oleh dua orang (kadang lebih) dengan hubungan emosional erat. Hanya seorang yang menderita gangguan psikotik sesungguhnya; waham terinduksi pada yang lain (pasif) dan biasanya menghilang bila mereka dipisahkan. Waham biasanya kronis, bersifat kejaran atau kebesaran. Orang yang terlibat biasanya sangat dekat/akrab dan terisolasi dari orang lain (bahasa, budaya, letak geografik).","pedoman_diagnostik":"(a) dua orang atau lebih mengalami waham/sistem waham yang sama dan saling mendukung dalam keyakinan itu; (b) mereka mempunyai hubungan luar biasa dekat; (c) ada bukti (konteks waktu atau lainnya) bahwa waham diinduksi pada anggota pasif melalui kontak dengan anggota aktif. Bila ada alasan percaya dua orang yang tinggal bersama memiliki gangguan psikotik terpisah (independent), tidak satu pun boleh dimasukkan ke kode ini walaupun beberapa waham diyakini bersama.","termasuk":["folie a deux","gangguan psikotik atau paranoid karena induksi","psikosis simbiotik"],"tak_termasuk":["folie simultanee"],"halaman":"p142-143"},"F25":{"deskripsi":"Gangguan episodik dengan gejala afektif dan skizofrenik sama-sama menonjol dalam episode penyakit yang sama, bersamaan atau berselang beberapa hari. Waham/halusinasi yang tak serasi mood (mood-incongruent) pada gangguan afektif (F30.2, F31.2, F31.5, F32.3, F33.3) tidak dengan sendirinya menyokong diagnosis skizoafektif.","catatan":"Tidak dipakai untuk pasien yang menampilkan gejala skizofrenik & afektif pada episode yang berbeda. Depresi pasca-skizofrenia dikode F20.4.","halaman":"p143-148"},"F25.0":{"deskripsi":"Gejala skizofrenik & manik sama-sama menonjol dalam satu episode. Kelainan afektif berupa elasi disertai peningkatan rasa harga diri & ide kebesaran; kadang kegelisahan/iritabilitas & perilaku agresif; ide kejaran. Energi meningkat, aktivitas berlebihan, konsentrasi terganggu, hilangnya hambatan sosial normal. Biasanya psikosis dengan onset akut; penyembuhan sempurna umumnya dalam beberapa minggu.","pedoman_diagnostik":"Suasana perasaan harus meningkat menonjol (atau peningkatan tak begitu mencolok dikombinasi iritabilitas/kegelisahan). Dalam episode yang sama harus jelas ada sedikitnya satu (sebaiknya dua) gejala skizofrenik khas (F20 pedoman (a)-(d)).","termasuk":["psikosis skizoafektif tipe manik","psikosis skizofreniform tipe manik"],"halaman":"p145-146"},"F25.1":{"deskripsi":"Gejala skizofrenik & depresif sama-sama menonjol dalam episode penyakit yang sama. Depresi disertai gejala khas: retardasi, insomnia, hilangnya energi, perubahan nafsu makan/berat badan, berkurangnya minat, hendaya konsentrasi, rasa bersalah, keputusasaan, pikiran bunuh diri. Biasanya kurang beraneka ragam & menakutkan dibanding tipe manik tetapi cenderung berlangsung lebih lama; prognosis kurang baik.","pedoman_diagnostik":"Harus ada depresi yang menonjol, disertai minimal dua gejala depresif khas atau kelainan perilaku terkait (seperti pada episode depresif F32.-); dalam episode yang sama, sedikitnya jelas ada satu (sebaiknya dua) gejala skizofrenik khas (F20 pedoman (a)-(d)).","termasuk":["psikosis skizoafektif tipe depresif","psikosis skizofreniform tipe depresif"],"halaman":"p146-147"},"F25.2":{"deskripsi":"Gejala skizofrenia (F20.-) ada bersama-sama dengan gejala gangguan afektif bipolar campuran (F31.6).","termasuk":["skizofrenia siklik","psikosis skizofrenik & afektif campuran"],"halaman":"p147"},"F25.8":{"halaman":"p147"},"F25.9":{"termasuk":["psikosis skizoafektif YTT"],"halaman":"p147"},"F28":{"deskripsi":"Gangguan psikotik yang tidak memenuhi kriteria skizofrenia (F20.-) atau gangguan afektif tipe psikotik (F30-F39), dan tidak memenuhi kriteria gejala untuk gangguan waham menetap (F22.-).","termasuk":["psikosis halusinasi kronis YTT"],"halaman":"p148"},"F29":{"termasuk":["Psikosis YTT"],"tak_termasuk":["gangguan jiwa YTT (F99)","psikosis organik atau simtomatik YTT (F09)"],"halaman":"p148"}};

const ICD10=[
  {id:"icd_f0",code:"F00–F09",term:"Gangguan Mental Organik, termasuk Gangguan Mental Simtomatik",block:true,children:[
    {id:"icd_f00",code:"F00",term:"Demensia pada penyakit Alzheimer",synonyms:["alzheimer","demensia"],children:[
      {id:"icd_f000",code:"F00.0",term:"Demensia pada penyakit Alzheimer dengan onset dini"},
      {id:"icd_f001",code:"F00.1",term:"Demensia pada penyakit Alzheimer dengan onset lambat"},
      {id:"icd_f002",code:"F00.2",term:"Demensia pada penyakit Alzheimer, tipe tak khas atau tipe campuran"},
      {id:"icd_f009",code:"F00.9",term:"Demensia pada penyakit Alzheimer YTT"}
    ]},
    {id:"icd_f01",code:"F01",term:"Demensia vaskular",synonyms:["vaskular","multi-infark"],children:[
      {id:"icd_f010",code:"F01.0",term:"Demensia vaskular onset akut"},
      {id:"icd_f011",code:"F01.1",term:"Demensia multi-infark"},
      {id:"icd_f012",code:"F01.2",term:"Demensia vaskular subkortikal"},
      {id:"icd_f013",code:"F01.3",term:"Demensia vaskular campuran kortikal dan subkortikal"},
      {id:"icd_f018",code:"F01.8",term:"Demensia vaskular lainnya"},
      {id:"icd_f019",code:"F01.9",term:"Demensia vaskular YTT"}
    ]},
    {id:"icd_f02",code:"F02",term:"Demensia pada penyakit lain YDK",synonyms:["pick","huntington","parkinson","creutzfeldt"],children:[
      {id:"icd_f020",code:"F02.0",term:"Demensia pada penyakit Pick"},
      {id:"icd_f021",code:"F02.1",term:"Demensia pada penyakit Creutzfeldt-Jakob"},
      {id:"icd_f022",code:"F02.2",term:"Demensia pada penyakit Huntington"},
      {id:"icd_f023",code:"F02.3",term:"Demensia pada penyakit Parkinson"},
      {id:"icd_f024",code:"F02.4",term:"Demensia pada penyakit human immunodeficiency virus [HIV]"},
      {id:"icd_f028",code:"F02.8",term:"Demensia pada penyakit lain YDT YDK"}
    ]},
    {id:"icd_f03",code:"F03",term:"Demensia YTT",synonyms:["demensia"]},
    {id:"icd_f04",code:"F04",term:"Sindrom amnesik organik, bukan akibat alkohol dan zat psikoaktif lainnya",synonyms:["amnesik","amnesia organik"]},
    {id:"icd_f05",code:"F05",term:"Delirium, bukan akibat alkohol dan zat psikoaktif lainnya",synonyms:["delirium","konfusi"],children:[
      {id:"icd_f050",code:"F05.0",term:"Delirium, tak bertumpang tindih dengan demensia"},
      {id:"icd_f051",code:"F05.1",term:"Delirium, bertumpang tindih dengan demensia"},
      {id:"icd_f058",code:"F05.8",term:"Delirium lainnya"},
      {id:"icd_f059",code:"F05.9",term:"Delirium YTT"}
    ]},
    {id:"icd_f06",code:"F06",term:"Gangguan mental lainnya akibat kerusakan dan disfungsi otak dan penyakit fisik",synonyms:["organik","halusinosis"],children:[
      {id:"icd_f060",code:"F06.0",term:"Halusinosis organik"},
      {id:"icd_f061",code:"F06.1",term:"Gangguan katatonik organik"},
      {id:"icd_f062",code:"F06.2",term:"Gangguan waham organik (lir-skizofrenia)"},
      {id:"icd_f063",code:"F06.3",term:"Gangguan suasana perasaan (mood [afektif]) organik"},
      {id:"icd_f064",code:"F06.4",term:"Gangguan anxietas organik"},
      {id:"icd_f065",code:"F06.5",term:"Gangguan disosiatif organik"},
      {id:"icd_f066",code:"F06.6",term:"Gangguan astenik organik"},
      {id:"icd_f067",code:"F06.7",term:"Gangguan kognitif ringan"},
      {id:"icd_f068",code:"F06.8",term:"Gangguan mental akibat kerusakan dan disfungsi otak dan penyakit fisik lain YDT"},
      {id:"icd_f069",code:"F06.9",term:"Gangguan mental akibat kerusakan dan disfungsi otak dan penyakit fisik YTT"}
    ]},
    {id:"icd_f07",code:"F07",term:"Gangguan kepribadian dan perilaku akibat penyakit, kerusakan dan disfungsi otak",synonyms:["kepribadian organik"],children:[
      {id:"icd_f070",code:"F07.0",term:"Gangguan kepribadian organik"},
      {id:"icd_f071",code:"F07.1",term:"Sindrom pasca-ensefalitis"},
      {id:"icd_f072",code:"F07.2",term:"Sindrom pasca-kontusio"},
      {id:"icd_f078",code:"F07.8",term:"Gangguan kepribadian dan perilaku organik akibat penyakit, kerusakan dan disfungsi otak lainnya"},
      {id:"icd_f079",code:"F07.9",term:"Gangguan kepribadian dan perilaku organik akibat penyakit, kerusakan dan disfungsi otak YTT"}
    ]},
    {id:"icd_f09",code:"F09",term:"Gangguan mental organik atau simtomatik YTT"}
  ]},
  {id:"icd_f1",code:"F10–F19",term:"Gangguan Mental dan Perilaku akibat Penggunaan Zat Psikoaktif",block:true,children:[
    {id:"icd_f10",code:"F10",term:"Gangguan mental dan perilaku akibat penggunaan alkohol",synonyms:["alkohol","alcohol"],children:[
      {id:"icd_f100",code:"F10.0",term:"Intoksikasi akut"},
      {id:"icd_f101",code:"F10.1",term:"Penggunaan yang merugikan (harmful)"},
      {id:"icd_f102",code:"F10.2",term:"Sindrom ketergantungan"},
      {id:"icd_f103",code:"F10.3",term:"Keadaan putus zat"},
      {id:"icd_f104",code:"F10.4",term:"Keadaan putus zat dengan delirium"},
      {id:"icd_f105",code:"F10.5",term:"Gangguan psikotik"},
      {id:"icd_f106",code:"F10.6",term:"Sindrom amnesik"},
      {id:"icd_f107",code:"F10.7",term:"Gangguan psikotik residual dan onset lambat"},
      {id:"icd_f108",code:"F10.8",term:"Gangguan mental dan perilaku lainnya"},
      {id:"icd_f109",code:"F10.9",term:"Gangguan mental dan perilaku YTT"}
    ]},
    {id:"icd_f11",code:"F11",term:"Gangguan mental dan perilaku akibat penggunaan opioida",synonyms:["opioid","heroin","morfin"]},
    {id:"icd_f12",code:"F12",term:"Gangguan mental dan perilaku akibat penggunaan kanabinoida",synonyms:["ganja","kanabis","cannabis"]},
    {id:"icd_f13",code:"F13",term:"Gangguan mental dan perilaku akibat penggunaan sedativa atau hipnotika",synonyms:["sedativa","hipnotika","benzodiazepin"]},
    {id:"icd_f14",code:"F14",term:"Gangguan mental dan perilaku akibat penggunaan kokain",synonyms:["kokain","cocaine"]},
    {id:"icd_f15",code:"F15",term:"Gangguan mental dan perilaku akibat penggunaan stimulansia lain termasuk kafein",synonyms:["stimulansia","amfetamin","kafein"]},
    {id:"icd_f16",code:"F16",term:"Gangguan mental dan perilaku akibat penggunaan halusinogenika",synonyms:["halusinogen","lsd"]},
    {id:"icd_f17",code:"F17",term:"Gangguan mental dan perilaku akibat penggunaan tembakau",synonyms:["nikotin","tembakau","rokok"]},
    {id:"icd_f18",code:"F18",term:"Gangguan mental dan perilaku akibat penggunaan pelarut yang mudah menguap",synonyms:["inhalan","pelarut"]},
    {id:"icd_f19",code:"F19",term:"Gangguan mental dan perilaku akibat penggunaan zat multipel dan penggunaan zat psikoaktif lainnya",synonyms:["zat multipel","napza"]}
  ]},
  {id:"icd_f2",code:"F20–F29",term:"Skizofrenia, Gangguan Skizotipal dan Gangguan Waham",block:true,children:[
    {id:"icd_f20",code:"F20",term:"Skizofrenia",synonyms:["skizofrenia","schizophrenia"],children:[
      {id:"icd_f200",code:"F20.0",term:"Skizofrenia paranoid"},
      {id:"icd_f201",code:"F20.1",term:"Skizofrenia hebefrenik"},
      {id:"icd_f202",code:"F20.2",term:"Skizofrenia katatonik"},
      {id:"icd_f203",code:"F20.3",term:"Skizofrenia tak terinci (undifferentiated)"},
      {id:"icd_f204",code:"F20.4",term:"Depresi pasca-skizofrenia"},
      {id:"icd_f205",code:"F20.5",term:"Skizofrenia residual"},
      {id:"icd_f206",code:"F20.6",term:"Skizofrenia simpleks"},
      {id:"icd_f208",code:"F20.8",term:"Skizofrenia lainnya"},
      {id:"icd_f209",code:"F20.9",term:"Skizofrenia YTT"}
    ]},
    {id:"icd_f21",code:"F21",term:"Gangguan skizotipal",synonyms:["skizotipal"]},
    {id:"icd_f22",code:"F22",term:"Gangguan waham menetap",synonyms:["waham","delusi"],children:[
      {id:"icd_f220",code:"F22.0",term:"Gangguan waham"},
      {id:"icd_f228",code:"F22.8",term:"Gangguan waham menetap lainnya"},
      {id:"icd_f229",code:"F22.9",term:"Gangguan waham menetap YTT"}
    ]},
    {id:"icd_f23",code:"F23",term:"Gangguan psikotik akut dan sementara",synonyms:["psikotik akut"],children:[
      {id:"icd_f230",code:"F23.0",term:"Gangguan psikotik polimorfik akut tanpa gejala skizofrenia"},
      {id:"icd_f231",code:"F23.1",term:"Gangguan psikotik polimorfik akut dengan gejala skizofrenia"},
      {id:"icd_f232",code:"F23.2",term:"Gangguan psikotik lir-skizofrenia (schizophrenia-like) akut"},
      {id:"icd_f233",code:"F23.3",term:"Gangguan psikotik akut lainnya dengan predominan waham"},
      {id:"icd_f238",code:"F23.8",term:"Gangguan psikotik akut dan sementara lainnya"},
      {id:"icd_f239",code:"F23.9",term:"Gangguan psikotik akut dan sementara YTT"}
    ]},
    {id:"icd_f24",code:"F24",term:"Gangguan waham terinduksi",synonyms:["induced","folie a deux"]},
    {id:"icd_f25",code:"F25",term:"Gangguan skizoafektif",synonyms:["skizoafektif"],children:[
      {id:"icd_f250",code:"F25.0",term:"Gangguan skizoafektif tipe manik"},
      {id:"icd_f251",code:"F25.1",term:"Gangguan skizoafektif tipe depresif"},
      {id:"icd_f252",code:"F25.2",term:"Gangguan skizoafektif tipe campuran"},
      {id:"icd_f258",code:"F25.8",term:"Gangguan skizoafektif lainnya"},
      {id:"icd_f259",code:"F25.9",term:"Gangguan skizoafektif YTT"}
    ]},
    {id:"icd_f28",code:"F28",term:"Gangguan psikotik nonorganik lainnya"},
    {id:"icd_f29",code:"F29",term:"Psikosis nonorganik YTT"}
  ]},
  {id:"icd_f3",code:"F30–F39",term:"Gangguan Suasana Perasaan (Mood [Afektif])",block:true,children:[
    {id:"icd_f30",code:"F30",term:"Episode manik",synonyms:["manik","mania"],children:[
      {id:"icd_f300",code:"F30.0",term:"Hipomania"},
      {id:"icd_f301",code:"F30.1",term:"Mania tanpa gejala psikotik"},
      {id:"icd_f302",code:"F30.2",term:"Mania dengan gejala psikotik"},
      {id:"icd_f308",code:"F30.8",term:"Episode manik lainnya"},
      {id:"icd_f309",code:"F30.9",term:"Episode manik YTT"}
    ]},
    {id:"icd_f31",code:"F31",term:"Gangguan afektif bipolar",synonyms:["bipolar"],children:[
      {id:"icd_f310",code:"F31.0",term:"Gangguan afektif bipolar, episode kini hipomanik"},
      {id:"icd_f311",code:"F31.1",term:"Gangguan afektif bipolar, episode kini manik tanpa gejala psikotik"},
      {id:"icd_f312",code:"F31.2",term:"Gangguan afektif bipolar, episode kini manik dengan gejala psikotik"},
      {id:"icd_f313",code:"F31.3",term:"Gangguan afektif bipolar, episode kini depresif ringan atau sedang"},
      {id:"icd_f314",code:"F31.4",term:"Gangguan afektif bipolar, episode kini depresif berat tanpa gejala psikotik"},
      {id:"icd_f315",code:"F31.5",term:"Gangguan afektif bipolar, episode kini depresif berat dengan gejala psikotik"},
      {id:"icd_f316",code:"F31.6",term:"Gangguan afektif bipolar, episode kini campuran"},
      {id:"icd_f317",code:"F31.7",term:"Gangguan afektif bipolar, kini dalam remisi"},
      {id:"icd_f318",code:"F31.8",term:"Gangguan afektif bipolar lainnya"},
      {id:"icd_f319",code:"F31.9",term:"Gangguan afektif bipolar YTT"}
    ]},
    {id:"icd_f32",code:"F32",term:"Episode depresif",synonyms:["depresi","depression"],children:[
      {id:"icd_f320",code:"F32.0",term:"Episode depresif ringan"},
      {id:"icd_f321",code:"F32.1",term:"Episode depresif sedang"},
      {id:"icd_f322",code:"F32.2",term:"Episode depresif berat tanpa gejala psikotik"},
      {id:"icd_f323",code:"F32.3",term:"Episode depresif berat dengan gejala psikotik"},
      {id:"icd_f328",code:"F32.8",term:"Episode depresif lainnya"},
      {id:"icd_f329",code:"F32.9",term:"Episode depresif YTT"}
    ]},
    {id:"icd_f33",code:"F33",term:"Gangguan depresif berulang",synonyms:["depresi berulang","recurrent"],children:[
      {id:"icd_f330",code:"F33.0",term:"Gangguan depresif berulang, episode kini ringan"},
      {id:"icd_f331",code:"F33.1",term:"Gangguan depresif berulang, episode kini sedang"},
      {id:"icd_f332",code:"F33.2",term:"Gangguan depresif berulang, episode kini berat tanpa gejala psikotik"},
      {id:"icd_f333",code:"F33.3",term:"Gangguan depresif berulang, episode kini berat dengan gejala psikotik"},
      {id:"icd_f334",code:"F33.4",term:"Gangguan depresif berulang, kini dalam remisi"},
      {id:"icd_f338",code:"F33.8",term:"Gangguan depresif berulang lainnya"},
      {id:"icd_f339",code:"F33.9",term:"Gangguan depresif berulang YTT"}
    ]},
    {id:"icd_f34",code:"F34",term:"Gangguan suasana perasaan (mood [afektif]) menetap",synonyms:["siklotimia","distimia"],children:[
      {id:"icd_f340",code:"F34.0",term:"Siklotimia"},
      {id:"icd_f341",code:"F34.1",term:"Distimia"},
      {id:"icd_f348",code:"F34.8",term:"Gangguan suasana perasaan (mood [afektif]) menetap lainnya"},
      {id:"icd_f349",code:"F34.9",term:"Gangguan suasana perasaan (mood [afektif]) menetap YTT"}
    ]},
    {id:"icd_f38",code:"F38",term:"Gangguan suasana perasaan (mood [afektif]) lainnya"},
    {id:"icd_f39",code:"F39",term:"Gangguan suasana perasaan (mood [afektif]) YTT"}
  ]},
  {id:"icd_f4",code:"F40–F48",term:"Gangguan Neurotik, Gangguan Somatoform dan Gangguan yang Berkaitan dengan Stres",block:true,children:[
    {id:"icd_f40",code:"F40",term:"Gangguan anxietas fobik",synonyms:["fobia","agorafobia","phobia"],children:[
      {id:"icd_f400",code:"F40.0",term:"Agorafobia"},
      {id:"icd_f401",code:"F40.1",term:"Fobia sosial"},
      {id:"icd_f402",code:"F40.2",term:"Fobia khas (terisolasi)"},
      {id:"icd_f408",code:"F40.8",term:"Gangguan anxietas fobik lainnya"},
      {id:"icd_f409",code:"F40.9",term:"Gangguan anxietas fobik YTT"}
    ]},
    {id:"icd_f41",code:"F41",term:"Gangguan anxietas lainnya",synonyms:["anxietas","cemas","anxiety","panik"],children:[
      {id:"icd_f410",code:"F41.0",term:"Gangguan panik (anxietas paroksismal episodik)"},
      {id:"icd_f411",code:"F41.1",term:"Gangguan anxietas menyeluruh"},
      {id:"icd_f412",code:"F41.2",term:"Gangguan campuran anxietas dan depresif"},
      {id:"icd_f413",code:"F41.3",term:"Gangguan anxietas campuran lainnya"},
      {id:"icd_f418",code:"F41.8",term:"Gangguan anxietas lainnya YDT"},
      {id:"icd_f419",code:"F41.9",term:"Gangguan anxietas YTT"}
    ]},
    {id:"icd_f42",code:"F42",term:"Gangguan obsesif-kompulsif",synonyms:["ocd","obsesif","kompulsif"],children:[
      {id:"icd_f420",code:"F42.0",term:"Predominan pikiran obsesional atau pengulangan"},
      {id:"icd_f421",code:"F42.1",term:"Predominan tindakan kompulsif [obsessional ritual]"},
      {id:"icd_f422",code:"F42.2",term:"Campuran tindakan dan pikiran obsesional"},
      {id:"icd_f428",code:"F42.8",term:"Gangguan obsesif-kompulsif lainnya"},
      {id:"icd_f429",code:"F42.9",term:"Gangguan obsesif-kompulsif YTT"}
    ]},
    {id:"icd_f43",code:"F43",term:"Reaksi terhadap stres berat dan gangguan penyesuaian",synonyms:["stres","ptsd","penyesuaian","trauma"],children:[
      {id:"icd_f430",code:"F43.0",term:"Reaksi stres akut"},
      {id:"icd_f431",code:"F43.1",term:"Gangguan stres pasca-trauma"},
      {id:"icd_f432",code:"F43.2",term:"Gangguan penyesuaian"},
      {id:"icd_f438",code:"F43.8",term:"Reaksi terhadap stres berat lainnya"},
      {id:"icd_f439",code:"F43.9",term:"Reaksi terhadap stres berat YTT"}
    ]},
    {id:"icd_f44",code:"F44",term:"Gangguan disosiatif [konversi]",synonyms:["disosiatif","konversi","kesurupan"],children:[
      {id:"icd_f440",code:"F44.0",term:"Amnesia disosiatif"},
      {id:"icd_f441",code:"F44.1",term:"Fugue disosiatif"},
      {id:"icd_f442",code:"F44.2",term:"Stupor disosiatif"},
      {id:"icd_f443",code:"F44.3",term:"Gangguan trans dan kesurupan"},
      {id:"icd_f444",code:"F44.4",term:"Gangguan motorik disosiatif"},
      {id:"icd_f445",code:"F44.5",term:"Konvulsi disosiatif"},
      {id:"icd_f446",code:"F44.6",term:"Anestesia dan kehilangan sensorik disosiatif"},
      {id:"icd_f447",code:"F44.7",term:"Gangguan disosiatif [konversi] campuran"},
      {id:"icd_f448",code:"F44.8",term:"Gangguan disosiatif [konversi] lainnya"},
      {id:"icd_f449",code:"F44.9",term:"Gangguan disosiatif [konversi] YTT"}
    ]},
    {id:"icd_f45",code:"F45",term:"Gangguan somatoform",synonyms:["somatoform","somatisasi","hipokondrik"],children:[
      {id:"icd_f450",code:"F45.0",term:"Gangguan somatisasi"},
      {id:"icd_f451",code:"F45.1",term:"Gangguan somatoform tak terinci"},
      {id:"icd_f452",code:"F45.2",term:"Gangguan hipokondrik"},
      {id:"icd_f453",code:"F45.3",term:"Disfungsi otonomik somatoform"},
      {id:"icd_f454",code:"F45.4",term:"Gangguan nyeri somatoform menetap"},
      {id:"icd_f458",code:"F45.8",term:"Gangguan somatoform lainnya"},
      {id:"icd_f459",code:"F45.9",term:"Gangguan somatoform YTT"}
    ]},
    {id:"icd_f48",code:"F48",term:"Gangguan neurotik lainnya",synonyms:["neurastenia","depersonalisasi"],children:[
      {id:"icd_f480",code:"F48.0",term:"Neurastenia"},
      {id:"icd_f481",code:"F48.1",term:"Sindrom depersonalisasi-derealisasi"},
      {id:"icd_f488",code:"F48.8",term:"Gangguan neurotik lainnya YDT"},
      {id:"icd_f489",code:"F48.9",term:"Gangguan neurotik YTT"}
    ]}
  ]},
  {id:"icd_f5",code:"F50–F59",term:"Sindrom Perilaku yang Berhubungan dengan Gangguan Fisiologis dan Faktor Fisik",block:true,children:[
    {id:"icd_f50",code:"F50",term:"Gangguan makan",synonyms:["anoreksia","bulimia","makan"],children:[
      {id:"icd_f500",code:"F50.0",term:"Anoreksia nervosa"},
      {id:"icd_f501",code:"F50.1",term:"Anoreksia nervosa tak khas"},
      {id:"icd_f502",code:"F50.2",term:"Bulimia nervosa"},
      {id:"icd_f503",code:"F50.3",term:"Bulimia nervosa tak khas"},
      {id:"icd_f504",code:"F50.4",term:"Makan berlebih yang berhubungan dengan gangguan psikologis lainnya"},
      {id:"icd_f505",code:"F50.5",term:"Muntah yang berhubungan dengan gangguan psikologis lainnya"},
      {id:"icd_f508",code:"F50.8",term:"Gangguan makan lainnya"},
      {id:"icd_f509",code:"F50.9",term:"Gangguan makan YTT"}
    ]},
    {id:"icd_f51",code:"F51",term:"Gangguan tidur nonorganik",synonyms:["insomnia","tidur","hipersomnia"],children:[
      {id:"icd_f510",code:"F51.0",term:"Insomnia nonorganik"},
      {id:"icd_f511",code:"F51.1",term:"Hipersomnia nonorganik"},
      {id:"icd_f512",code:"F51.2",term:"Gangguan jadwal tidur nonorganik"},
      {id:"icd_f513",code:"F51.3",term:"Somnambulisme (berjalan sambil tidur [ngelindur])"},
      {id:"icd_f514",code:"F51.4",term:"Teror tidur [teror malam (night terror)]"},
      {id:"icd_f515",code:"F51.5",term:"Mimpi buruk [nightmare]"},
      {id:"icd_f518",code:"F51.8",term:"Gangguan tidur nonorganik lainnya"},
      {id:"icd_f519",code:"F51.9",term:"Gangguan tidur nonorganik YTT"}
    ]},
    {id:"icd_f52",code:"F52",term:"Disfungsi seksual, bukan disebabkan oleh gangguan atau penyakit organik",synonyms:["disfungsi seksual"]},
    {id:"icd_f53",code:"F53",term:"Gangguan jiwa dan perilaku yang berhubungan dengan masa nifas YTK",synonyms:["nifas","postpartum"]},
    {id:"icd_f54",code:"F54",term:"Faktor psikologis dan perilaku yang berhubungan dengan gangguan atau penyakit YDK"},
    {id:"icd_f55",code:"F55",term:"Penyalahgunaan zat yang tidak menyebabkan ketergantungan",synonyms:["penyalahgunaan"]},
    {id:"icd_f59",code:"F59",term:"Sindrom perilaku YTT yang berhubungan dengan gangguan fisiologis dan faktor fisik"}
  ]},
  {id:"icd_f6",code:"F60–F69",term:"Gangguan Kepribadian dan Perilaku Masa Dewasa",block:true,children:[
    {id:"icd_f60",code:"F60",term:"Gangguan kepribadian khas",synonyms:["kepribadian","personality"],children:[
      {id:"icd_f600",code:"F60.0",term:"Gangguan kepribadian paranoid"},
      {id:"icd_f601",code:"F60.1",term:"Gangguan kepribadian skizoid"},
      {id:"icd_f602",code:"F60.2",term:"Gangguan kepribadian dissosial"},
      {id:"icd_f603",code:"F60.3",term:"Gangguan kepribadian emosional tak stabil"},
      {id:"icd_f604",code:"F60.4",term:"Gangguan kepribadian histrionik"},
      {id:"icd_f605",code:"F60.5",term:"Gangguan kepribadian anankastik"},
      {id:"icd_f606",code:"F60.6",term:"Gangguan kepribadian cemas (menghindar)"},
      {id:"icd_f607",code:"F60.7",term:"Gangguan kepribadian dependen"},
      {id:"icd_f608",code:"F60.8",term:"Gangguan kepribadian khas lainnya"},
      {id:"icd_f609",code:"F60.9",term:"Gangguan kepribadian YTT"}
    ]},
    {id:"icd_f61",code:"F61",term:"Gangguan kepribadian campuran dan lainnya"},
    {id:"icd_f62",code:"F62",term:"Perubahan kepribadian yang berlangsung lama yang tidak diakibatkan oleh kerusakan atau penyakit otak"},
    {id:"icd_f63",code:"F63",term:"Gangguan kebiasaan dan impuls",synonyms:["judi","kleptomania","piromania","trikotilomania"],children:[
      {id:"icd_f630",code:"F63.0",term:"Judi patologis"},
      {id:"icd_f631",code:"F63.1",term:"Bakar patologis (piromania)"},
      {id:"icd_f632",code:"F63.2",term:"Curi patologis (kleptomania)"},
      {id:"icd_f633",code:"F63.3",term:"Trikotilomania"},
      {id:"icd_f638",code:"F63.8",term:"Gangguan kebiasaan dan impuls lainnya"},
      {id:"icd_f639",code:"F63.9",term:"Gangguan kebiasaan dan impuls YTT"}
    ]},
    {id:"icd_f64",code:"F64",term:"Gangguan identitas jenis kelamin",synonyms:["transseksual","identitas kelamin"]},
    {id:"icd_f65",code:"F65",term:"Gangguan preferensi seksual",synonyms:["parafilia","fetishisme"]},
    {id:"icd_f66",code:"F66",term:"Gangguan psikologis dan perilaku yang berhubungan dengan perkembangan dan orientasi seksual"},
    {id:"icd_f68",code:"F68",term:"Gangguan kepribadian dan perilaku masa dewasa lainnya"},
    {id:"icd_f69",code:"F69",term:"Gangguan kepribadian dan perilaku masa dewasa YTT"}
  ]},
  {id:"icd_f7",code:"F70–F79",term:"Retardasi Mental",block:true,children:[
    {id:"icd_f70",code:"F70",term:"Retardasi mental ringan",synonyms:["retardasi","disabilitas intelektual"]},
    {id:"icd_f71",code:"F71",term:"Retardasi mental sedang"},
    {id:"icd_f72",code:"F72",term:"Retardasi mental berat"},
    {id:"icd_f73",code:"F73",term:"Retardasi mental sangat berat"},
    {id:"icd_f78",code:"F78",term:"Retardasi mental lainnya"},
    {id:"icd_f79",code:"F79",term:"Retardasi mental YTT"}
  ]},
  {id:"icd_f8",code:"F80–F89",term:"Gangguan Perkembangan Psikologis",block:true,children:[
    {id:"icd_f80",code:"F80",term:"Gangguan perkembangan khas berbicara dan berbahasa",synonyms:["bicara","bahasa"]},
    {id:"icd_f81",code:"F81",term:"Gangguan perkembangan belajar khas",synonyms:["belajar","disleksia","membaca"]},
    {id:"icd_f82",code:"F82",term:"Gangguan perkembangan motorik khas"},
    {id:"icd_f83",code:"F83",term:"Gangguan perkembangan khas campuran"},
    {id:"icd_f84",code:"F84",term:"Gangguan perkembangan pervasif",synonyms:["autisme","asperger","pervasif","rett"],children:[
      {id:"icd_f840",code:"F84.0",term:"Autisme masa kanak"},
      {id:"icd_f841",code:"F84.1",term:"Autisme tak khas"},
      {id:"icd_f842",code:"F84.2",term:"Sindrom Rett"},
      {id:"icd_f843",code:"F84.3",term:"Gangguan disintegratif masa kanak lainnya"},
      {id:"icd_f844",code:"F84.4",term:"Gangguan aktivitas berlebih yang berhubungan dengan retardasi mental dan gerakan stereotipik"},
      {id:"icd_f845",code:"F84.5",term:"Sindrom Asperger"},
      {id:"icd_f848",code:"F84.8",term:"Gangguan perkembangan pervasif lainnya"},
      {id:"icd_f849",code:"F84.9",term:"Gangguan perkembangan pervasif YTT"}
    ]},
    {id:"icd_f88",code:"F88",term:"Gangguan perkembangan psikologis lainnya"},
    {id:"icd_f89",code:"F89",term:"Gangguan perkembangan psikologis YTT"}
  ]},
  {id:"icd_f9",code:"F90–F98",term:"Gangguan Perilaku dan Emosional dengan Onset Biasanya pada Masa Kanak dan Remaja",block:true,children:[
    {id:"icd_f90",code:"F90",term:"Gangguan hiperkinetik",synonyms:["adhd","hiperkinetik","hiperaktif"],children:[
      {id:"icd_f900",code:"F90.0",term:"Gangguan aktivitas dan perhatian"},
      {id:"icd_f901",code:"F90.1",term:"Gangguan tingkah laku hiperkinetik"},
      {id:"icd_f908",code:"F90.8",term:"Gangguan hiperkinetik lainnya"},
      {id:"icd_f909",code:"F90.9",term:"Gangguan hiperkinetik YTT"}
    ]},
    {id:"icd_f91",code:"F91",term:"Gangguan tingkah laku",synonyms:["tingkah laku","conduct"]},
    {id:"icd_f92",code:"F92",term:"Gangguan campuran tingkah laku dan emosi"},
    {id:"icd_f93",code:"F93",term:"Gangguan emosional dengan onset khas pada masa kanak",synonyms:["anxietas perpisahan","emosional kanak"]},
    {id:"icd_f94",code:"F94",term:"Gangguan fungsi sosial dengan onset khas pada masa kanak dan remaja",synonyms:["mutisme elektif"]},
    {id:"icd_f95",code:"F95",term:"Gangguan \"tic\"",synonyms:["tic","tourette"]},
    {id:"icd_f98",code:"F98",term:"Gangguan perilaku dan emosional lainnya dengan onset biasanya pada masa kanak dan remaja",synonyms:["enuresis","enkopresis","gagap","stuttering"]}
  ]},
  {id:"icd_f99",code:"F99",term:"Gangguan Jiwa YTT",block:true,children:[]}
];
