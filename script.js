// Veri havuzu
const takimlar = [
    { ad: "BEŞİKTAŞ", src: "images/besiktas.png",sampiyonluk: 16 , stad:"İnönü"},
    { ad: "FENERBAHÇE", src: "images/fenerbahce.png" ,sampiyonluk: 19,stad:"Saraçoğlu"},
    { ad: "GALATASARAY", src: "images/galatasaray.png", sampiyonluk: 23,stad:"Ali Sami Yen"},
    { ad: "TRABZONSPOR", src: "images/trabzonspor.png", sampiyonluk: 7, stad:"Avni Aker" },
];

// Sık kullanılan HTML nesneleri
const takimImg = document.getElementById("takim");
const btnBasla = document.getElementById("btnBasla");
const soru = document.getElementById("soru");
const secenekler = document.getElementById("secenekler");
const sonuc = document.getElementById("sonuc");
const dogruSayac = document.getElementById("dogruSayac");
const yanlisSayac = document.getElementById("yanlisSayac");

// Değişkenler
let dogruCevaplar = 0;
let yanlisCevaplar = 0;
let soruIndex = 0;

// Olay dinleyicisi
btnBasla.addEventListener("click", yaris);

// Fonksiyon tanımı
function yaris() {
    if (soruIndex >= takimlar.length) {
        sonuc.innerHTML = "Yarışma sona erdi! Toplam doğru cevap: " + dogruCevaplar + ", Toplam yanlış cevap: " + yanlisCevaplar;
        btnBasla.disabled = true;
        return;
    }

    soru.innerHTML = "";
    secenekler.innerHTML = "";

    let rastgeleTakimIndex = soruIndex;
    let dogruCevap = takimlar[rastgeleTakimIndex].sampiyonluk;

    takimImg.src = takimlar[rastgeleTakimIndex].src;
    soru.innerHTML = takimlar[rastgeleTakimIndex].ad + " kaç kez şampiyon olmuştur?";
    soruIndex++;

    // Cevap seçeneklerini döngüyle oluştur
    for (let i = 0; i < 3; i++) {
        const secenek = document.createElement("button");
        secenek.classList.add("secenek");
        
        // Doğru cevap dışında rastgele cevaplar oluştur
        let rastgeleCevap = dogruCevap;
        while (rastgeleCevap === dogruCevap) {
            rastgeleCevap = dogruCevap + Math.floor(Math.random() * 4) - 2;
        }
        secenek.innerHTML = rastgeleCevap;

        secenek.addEventListener("click", function() {
            if (parseInt(this.innerHTML) === dogruCevap) {
                sonuc.innerHTML = "Tebrikler, doğru cevap!";
                dogruCevaplar++;
                dogruSayac.innerHTML = dogruCevaplar;
            } else {
                sonuc.innerHTML = "Maalesef, yanlış cevap!";
                yanlisCevaplar++;
                yanlisSayac.innerHTML = yanlisCevaplar;
            }
            btnBasla.disabled = false;
        });
        secenekler.appendChild(secenek);
    }

    // Doğru cevabı içeren bir buton oluştur
    const dogruSecenek = document.createElement("button");
    dogruSecenek.classList.add("secenek");
    dogruSecenek.innerHTML = dogruCevap;
    dogruSecenek.addEventListener("click", function() {
        sonuc.innerHTML = "Tebrikler, doğru cevap!";
        dogruCevaplar++;
        dogruSayac.innerHTML = dogruCevaplar;
        btnBasla.disabled = false;
    });
    secenekler.appendChild(dogruSecenek);
}
