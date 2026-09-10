import React, { useState, useEffect } from "react";

/* ============================================================
   ЗЕРКАЛО
   Разбор внешности по нескольким системам типирования.
   Тема: клиническая карточка, много воздуха, волосяные линейки.
   ============================================================ */

// Адрес вашего сервера рендера. Ключ Google живёт там, не здесь.
const TRYON_API = "https://zerkalo-tryon.onrender.com";

const CSS = `
.zk{--paper:#F5F4F1;--card:#FFFFFF;--ink:#12173A;--mut:#5B5F73;--faint:#9296A6;
 --rule:#E4E3E0;--navy:#12173A;--pink:#EF1F8C;--blue:#3D5AFE;--lime:#D6E552;--rose:#C23D6B;
 --ss:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
 background:var(--paper);color:var(--ink);font-family:var(--ss);min-height:100vh;
 -webkit-font-smoothing:antialiased}
.zk *{box-sizing:border-box}
.zk-w{max-width:460px;margin:0 auto;padding:0 16px 90px}
.zk-top{display:flex;align-items:center;justify-content:space-between;position:relative;
 animation:glowpulse 3.4s ease-in-out infinite;
 background:var(--navy);color:#fff;border-radius:18px;padding:16px 20px;margin:14px 0 18px}
.zk-logo{font-size:19px;font-weight:800;letter-spacing:.02em;text-transform:uppercase;
 background:linear-gradient(100deg,#fff 0%,var(--lime) 22%,var(--pink) 48%,#fff 72%,var(--blue) 100%);
 background-size:260% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
 animation:shine 4.5s ease-in-out infinite}
.zk-meta{font-size:10px;color:rgba(255,255,255,.55);letter-spacing:.08em;text-transform:uppercase}
.zk-hero{background:var(--navy);color:#fff;border-radius:22px;padding:30px 22px 26px;margin-bottom:14px}
.zk-h1{font-size:32px;line-height:1.08;font-weight:800;letter-spacing:-.01em;
 text-transform:uppercase;margin:0 0 14px}
.zk-h2{font-size:20px;line-height:1.2;font-weight:800;margin:0 0 8px}
.zk-p{color:var(--mut);font-size:14.5px;line-height:1.68}
.zk-hero .zk-p{color:rgba(255,255,255,.72)}
.zk-btn{display:block;width:100%;padding:16px;border:none;border-radius:100px;background:var(--pink);
 color:#fff;font-size:14.5px;font-weight:700;font-family:var(--ss);cursor:pointer;text-align:center}
.zk-btn2{background:rgba(255,255,255,.1);color:#fff}
.zk-btn3{background:var(--ink);color:#fff}
.zk-file{position:relative;overflow:hidden}
.zk-file input{position:absolute;inset:0;width:100%;height:100%;opacity:0;font-size:0;cursor:pointer}
.zk-btn:focus-visible,.zk-file:focus-within,.zk-tab:focus-visible,.zk-chip:focus-visible{
 outline:2px solid var(--blue);outline-offset:2px}
.zk-shot{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;border-radius:18px}

/* карточка-показатель */
.zk-read{background:var(--card);border-radius:16px;padding:18px 18px 16px;margin-bottom:10px}
.zk-key{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.06em;
 color:#fff;background:var(--blue);border-radius:100px;padding:4px 10px;margin:0 0 9px;text-transform:uppercase}
.zk-val{font-size:19px;font-weight:800;line-height:1.26;margin:0 0 7px}
.zk-sub{color:var(--mut);font-size:13.5px;line-height:1.6;margin:0}

.zk-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.zk-tabs{display:flex;gap:8px;margin:6px 0 18px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.zk-tab{background:var(--card);border:none;border-radius:100px;padding:9px 15px;color:var(--mut);
 font-size:13px;font-weight:600;white-space:nowrap;cursor:pointer;font-family:var(--ss)}
.zk-tab[data-on="1"]{background:var(--navy);color:#fff}

.zk-item{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid var(--rule);align-items:flex-start}
.zk-item:last-child{border-bottom:none}
.zk-item-a{text-decoration:none;color:inherit;cursor:pointer}
.zk-item-a:active{background:#F1F0EC}
.zk-thumb{width:74px;height:92px;flex:none;background:var(--paper);border-radius:12px;
 display:flex;align-items:center;justify-content:center;overflow:hidden}
.zk-thumb img{width:100%;height:100%;object-fit:cover}
.zk-thumb-a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}
.zk-thumb-t{font-size:9px;color:var(--faint);letter-spacing:.05em;display:flex;align-items:center;gap:2px}
.zk-nm{font-size:15px;font-weight:700;margin:0 0 4px;line-height:1.35}
.zk-wy{color:var(--mut);font-size:13px;line-height:1.55;margin:0}

.zk-sw{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 10px;margin-top:12px}
.zk-sw.zk-chips{display:flex;flex-wrap:wrap;gap:8px}
.zk-dot{width:100%;height:52px;border-radius:12px;border:1px solid rgba(0,0,0,.08)}
.zk-cap{font-size:11px;color:var(--mut);margin-top:6px;text-align:left;line-height:1.35}
.zk-credit{font-size:9px;color:var(--faint);margin:5px 0 0;line-height:1.3;max-width:74px}
.zk-chip{padding:9px 15px;border:none;border-radius:100px;background:var(--card);
 color:var(--mut);font-size:13px;font-weight:600;cursor:pointer;font-family:var(--ss)}
.zk-chip[data-on="1"]{background:var(--pink);color:#fff}

.zk-note{background:var(--lime);border-radius:16px;padding:16px 18px;margin-top:14px}
.zk-note .zk-sub{color:var(--ink)}
.zk-lock{background:var(--navy);color:#fff;border-radius:18px;padding:40px 22px;text-align:center}
.zk-lock .zk-p{color:rgba(255,255,255,.7)}
.zk-sheet{position:fixed;inset:0;background:rgba(18,23,58,.5);display:flex;
 align-items:flex-end;justify-content:center;z-index:50}
.zk-card{background:var(--paper);width:100%;max-width:460px;padding:22px 16px 32px;
 border-radius:24px 24px 0 0;max-height:92vh;overflow-y:auto;animation:up .26s ease-out}
@keyframes up{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
@keyframes br{0%,100%{opacity:.3}50%{opacity:1}}
.zk-br{animation:br 1.9s ease-in-out infinite}
@keyframes shine{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes glowpulse{
 0%,100%{box-shadow:0 0 0 rgba(239,31,140,0),0 0 0 rgba(214,229,82,0)}
 50%{box-shadow:0 0 22px rgba(239,31,140,.38),0 0 40px rgba(214,229,82,.14)}
}
@media(prefers-reduced-motion:reduce){.zk-card,.zk-br,.zk-logo,.zk-top{animation:none}}
.zk-pw-head{background:var(--pink);color:#fff;border-radius:18px;padding:22px;margin-bottom:14px}
.zk-plan{border:none;border-radius:16px;background:var(--card);padding:16px;margin-bottom:10px;
 width:100%;text-align:left;cursor:pointer;font-family:var(--ss);color:var(--ink)}
.zk-plan[data-on="1"]{background:var(--navy);color:#fff}
.zk-plan[data-on="1"] .zk-wy{color:rgba(255,255,255,.65)}
.zk-price{font-size:26px;font-weight:800}
.zk-err{border-radius:14px;background:var(--rose);padding:14px 16px;margin-top:18px}
.zk-err .zk-wy{color:#fff}
`;

