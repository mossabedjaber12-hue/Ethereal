async function getIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    document.getElementById('ipDisplay').textContent = data.ip;
  } catch {
    document.getElementById('ipDisplay').textContent = '--.--.--.--';
  }
}
getIP();

// ===== DOM ELEMENTS =====
const goBtn = document.getElementById('goBtn');
const statusText = document.getElementById('statusText');
const dots = document.querySelectorAll('.dot');
const pingEl = document.getElementById('pingValue');
const downloadEl = document.getElementById('downloadValue');
const uploadEl = document.getElementById('uploadValue');
const serverInfo = document.getElementById('serverInfo');
const speedBarFill = document.getElementById('speedBarFill');
const speedBarValue = document.getElementById('speedBarValue');
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langLabel = document.getElementById('langLabel');

// ===== MENU ELEMENTS =====
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');

let isTesting = false;
let lang = 'en';

// ===== TRANSLATIONS =====
const translations = {
  en: { ping: 'Ping', download: 'Download', upload: 'Upload', ready: 'Ready', connecting: 'Connecting...', pingTest: 'Measuring ping...', dlTest: 'Testing download...', ulTest: 'Testing upload...', complete: 'Test complete', clickGo: 'Click GO to start', connected: 'Connected', completeTime: 'Complete', error: 'Error', failed: 'Test failed.' },
  ar: { ping: 'الانصالات', download: 'متفقد', upload: 'مفرد', ready: 'جاهز', connecting: 'جاري الاتصال...', pingTest: 'قياس الانصالات...', dlTest: 'اختبار التحميل...', ulTest: 'اختبار الرفع...', complete: 'اكتمل الاختبار', clickGo: 'اضغط GO للبدء', connected: 'متصل', completeTime: 'اكتمل', error: 'خطأ', failed: 'فشل الاختبار.' },
  fr: { ping: 'Ping', download: 'Téléchargement', upload: 'Téléversement', ready: 'Prêt', connecting: 'Connexion...', pingTest: 'Mesure du ping...', dlTest: 'Test de téléchargement...', ulTest: "Test d'envoi...", complete: 'Test terminé', clickGo: 'Cliquez sur GO', connected: 'Connecté', completeTime: 'Terminé', error: 'Erreur', failed: 'Échec du test.' },
  es: { ping: 'Ping', download: 'Descarga', upload: 'Subida', ready: 'Listo', connecting: 'Conectando...', pingTest: 'Midiendo ping...', dlTest: 'Probando descarga...', ulTest: 'Probando subida...', complete: 'Prueba completa', clickGo: 'Haz clic en GO', connected: 'Conectado', completeTime: 'Completado', error: 'Error', failed: 'Prueba fallida.' },
  de: { ping: 'Ping', download: 'Download', upload: 'Upload', ready: 'Bereit', connecting: 'Verbinde...', pingTest: 'Ping wird gemessen...', dlTest: 'Download-Test...', ulTest: 'Upload-Test...', complete: 'Test abgeschlossen', clickGo: 'Klicke auf GO', connected: 'Verbunden', completeTime: 'Abgeschlossen', error: 'Fehler', failed: 'Test fehlgeschlagen.' },
  ja: { ping: 'ピング', download: 'ダウンロード', upload: 'アップロード', ready: '準備完了', connecting: '接続中...', pingTest: 'ピング測定中...', dlTest: 'ダウンロードテスト中...', ulTest: 'アップロードテスト中...', complete: 'テスト完了', clickGo: 'GOをクリック', connected: '接続済み', completeTime: '完了', error: 'エラー', failed: 'テスト失敗。' },
  zh: { ping: '延迟', download: '下载', upload: '上传', ready: '就绪', connecting: '连接中...', pingTest: '测量延迟...', dlTest: '测试下载...', ulTest: '测试上传...', complete: '测试完成', clickGo: '点击 GO', connected: '已连接', completeTime: '完成', error: '错误', failed: '测试失败。' },
  ru: { ping: 'Пинг', download: 'Загрузка', upload: 'Отправка', ready: 'Готов', connecting: 'Подключение...', pingTest: 'Измерение пинга...', dlTest: 'Тест загрузки...', ulTest: 'Тест отправки...', complete: 'Тест завершён', clickGo: 'Нажмите GO', connected: 'Подключено', completeTime: 'Завершено', error: 'Ошибка', failed: 'Тест не удался.' },
  hi: { ping: 'पिंग', download: 'डाउनलोड', upload: 'अपलोड', ready: 'तैयार', connecting: 'कनेक्ट हो रहा है...', pingTest: 'पिंग माप रहा है...', dlTest: 'डाउनलोड टेस्ट...', ulTest: 'अपलोड टेस्ट...', complete: 'टेस्ट पूरा हुआ', clickGo: 'GO क्लिक करें', connected: 'कनेक्टेड', completeTime: 'पूरा हुआ', error: 'त्रुटि', failed: 'टेस्ट विफल।' },
  tr: { ping: 'Ping', download: 'İndirme', upload: 'Yükleme', ready: 'Hazır', connecting: 'Bağlanıyor...', pingTest: 'Ping ölçülüyor...', dlTest: 'İndirme testi...', ulTest: 'Yükleme testi...', complete: 'Test tamamlandı', clickGo: 'Başlamak için GO', connected: 'Bağlandı', completeTime: 'Tamamlandı', error: 'Hata', failed: 'Test başarısız.' }
};

