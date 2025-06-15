const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@iktakahiro/markdown-it-katex");

// Markdown設定
const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
})
	.use(markdownItAnchor, {
		permalink: false,
	})
	.use(markdownItKatex);

// カスタム表レンダリング
md.renderer.rules.table_open = function () {
	return '<div class="table-responsive"><table>';
};
md.renderer.rules.table_close = function () {
	return "</table></div>";
};

// 現在の日付を YYYY-MM-DD 形式で取得
function getCurrentDate() {
	const date = new Date();
	return date.toISOString().split("T")[0];
}

// HTMLテンプレート
function createTemplate(content) {
	const currentDate = getCurrentDate();

	return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K102E Manual</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <link rel="stylesheet" href="manual-styles.css">
    <link rel="stylesheet" href="fonts/kumochi.css" />
</head>
<body>
    <header class="site-header">
        <a href="https://hugelton.com" class="site-header-logo">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="97"
                height="60"
                class="logo"
                viewBox="0 0 8.504 6.373"
            >
                <g data-name="Print">
                    <path
                        fill="currentColor"
                        d="M8.226 4.705c-.082 0-.261-.17-.396-.628-.263-.893-.695-1.026-.929-1.026s-.665.133-.929 1.026c-.135.458-.314.628-.369.633-.002-.002-.236-.153-.415-1.208-.19-1.121-.497-1.666-.936-1.666s-.746.545-.937 1.666c-.13.767-.289 1.056-.357 1.156-.086-.159-.271-.647-.417-2.056C2.303.309 1.933 0 1.602 0S.901.309.663 2.602C.498 4.197.283 4.612.217 4.705h-.218v.556h.278c.331 0 .701-.309.938-2.602.131-1.257.291-1.781.386-1.993.095.211.255.735.386 1.993.238 2.293.608 2.602.939 2.602.44 0 .746-.545.937-1.666.161-.949.366-1.167.368-1.203.041.035.247.254.408 1.203.191 1.121.497 1.666.937 1.666.234 0 .665-.133.929-1.026.135-.458.314-.628.396-.628s.261.17.396.628c.263.893.695 1.027.929 1.027h.278v-.556h-.278ZM0 5.817h8.504v.556H0z"
                    ></path>
                </g>
            </svg>
        </a>
    </header>

    <nav class="sidebar">
        <div id="sidebar-toc">
            <div id="toc"></div>
        </div>
    </nav>

    <button class="menu-button" id="menuButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    </button>

    <div class="overlay" id="overlay"></div>

    <div class="main-content-wrapper">
        <main>
            <article class="content">
                ${content.replace("[TOC]", "")}
            </article>
        </main>
    </div>
    <aside class="main-aside">最終更新日 ${currentDate}</aside>
    <footer class="main-footer">© 2025 Hügelton Instruments. All rights reserved.</footer>
    <script src="addiction.js"></script>
</body>
</html>`;
}

// 変換処理
function convertMarkdownToHTML(inputFile, outputFile, styleFile) {
	try {
		const markdown = fs.readFileSync(inputFile, "utf-8");

		if (!fs.existsSync(styleFile)) {
			console.error("Style file not found: " + styleFile);
			process.exit(1);
		}

		const content = md.render(markdown);
		const html = createTemplate(content);

		fs.writeFileSync(outputFile, html);
		console.log("Generated: " + outputFile);
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

// メイン処理
const inputFile = process.argv[2];
const outputFile = process.argv[3] || "manual.html";
const styleFile = "manual-styles.css";

if (!inputFile) {
	console.log("Usage: node md-to-html.js input.md [output.html]");
	process.exit(1);
}

convertMarkdownToHTML(inputFile, outputFile, styleFile);