/* ---------- чтение файла ---------- */
async function decodeToCanvas(file, max = 1100) {
  let src = null;
  if (typeof createImageBitmap === "function") {
    try { src = await createImageBitmap(file); } catch { src = null; }
  }
  if (!src) {
    const u = URL.createObjectURL(file);
    try {
      src = await new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i); i.onerror = () => rej(new Error("img")); i.src = u;
      });
    } catch { src = null; } finally { setTimeout(() => URL.revokeObjectURL(u), 5000); }
  }
  if (!src) return null;
  const s = Math.min(1, max / Math.max(src.width, src.height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(src.width * s));
  c.height = Math.max(1, Math.round(src.height * s));
  c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
  if (src.close) src.close();
  return c.toDataURL("image/jpeg", 0.86);
}
const readUrl = (f) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result); r.onerror = () => rej(new Error("read")); r.readAsDataURL(f);
});
async function fileToBase64(file) {
  let d = null;
  try { d = await decodeToCanvas(file); } catch { d = null; }
  if (!d) {
    const raw = await readUrl(file);
    const m = (String(raw).match(/^data:([^;]+);/) || [])[1] || "";
    if (!/^image\/(jpeg|png|webp|gif)$/.test(m)) throw new Error("format");
    if (file.size > 4.5 * 1024 * 1024) throw new Error("size");
    d = raw;
  }
  const [head, b64] = d.split(",");
  return { dataUrl: d, b64, media: (head.match(/^data:([^;]+);/) || [])[1] || "image/jpeg" };
}