const langNames = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  fr: { name: 'Français', flag: '🇫🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  tr: { name: 'Türkçe', flag: '🇹🇷' }
};

function t(key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}

function updateUI() {
  document.getElementById('pingLabel').textContent = t('ping');
  document.getElementById('downloadLabel').textContent = t('download');
  document.getElementById('uploadLabel').textContent = t('upload');
  if (!isTesting) {
    statusText.textContent = t('ready');
    serverInfo.innerHTML = `<span>${t('clickGo')}</span>`;
    speedBarFill.style.width = '0%';
    speedBarValue.textContent = '0.0 Mbps';
  }
}

// ===== LANGUAGE DROPDOWN =====
langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});
document.addEventListener('click', () => {
  langDropdown.classList.remove('open');
});

function buildLanguageOptions() {
  const dropdown = document.getElementById('langDropdown');
  dropdown.innerHTML = '';
  Object.keys(langNames).forEach(code => {
    const btn = document.createElement('button');
    btn.className = 'lang-option';
    btn.dataset.lang = code;
    btn.innerHTML = `<span class="flag">${langNames[code].flag}</span> ${langNames[code].name}`;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      lang = code;
      langLabel.textContent = langNames[code].name;
      langDropdown.classList.remove('open');
      updateUI();
    });
    dropdown.appendChild(btn);
  });
}
buildLanguageOptions();

