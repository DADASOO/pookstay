/* 포옥스테이 공통 스크립트 */

// 첨부 상세페이지 이미지 원본 크기 (크롭 계산용)
const IMG_SIZE = {
  '1.webp':[639,2000], '4.webp':[860,1680], '5.webp':[534,2000], '7.webp':[508,2000],
  '8.webp':[460,2000], '9.webp':[860,1322], '11.webp':[860,1470], '17.webp':[506,2000],
};

// <div class="crop" data-crop="파일 x0 y0 x1 y1" data-alt="설명"> → 원본의 해당 영역만 보여 줌
function applyCrops(root = document){
  root.querySelectorAll('[data-crop]').forEach(el => {
    if (el.dataset.done) return;
    const [src, x0, y0, x1, y1] = el.dataset.crop.split(/\s+/);
    const [W, H] = IMG_SIZE[src];
    const cw = x1 - x0, ch = y1 - y0;
    el.style.aspectRatio = `${cw} / ${ch}`;
    const img = new Image();
    img.src = 'img/' + src;
    img.alt = el.dataset.alt || '';
    img.loading = 'lazy';
    img.style.width = (W / cw * 100) + '%';
    img.style.left  = (-x0 / cw * 100) + '%';
    img.style.top   = (-y0 / ch * 100) + '%';
    el.appendChild(img);
    el.dataset.done = '1';
  });
}

// 주소 뒤 ?stay=숙소이름 읽기
function getStay(fallback){
  const raw = new URLSearchParams(location.search).get('stay');
  const name = (raw || '').trim().slice(0, 20);
  return name || fallback;
}

function withStay(page, stay){
  return stay ? `${page}?stay=${encodeURIComponent(stay)}` : page;
}

async function copyText(text, btn){
  try { await navigator.clipboard.writeText(text); }
  catch { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  if (btn){ const o = btn.textContent; btn.textContent = '복사됐어요'; setTimeout(() => btn.textContent = o, 1400); }
}

document.addEventListener('DOMContentLoaded', () => applyCrops());