/* ---------- запросы к модели ---------- */
// тело может прийти обычным JSON или потоком событий
function parseBody(raw) {
  try { return JSON.parse(raw); } catch {}

  if (/^\s*(event|data):/m.test(raw)) {
    const chunks = [];
    let stop = null, streamErr = null;
    for (const line of raw.split("\n")) {
      if (!line.startsWith("data:")) continue;
      let ev;
      try { ev = JSON.parse(line.slice(5).trim()); } catch { continue; }
      if (ev.type === "content_block_delta" && ev.delta?.text) chunks.push(ev.delta.text);
      if (ev.type === "message_delta" && ev.delta?.stop_reason) stop = ev.delta.stop_reason;
      if (ev.type === "error") streamErr = ev.error?.message || ev.error?.type;
    }
    if (streamErr) return { error: { message: streamErr } };
    if (chunks.length) return { content: [{ type: "text", text: chunks.join("") }], stop_reason: stop };
  }
  return null;
}

// Вне чата Claude прямой запрос к api.anthropic.com из браузера
// не проходит. Разбор идёт через тот же бесплатный ключ Google,
// что и примерка. Внутри чата — по-прежнему напрямую, для тестов.
const CLAUDE_URL = TRYON_API ? TRYON_API + "/gemini-text" : "https://api.anthropic.com/v1/messages";

async function callModel(blocks) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000); // не даём запросу висеть дольше 30 секунд
  let r;
  try {
    r = await fetch(CLAUDE_URL, {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl.signal,
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000,
        messages: [{ role: "user", content: blocks }] }),
    });
  } catch (e) {
    throw new Error(e.name === "AbortError" ? "Сервер не ответил за 30 секунд" : "Нет связи с сервером");
  } finally {
    clearTimeout(timer);
  }

  let raw = "";
  try { raw = await r.text(); } catch { throw new Error("Ответ не прочитался, код " + r.status); }
  if (!raw.trim()) throw new Error("Пустой ответ сервера, код " + r.status);

  const d = parseBody(raw);
  if (!d) throw new Error("Ответ не JSON (" + r.status + "): " + raw.slice(0, 140));

  if (d.error) throw new Error("Сервер: " + (d.error.message || d.error.type));
  if (!Array.isArray(d.content)) throw new Error("Ответ без содержимого, код " + r.status);
  if (d.stop_reason === "max_tokens") throw new Error("Ответ обрезан по лимиту");

  const t = d.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  if (!t.trim()) throw new Error("Модель ответила пустотой");
  return t;
}