// ===== MENU DROPDOWN =====
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menuDropdown.classList.toggle('open');
});
document.addEventListener('click', () => {
  menuDropdown.classList.remove('open');
});
menuDropdown.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ===== SPEED BAR =====
function updateSpeedBar(speed) {
  const percent = Math.min((speed / 200) * 100, 100);
  speedBarFill.style.width = percent + '%';
  speedBarValue.textContent = speed.toFixed(1) + ' Mbps';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function revealResult(element, value) {
  element.textContent = value;
  element.className = 'result-value done';
  const parent = element.closest('.result-item');
  parent.classList.remove('reveal');
  void parent.offsetWidth;
  parent.classList.add('reveal');
}

function resetResult(element) {
  element.textContent = '--';
  element.className = 'result-value';
  const parent = element.closest('.result-item');
  parent.classList.remove('reveal');
}

// ===== REAL PING TEST =====
async function measureRealPing() {
  const pingCount = 5;
  const pings = [];
  
  for (let i = 0; i < pingCount; i++) {
    try {
      const start = performance.now();
      await fetch('https://www.cloudflare.com/cdn-cgi/trace', { 
        cache: 'no-store',
        signal: AbortSignal.timeout(5000)
      });
      const end = performance.now();
      pings.push(end - start);
    } catch (e) {}
    await sleep(200);
  }
  
  if (pings.length === 0) return 999;
  pings.sort((a, b) => a - b);
  const trimmed = pings.slice(1, pings.length - 1);
  const avg = trimmed.length > 0 
    ? trimmed.reduce((a, b) => a + b, 0) / trimmed.length 
    : pings.reduce((a, b) => a + b, 0) / pings.length;
  
  return Math.round(avg);
}

// ===== GENERATE RANDOM DATA FAST =====
function generateRandomData(size) {
  const buffer = new Uint8Array(size);
  const chunkSize = 65536;
  for (let i = 0; i < size; i += chunkSize) {
    const end = Math.min(i + chunkSize, size);
    const chunk = new Uint8Array(end - i);
    crypto.getRandomValues(chunk);
    buffer.set(chunk, i);
  }
  return buffer;
}

// ===== REAL SPEED TEST =====
async function runSpeedTest() {
  if (isTesting) return;
  isTesting = true;

  goBtn.classList.add('testing');
  speedBarFill.style.width = '0%';
  speedBarValue.textContent = '0.0 Mbps';

  document.querySelectorAll('.result-item').forEach(item => item.classList.remove('reveal'));
  resetResult(pingEl);
  resetResult(downloadEl);
  resetResult(uploadEl);

  serverInfo.textContent = t('connecting');
  serverInfo.className = 'server-info active';
  statusText.textContent = t('connecting');
  statusText.className = 'status-text active';
  dots.forEach(d => d.classList.add('active'));

  try {
    // ===== PING =====
    statusText.textContent = t('pingTest');
    const ping = await measureRealPing();
    await sleep(300);
    await revealResult(pingEl, ping);
    serverInfo.textContent = `${t('connected')} (${ping}ms)`;

    // ===== DOWNLOAD =====
    statusText.textContent = t('dlTest');
    resetResult(downloadEl);
    downloadEl.className = 'result-value loading';
    
    const dlSize = 50000000;
    const dlStart = performance.now();
    const dlRes = await fetch(`https://speed.cloudflare.com/__down?bytes=${dlSize}`, { cache: 'no-store' });
    const dlData = await dlRes.arrayBuffer();
    const dlTime = (performance.now() - dlStart) / 1000;
    const dlMbps = parseFloat(((dlData.byteLength * 8) / dlTime / 1000000).toFixed(2));
    
    let dlVal = 0;
    const dlSteps = 60;
    for (let i = 0; i <= dlSteps; i++) {
      const progress = i / dlSteps;
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const wave = Math.sin(progress * Math.PI * 6 + 0.5) * 0.06;
      const target = dlMbps * eased * (1 + wave);
      dlVal = Math.min(Math.max(target, 0), dlMbps * 1.05);
      updateSpeedBar(dlVal);
      downloadEl.textContent = dlVal.toFixed(1);
      await sleep(167);
    }
    await revealResult(downloadEl, dlMbps.toFixed(2));
    serverInfo.textContent = `${t('download')}: ${dlMbps.toFixed(2)} Mbps`;

    // ===== UPLOAD =====
    statusText.textContent = t('ulTest');
    resetResult(uploadEl);
    uploadEl.className = 'result-value loading';
    
    const uploadSize = 5000000;
    const uploadData = generateRandomData(uploadSize);
    
    const ulStart = performance.now();
    await fetch('https://speed.cloudflare.com/__up', {
      method: 'POST',
      body: uploadData,
      cache: 'no-store',
      headers: { 'Content-Type': 'application/octet-stream' }
    });
    const ulTime = (performance.now() - ulStart) / 1000;
    const ulMbps = parseFloat(((uploadSize * 8) / ulTime / 1000000).toFixed(2));
    
    let ulVal = 0;
    const ulSteps = 60;
    for (let i = 0; i <= ulSteps; i++) {
      const progress = i / ulSteps;
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const wave = Math.sin(progress * Math.PI * 5 + 1.2) * 0.06;
      const target = ulMbps * eased * (1 + wave);
      ulVal = Math.min(Math.max(target, 0), ulMbps * 1.05);
      updateSpeedBar(ulVal);
      uploadEl.textContent = ulVal.toFixed(1);
      await sleep(167);
    }
    await revealResult(uploadEl, ulMbps.toFixed(2));

    // ===== COMPLETE =====
    statusText.textContent = t('complete');
    statusText.className = 'status-text';
    serverInfo.textContent = `${t('completeTime')} — ${new Date().toLocaleTimeString()}`;
    serverInfo.className = 'server-info';

    await sleep(1500);
    speedBarFill.style.width = '0%';
    speedBarValue.textContent = '0.0 Mbps';

  } catch (err) {
    console.error('Speed test error:', err);
    statusText.textContent = t('error');
    statusText.className = 'status-text';
    serverInfo.textContent = t('failed');
    serverInfo.className = 'server-info';
    pingEl.textContent = 'ERR';
    downloadEl.textContent = 'ERR';
    uploadEl.textContent = 'ERR';
    pingEl.className = 'result-value';
    downloadEl.className = 'result-value';
    uploadEl.className = 'result-value';
    speedBarFill.style.width = '0%';
    speedBarValue.textContent = '0.0 Mbps';
  }

  goBtn.classList.remove('testing');
  dots.forEach(d => d.classList.remove('active'));
  isTesting = false;
}

// ===== GO BUTTON =====
goBtn.addEventListener('click', function() {
  this.style.transform = 'scale(0.88)';
  setTimeout(() => {
    this.style.transform = '';
  }, 120);
  runSpeedTest();
});

// ===== TOP BUTTONS =====
document.querySelectorAll('.top-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    if (this.id === 'langToggle' || this.id === 'menuBtn') return;
    this.style.transform = 'scale(0.92)';
    setTimeout(() => {
      this.style.transform = '';
    }, 120);
  });
});

// ===== INIT =====
updateUI();
console.log('ETH Test loaded — full version');