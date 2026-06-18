
// ======================
// 要素取得
// ======================

const positionInput = document.getElementById("position");
const kanjiInput = document.getElementById("kanji-name");
const kanaInput = document.getElementById("kana-name");

const previewPosition = document.getElementById("preview-position");
const previewKanji = document.getElementById("preview-kanji");
const previewKana = document.getElementById("preview-kana");

const downloadButton = document.getElementById("download-btn");

// ======================
// プレビュー更新
// ======================

function updatePreview() {
    previewPosition.textContent = positionInput.value;
    previewKanji.textContent = kanjiInput.value;
    previewKana.textContent = kanaInput.value;
}

// ======================
// PNGダウンロード
// ======================

function downloadImage() {


    // 必須チェック
    if (!positionInput.value.trim()) {
        alert("役職を入力してください");
        return;
    }

    if (!kanjiInput.value.trim()) {
        alert("漢字名を入力してください");
        return;
    }

    if (!kanaInput.value.trim()) {
        alert("ひらがな名を入力してください");
        return;
    }

    // Canvas生成
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 2560;
    canvas.height = 1440;

    // 背景画像
    const backgroundImage = new Image();
    backgroundImage.src = "images/テンプレート.png";

    backgroundImage.onload = function () {

        // 背景描画
        ctx.drawImage(backgroundImage, 0, 0, 2560, 1440);

        // プレビュー1200px基準
        const scale = 2560 / 1200;

        // 文字色
        ctx.fillStyle = "#000";

        // 右寄せ
        ctx.textAlign = "right";
        ctx.textBaseline = "top";

        // CSSの right:25px を2560px基準へ変換
        const textX = 2560 - (25 * scale);

        // CSSの top:100px に合わせる
        const kanjiY = 100 * scale;
        const kanaY = 160 * scale;
        const positionY = 190 * scale;

        // 漢字名
        ctx.font = `bold ${48 * scale}px "Noto Sans JP"`;
        ctx.fillText(
            kanjiInput.value,
            textX,
            kanjiY
        );

        // ひらがな名
        ctx.font = `${16 * scale}px "Noto Sans JP"`;
        ctx.fillText(
            kanaInput.value,
            textX,
            kanaY
        );

        // 役職
        ctx.font = `bold ${24 * scale}px "Noto Sans JP"`;
        ctx.fillText(
            positionInput.value,
            textX,
            positionY
        );

        // ダウンロード
        const link = document.createElement("a");

        const imageData = canvas.toDataURL("image/png");

        link.download = "meeting-background.png";
        link.href = imageData;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
}

// ======================
// イベント登録
// ======================

positionInput.addEventListener("input", updatePreview);
kanjiInput.addEventListener("input", updatePreview);
kanaInput.addEventListener("input", updatePreview);

downloadButton.addEventListener("click", downloadImage);