function extractJson(t) {
  const c = t.replace(/```json|```/g, "").trim();
  const a = c.indexOf("{"), b = c.lastIndexOf("}");
  if (a < 0 || b <= a) throw new Error("В ответе нет JSON");
  try {
    return JSON.parse(c.slice(a, b + 1));
  } catch {
    // формулировка нарочно содержит «не JSON», чтобы попасть под тот же
    // механизм повторов с паузой, что и другие временные сбои
    throw new Error("Ответ пришёл не JSON, повреждён на границе: " + c.slice(a, a + 120));
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isLimit = (m) => /exceeded_limit|concurrent|overloaded|rate|429|529/i.test(m);
// сбои, которые часто проходят со второй попытки
const isFlaky = (m) => isLimit(m) || /не JSON|Пустой ответ|не прочитался|без содержимого/i.test(m);

async function askJson(blocks) {
  let last;
  for (let i = 0; i < 5; i++) {
    try { return extractJson(await callModel(blocks)); }
    catch (e) {
      last = e;
      // лимит одновременных запросов: ждём и пробуем снова
      if (isFlaky(e.message)) { await sleep(1200 * (i + 1)); continue; }
      if (/Нет связи/.test(e.message)) break;
      // кривой JSON — одна повторная попытка, дальше сдаёмся
      if (i >= 1) break;
    }
  }
  throw last;
}

const TONE =
  "Ты стилист-имиджмейкер. Пишешь по-русски, спокойно и по делу. " +
  "Черты описываешь нейтрально, как параметры, без оценок внешности, " +
  "без темы веса, симметрии, недостатков и без медицины. " +
  "Ответ — только JSON, без предисловий и markdown. Строки короткие.";

const img = (b64, m) => ({ type: "image", source: { type: "base64", media_type: m, data: b64 } });

/* 0. проверка кадра. Без неё модель достраивает выводы там, где данных нет */
const checkShot = (b, m) => askJson([img(b, m), { type: "text", text:
`Ты проверяешь пригодность фото для разбора внешности. Отвечай только JSON.
Верни: {"ok":true,"problem":""}
ok = true только если на фото целиком видно человеческое лицо: лоб, оба глаза, нос, губы,
линия подбородка и волосы. Лицо занимает заметную часть кадра, снято анфас или в лёгком
полуобороте, не перекрыто волосами, руками, очками или маской, не смазано и не в темноте.
Если хоть одно условие не выполнено — ok = false.
problem — одна короткая фраза по-русски, что именно не так. При ok = true оставь пустым.` }]);

/* 1. основа */
const analyzeBase = (b, m) => askJson([img(b, m), { type: "text", text: TONE +
`\nВерни: {"kibbe":{"type":"","why":""},"larson":{"type":"","why":""},"geometry":{"shape":"","proportions":"","lines":"","contrast":""},"coloring":{"season":"","undertone":"","depth":""},"identity":{"summary":"","wear":["","",""],"avoid":["",""]}}
kibbe.type — один из 13 типов Кибби по-русски.
larson.type — система Двин Ларсон: драматик, натурал, романтик, гамин, классик или смешанный вариант.
geometry — форма лица, пропорции, характер линий, контраст внешности. Каждое до 8 слов.
identity.summary — связный разбор на 45-60 слов простым языком: что означает сочетание этого типажа
Кибби и Ларсон, какое впечатление создаёт внешность, к какой эстетике она тяготеет. Без канцелярита,
пиши как стилист объясняет клиентке лично.
identity.wear — три конкретных совета, что стоит носить и подчёркивать, до 10 слов каждый.
identity.avoid — два совета, чего лучше избегать в образе и почему, до 10 слов каждый.
why — до 12 слов.` }]);

/* 2. другие теории */
const analyzeTheories = (b, m, t) => askJson([img(b, m), { type: "text", text: TONE +
`\nКибби ${t.kibbe.type}, Ларсон ${t.larson.type}, цветотип ${t.coloring.season}.
Верни: {"theories":[{"system":"","result":"","note":""},{"system":"","result":"","note":""}]}
Ровно две системы: "Энергетические типы Кэрол Тэттл", "12 подтипов цветотипа".
result — короткий вывод. note — до 12 слов, что это даёт на практике.` }]);

/* 3. волосы */
const analyzeHair = (b, m, t) => askJson([img(b, m), { type: "text", text: TONE +
`\nТипаж ${t.kibbe.type}, лицо ${t.geometry.shape}, цветотип ${t.coloring.season}.
Верни: {"cuts":[{"name":"","why":"","ref":""},{"name":"","why":"","ref":""},{"name":"","why":"","ref":""}],"haircolors":[{"name":"","hex":"#000000"},{"name":"","hex":"#000000"},{"name":"","hex":"#000000"}]}
why — до 10 слов. ref — краткое описание стрижки на английском для генератора картинок.` }]);

/* 4. лицо */
const analyzeFace = (b, m, t) => askJson([img(b, m), { type: "text", text: TONE +
`\nТипаж ${t.kibbe.type}, лицо ${t.geometry.shape}, ${t.coloring.undertone} подтон.
Верни: {"brows":{"shape":"","why":"","ref":""},"lips":{"shape":"","ref":"","colors":[{"name":"","hex":"#000000"},{"name":"","hex":"#000000"}]},"makeup":{"base":"","eyes":"","blush":""}}
Каждое поле — до 10 слов. ref — краткое описание на английском для поиска картинок.` }]);

/* 5. гардероб */
const analyzeWardrobe = (t) => askJson([{ type: "text", text: TONE +
`\nКибби ${t.kibbe.type}, Ларсон ${t.larson.type}, цветотип ${t.coloring.season}, ${t.coloring.undertone} подтон, ${t.geometry.contrast}.
Верни: {"wardrobe":{"palette":[{"name":"","hex":"#000000"}],"silhouettes":["","",""],"accessories":["","",""],"avoid":["",""]}}
palette — ровно 6 цветов одежды с реальными hex. Каждый пункт до 9 слов.` }]);

/* ---------- рендер на бэкенде ---------- */
async function callRender(path, body) {
  if (!TRYON_API) throw new Error("NO_RENDER_BACKEND");
  const r = await fetch(TRYON_API + path, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  const d = await r.json();
  if (!r.ok || !d.image) throw new Error(d.error || "Рендер не удался");
  return d;
}
const applyTryOn = async (b64, media, changes, tier = "standard") =>
  (await callRender("/tryon", { image: b64, mime: media, changes, tier })).image;

/* Пример-картинка. Генерируется, а не берётся из чужих фото:
   так нет ни авторских прав, ни лиц реальных людей. */
const REF_QUERY = {
  haircut: (d) => `${d} hairstyle woman`,
  brows: (d) => `${d} eyebrows woman`,
  lips: (d) => `${d} lips makeup`,
};

// три статичные иконки по категориям, вместо одной общей
function ScissorsIcon() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none" aria-hidden="true">
      <circle cx="7" cy="8" r="3" stroke="#3D5AFE" strokeWidth="1.6" />
      <circle cx="7" cy="20" r="3" stroke="#3D5AFE" strokeWidth="1.6" />
      <path d="M9.5 10 22 22M9.5 18 22 6" stroke="#3D5AFE" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function BrowIcon() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M4 17c2.5-6.5 7-9.5 11-9.5S21.5 12 24 17"
            stroke="#EF1F8C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M4 17c2.5-4 7-6 11-6s8.5 2 9.5 4.2"
            stroke="#EF1F8C" strokeWidth="1" strokeLinecap="round" opacity=".45" fill="none" />
    </svg>
  );
}
function LipsIcon() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M4 13c2-3 6-4 10-4s8 1 10 4c-2 1.5-5 2-10 2s-8-.5-10-2z"
            stroke="#EF1F8C" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 13c2 3.5 6 5 10 5s8-1.5 10-5" stroke="#EF1F8C" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 9v4" stroke="#EF1F8C" strokeWidth="1.2" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}
const KIND_ICON = { haircut: ScissorsIcon, brows: BrowIcon, lips: LipsIcon };

// стрелка «открывается в новой вкладке»
function ExternalIcon() {
  return (
    <svg viewBox="0 0 12 12" width="9" height="9" fill="none" aria-hidden="true">
      <path d="M4 2h6v6M10 2 4.5 7.5M3 4H2v6h6V9" stroke="#9AA0A6" strokeWidth="1.1"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// строка-пример: если сервер примерки подключён и нашёл фото — показываем его,
// иначе вся строка становится ссылкой на подборку в Pinterest
function ExampleRow({ title, why, desc, kind }) {
  const [shot, setShot] = useState(null);
  useEffect(() => {
    let live = true;
    if (!TRYON_API || !desc) return;
    callRender("/reference", { desc, kind }).then((d) => live && setShot(d)).catch(() => {});
    return () => { live = false; };
  }, [desc, kind]);

  const query = REF_QUERY[kind] ? REF_QUERY[kind](desc || "") : desc || "";
  const search = "https://www.pinterest.com/search/pins/?q=" + encodeURIComponent(query);
  const src = shot?.image;

  if (src) {
    return (
      <div className="zk-item">
        <div>
          <div className="zk-thumb"><img src={src} alt="" /></div>
          {shot?.credit && <p className="zk-credit">{shot.credit}</p>}
        </div>
        <div><p className="zk-nm">{title}</p><p className="zk-wy">{why}</p></div>
      </div>
    );
  }

  const Icon = KIND_ICON[kind] || ScissorsIcon;
  const body = (
    <>
      <div className="zk-thumb zk-thumb-a">
        <Icon />
        <span className="zk-thumb-t">примеры <ExternalIcon /></span>
      </div>
      <div><p className="zk-nm">{title}</p><p className="zk-wy">{why}</p></div>
    </>
  );

  return desc ? (
    <a className="zk-item zk-item-a" href={search} target="_blank" rel="noopener noreferrer">{body}</a>
  ) : (
    <div className="zk-item">{body}</div>
  );
}


/* ============================================================ */
export default function Zerkalo() {
  const [screen, setScreen] = useState("start");
  const [photo, setPhoto] = useState(null);
  const [b64, setB64] = useState(null);
  const [media, setMedia] = useState("image/jpeg");
  const [base, setBase] = useState(null);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("read");
  const [stage, setStage] = useState("");
  const [err, setErr] = useState("");
  const [pro, setPro] = useState(false);
  const [used, setUsed] = useState(0);
  const [paywall, setPaywall] = useState(false);
  const [plan, setPlan] = useState("month");
  const [pick, setPick] = useState({});
  const [rs, setRs] = useState("idle");

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem("zerkalo:account") || "{}");
      setPro(!!a.pro); setUsed(a.used || 0);
    } catch { /* новая пользовательница */ }
  }, []);
  const save = (n) => { try { localStorage.setItem("zerkalo:account", JSON.stringify(n)); } catch {} };

  async function onFile(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!pro && used >= 1) { setPaywall(true); return; }
    setErr(""); setScreen("loading");
    try {
      setStage("Читаю черты лица");
      const { dataUrl, b64: raw, media: mt } = await fileToBase64(f);
      setPhoto(dataUrl); setB64(raw); setMedia(mt);

      setStage("Проверяю кадр");
      const check = await checkShot(raw, mt);
      if (!check.ok) throw new Error("BADSHOT:" + (check.problem || "лицо не видно целиком"));

      setStage("Свожу системы типирования");
      const t = await analyzeBase(raw, mt);
      setBase(t);

      // строго по очереди: параллельные запросы упираются в лимит
      setStage("Свожу остальные системы");
      const th = await analyzeTheories(raw, mt, t);
      setStage("Подбираю причёску");
      const hair = await analyzeHair(raw, mt, t);
      setStage("Подбираю брови, губы, макияж");
      const face = await analyzeFace(raw, mt, t);
      setStage("Собираю палитру гардероба");
      const ward = await analyzeWardrobe(t);
      const d = { ...th, ...hair, ...face, ...ward };
      setData(d);

      setPick({ cut: d.cuts[0]?.name, haircolor: d.haircolors[0]?.name, lips: d.lips.colors[0]?.name });

      const n = { pro, used: used + 1 };
      setUsed(n.used); save(n);
      setScreen("result"); setTab("read");
    } catch (e) {
      const R = { format: "Этот формат браузер не открывает. Сохраните как JPG.",
        size: "Фото слишком тяжёлое. Уменьшите или пришлите скриншот.",
        read: "Файл не прочитался. Выберите его заново." };
      if (String(e.message).startsWith("BADSHOT:")) {
        setErr("Это фото не подойдёт: " + e.message.slice(8) +
          ". Нужен снимок анфас при дневном свете, где лицо видно целиком, " +
          "без очков и не перекрыто волосами.");
        setScreen("start");
        return;
      }
      setErr(
        R[e.message] ||
        (isLimit(e.message)
          ? "Сервис сейчас перегружен запросами. Подождите минуту и попробуйте снова."
          : "Разбор не завершился. Причина: " + e.message)
      );
      setScreen("start");
    }
  }

  async function tryOn() {
    if (!pro) { setPaywall(true); return; }
    setRs("loading");
    try { setPhoto(await applyTryOn(b64, media, pick)); setRs("idle"); }
    catch (e) {
      setRs(e.message === "NO_RENDER_BACKEND" ? "nobackend" : "failed");
      if (e.message !== "NO_RENDER_BACKEND") setErr(e.message);
    }
  }

  const Read = ({ k, v, s }) => (
    <div className="zk-read">
      <p className="zk-key">{k}</p>
      <p className="zk-val">{v}</p>
      {s && <p className="zk-sub">{s}</p>}
    </div>
  );

  const gate = (node) => pro ? node : (
    <div className="zk-lock">
      <p className="zk-h2">Открыто по подписке</p>
      <p className="zk-p" style={{ marginBottom: 20 }}>
        Палитра гардероба, аксессуары и примерка образов на вашем фото.
      </p>
      <button className="zk-btn" onClick={() => setPaywall(true)}>Смотреть подписку</button>
    </div>
  );

  const TABS = [["read","Разбор"],["theory","Системы"],["hair","Волосы"],
    ["face","Лицо"],["style","Гардероб"],["try","Примерка"]];

  return (
    <div className="zk">
      <style>{CSS}</style>
      <div className="zk-w">
        <div className="zk-top">
          <span className="zk-logo">Glowup</span>
          <span className="zk-meta">разбор внешности</span>
        </div>

        {screen === "start" && (
          <>
            <div className="zk-hero">
              <h1 className="zk-h1">Одно фото — пять систем типирования</h1>
              <p className="zk-p">
                Кибби, Ларсон, энергетические типы Тэттл, 12 подтипов цветотипа и геометрия лица.
                Каждая система смотрит на внешность со своей стороны, вместе они дают то, чего
                не даёт ни одна по отдельности. Снимок нужен при дневном свете, без фильтров и очков.
              </p>
              <label className="zk-btn zk-file" style={{ marginTop: 22 }}>
                Загрузить фото
                <input type="file" accept="image/*" onChange={onFile} />
              </label>
            </div>
            {err && <div className="zk-err"><p className="zk-wy">{err}</p></div>}
            <p className="zk-cap" style={{ width: "auto", textAlign: "left", marginTop: 4 }}>
              Первый разбор бесплатно. Фото обрабатывается для анализа и не публикуется.
            </p>
          </>
        )}

        {screen === "loading" && (
          <div style={{ padding: "84px 0", textAlign: "center" }}>
            <p className="zk-h2 zk-br">{stage}</p>
            <p className="zk-p">Обычно меньше минуты</p>
          </div>
        )}

        {screen === "result" && base && data && (
          <>
            <div style={{ marginTop: 18 }}><img src={photo} alt="Ваше фото" className="zk-shot" /></div>

            <div className="zk-tabs" role="tablist">
              {TABS.map(([k, l]) => (
                <button key={k} className="zk-tab" data-on={tab === k ? "1" : "0"}
                  onClick={() => setTab(k)} role="tab" aria-selected={tab === k}>{l}</button>
              ))}
            </div>

            {tab === "read" && (
              <>
                <Read k="ТИПАЖ ПО КИББИ" v={base.kibbe.type} s={base.kibbe.why} />
                <Read k="ТИПАЖ ПО ЛАРСОН" v={base.larson.type} s={base.larson.why} />
                <div className="zk-grid">
                  <div className="zk-read"><p className="zk-key">ФОРМА ЛИЦА</p>
                    <p className="zk-val" style={{ fontSize: 16 }}>{base.geometry.shape}</p></div>
                  <div className="zk-read"><p className="zk-key">ЛИНИИ</p>
                    <p className="zk-val" style={{ fontSize: 16 }}>{base.geometry.lines}</p></div>
                </div>
                <Read k="ЦВЕТОТИП" v={base.coloring.season}
                  s={`${base.coloring.undertone} подтон, глубина ${base.coloring.depth}, ${base.geometry.contrast}`} />
                <div className="zk-read"><p className="zk-key">ПРОПОРЦИИ</p>
                  <p className="zk-sub">{base.geometry.proportions}</p></div>
              </>
            )}

            {tab === "theory" && (
              <>
                <p className="zk-p" style={{ marginBottom: 16 }}>
                  Ларсон надстроена над Кибби и работает со смешанными типажами, поэтому её вывод
                  может отличаться от чистого типа. Это не противоречие, а разный масштаб взгляда.
                </p>

                <div className="zk-read">
                  <p className="zk-key">ЧТО ЭТО ЗНАЧИТ ДЛЯ ВАС</p>
                  <p className="zk-sub" style={{ fontSize: 14.5, lineHeight: 1.7, marginTop: 4 }}>
                    {base.identity.summary}
                  </p>
                </div>
                <div className="zk-grid">
                  <div className="zk-read">
                    <p className="zk-key">НОСИТЬ</p>
                    {base.identity.wear.map((w, i) => (
                      <p className="zk-sub" key={i} style={{ marginBottom: 6 }}>{w}</p>
                    ))}
                  </div>
                  <div className="zk-read">
                    <p className="zk-key">ИЗБЕГАТЬ</p>
                    {base.identity.avoid.map((w, i) => (
                      <p className="zk-sub" key={i} style={{ marginBottom: 6 }}>{w}</p>
                    ))}
                  </div>
                </div>

                {data.theories.map((t, i) => (
                  <Read key={i} k={t.system.toUpperCase()} v={t.result} s={t.note} />
                ))}
              </>
            )}

            {tab === "hair" && (
              <>
                {data.cuts.map((c, i) => (
                  <ExampleRow key={i} title={c.name} why={c.why} desc={c.ref} kind="haircut" />
                ))}
                <div style={{ paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
                  <p className="zk-key">ОТТЕНКИ</p>
                  <div className="zk-sw">
                    {data.haircolors.map((c, i) => (
                      <div key={i}><div className="zk-dot" style={{ background: c.hex }} />
                        <div className="zk-cap">{c.name}</div></div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "face" && (
              <>
                <ExampleRow title={`Брови: ${data.brows.shape}`} why={data.brows.why}
                  desc={data.brows.ref || data.brows.shape} kind="brows" />
                <ExampleRow title={`Губы: ${data.lips.shape}`} why="Оттенки помады ниже"
                  desc={data.lips.ref || data.lips.shape} kind="lips" />
                <div className="zk-read">
                  <p className="zk-key">ОТТЕНКИ ПОМАДЫ</p>
                  <div className="zk-sw">
                    {data.lips.colors.map((c, i) => (
                      <div key={i}><div className="zk-dot" style={{ background: c.hex }} />
                        <div className="zk-cap">{c.name}</div></div>
                    ))}
                  </div>
                </div>
                <div className="zk-read" style={{ marginTop: 14 }}>
                  <p className="zk-key">МАКИЯЖ</p>
                  <p className="zk-sub">База: {data.makeup.base}</p>
                  <p className="zk-sub">Глаза: {data.makeup.eyes}</p>
                  <p className="zk-sub">Румяна: {data.makeup.blush}</p>
                </div>
              </>
            )}

            {tab === "style" && gate(
              <>
                <div className="zk-read">
                  <p className="zk-key">ПАЛИТРА</p>
                  <div className="zk-sw">
                    {data.wardrobe.palette.map((c, i) => (
                      <div key={i}><div className="zk-dot" style={{ background: c.hex }} />
                        <div className="zk-cap">{c.name}</div></div>
                    ))}
                  </div>
                </div>
                <div className="zk-read"><p className="zk-key">СИЛУЭТЫ</p>
                  {data.wardrobe.silhouettes.map((s, i) => <p className="zk-sub" key={i}>{s}</p>)}</div>
                <div className="zk-read"><p className="zk-key">АКСЕССУАРЫ</p>
                  {data.wardrobe.accessories.map((s, i) => <p className="zk-sub" key={i}>{s}</p>)}</div>
                <div className="zk-note"><p className="zk-key">ЧТО СПОРИТ С ТИПАЖОМ</p>
                  {data.wardrobe.avoid.map((s, i) => <p className="zk-sub" key={i}>{s}</p>)}</div>
              </>
            )}

            {tab === "try" && gate(
              <>
                <p className="zk-p" style={{ marginBottom: 16 }}>Соберите образ и посмотрите его на своём фото.</p>
                {[["cut","Стрижка",data.cuts.map(c=>c.name)],
                  ["haircolor","Цвет волос",data.haircolors.map(c=>c.name)],
                  ["lips","Помада",data.lips.colors.map(c=>c.name)]].map(([k,l,o]) => (
                  <div className="zk-read" key={k}>
                    <p className="zk-key">{l.toUpperCase()}</p>
                    <div className="zk-sw zk-chips">
                      {o.map((x) => (
                        <button key={x} className="zk-chip" data-on={pick[k] === x ? "1" : "0"}
                          onClick={() => setPick({ ...pick, [k]: x })}>{x}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 14 }}>
                  <button className="zk-btn" onClick={tryOn} disabled={rs === "loading"}>
                    {rs === "loading" ? "Рисую образ" : "Примерить"}
                  </button>
                </div>
                {rs === "failed" && <div className="zk-err"><p className="zk-wy">{err}</p></div>}
                {rs === "nobackend" && (
                  <div className="zk-note"><p className="zk-key">РЕНДЕР НЕ ПОДКЛЮЧЁН</p>
                    <p className="zk-sub">Впишите адрес сервера в константу TRYON_API вверху файла.
                      Тогда заработают и примерка, и картинки-примеры в разделах «Волосы» и «Лицо».</p></div>
                )}
              </>
            )}

            <div style={{ marginTop: 30 }}>
              <button className="zk-btn zk-btn2" onClick={() => {
                setScreen("start"); setBase(null); setData(null); setRs("idle");
              }}>Новый разбор</button>
            </div>
          </>
        )}
      </div>

      {paywall && (
        <div className="zk-sheet" onClick={() => setPaywall(false)}>
          <div className="zk-card" onClick={(e) => e.stopPropagation()}>
            <div className="zk-pw-head">
              <h2 className="zk-h2">Glowup Полное</h2>
              <p className="zk-p" style={{ color: "rgba(255,255,255,.85)" }}>
                Безлимитные разборы по всем системам, палитра гардероба, аксессуары
                и примерка образов на вашем фото.
              </p>
            </div>
            <button className="zk-plan" data-on={plan === "month" ? "1" : "0"} onClick={() => setPlan("month")}>
              <div className="zk-price">4 900 ₸</div>
              <p className="zk-wy">в месяц, отмена в любой момент</p>
            </button>
            <button className="zk-plan" data-on={plan === "year" ? "1" : "0"} onClick={() => setPlan("year")}>
              <div className="zk-price">2 900 ₸</div>
              <p className="zk-wy">в месяц при оплате за год</p>
            </button>
            <div style={{ marginTop: 14 }}>
              <button className="zk-btn" onClick={() => { setPro(true); save({ pro: true, used }); setPaywall(false); }}>
                Оформить подписку
              </button>
            </div>
            <p className="zk-cap" style={{ width: "auto", textAlign: "left", marginTop: 12 }}>
              В демоверсии оплата не списывается
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
