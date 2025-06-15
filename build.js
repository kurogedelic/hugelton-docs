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

// テンプレートを読み込んで変数を置換
function createHTML(templateFile, title, content) {
	const currentDate = getCurrentDate();
	const template = fs.readFileSync(templateFile, "utf-8");
	
	return template
		.replace("{{TITLE}}", title)
		.replace("{{CONTENT}}", content.replace("[TOC]", ""))
		.replace("{{DATE}}", currentDate);
}

// ディレクトリを再帰的に作成
function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

// ファイルをコピー
function copyFile(src, dest) {
	ensureDir(path.dirname(dest));
	fs.copyFileSync(src, dest);
}

// ディレクトリを再帰的にコピー
function copyDir(src, dest) {
	ensureDir(dest);
	const files = fs.readdirSync(src);
	
	for (const file of files) {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		
		if (fs.statSync(srcPath).isDirectory()) {
			copyDir(srcPath, destPath);
		} else {
			copyFile(srcPath, destPath);
		}
	}
}

// Markdownファイルを変換
function convertMarkdown(inputFile, outputFile, templateFile, title) {
	try {
		const markdown = fs.readFileSync(inputFile, "utf-8");
		const content = md.render(markdown);
		const html = createHTML(templateFile, title, content);
		
		ensureDir(path.dirname(outputFile));
		fs.writeFileSync(outputFile, html);
		console.log("Generated: " + outputFile);
	} catch (error) {
		console.error("Error converting " + inputFile + ":", error);
		process.exit(1);
	}
}

// メイン処理
function main() {
	const publicDir = "public";
	
	// publicディレクトリをクリア
	if (fs.existsSync(publicDir)) {
		fs.rmSync(publicDir, { recursive: true });
	}
	ensureDir(publicDir);
	
	// 静的ファイルをコピー
	copyFile("manual-styles.css", path.join(publicDir, "manual-styles.css"));
	copyFile("addiction.js", path.join(publicDir, "addiction.js"));
	copyFile("_headers", path.join(publicDir, "_headers"));
	copyDir("fonts", path.join(publicDir, "fonts"));
	copyDir("assets", path.join(publicDir, "assets"));
	copyDir("src", path.join(publicDir, "src"));
	
	// メインページを生成
	convertMarkdown(
		"index.md",
		path.join(publicDir, "index.html"),
		"template/index.html",
		"製品説明書"
	);
	
	// 製品ページを生成
	const products = ["K102E"];
	
	for (const product of products) {
		const productDir = path.join(publicDir, product);
		ensureDir(productDir);
		
		// 製品のindex.mdを変換
		convertMarkdown(
			path.join(product, "index.md"),
			path.join(productDir, "index.html"),
			"template/manual.html",
			product + " Manual"
		);
		
		console.log("Built " + product + " documentation");
	}
	
	console.log("Build completed successfully!");
}

// 実行
main();