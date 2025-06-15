document.addEventListener("DOMContentLoaded", function () {
	var headings = document.querySelectorAll("h2, h3");
	var toc = document.getElementById("toc");
	var tocHtml = "<ul>";
	var prevLevel = 2;

	headings.forEach(function (heading) {
		var level = parseInt(heading.tagName[1]);
		var text = heading.textContent.trim();

		if (level > prevLevel) {
			tocHtml += "<ul>";
		} else if (level < prevLevel) {
			for (var i = 0; i < prevLevel - level; i++) {
				tocHtml += "</ul>";
			}
		}

		var id = text.toLowerCase().replace(/\s+/g, "-");
		heading.id = id;
		tocHtml += `<li><a href="#${id}" class="toc-link">${text}</a></li>`;
		prevLevel = level;
	});

	tocHtml += "</ul>";
	toc.innerHTML = tocHtml;

	var menuButton = document.getElementById("menuButton");
	var sidebar = document.querySelector(".sidebar");
	var overlay = document.getElementById("overlay");
	var body = document.body;

	// メニューボタンのクリックイベント
	menuButton.addEventListener("click", function () {
		toggleMenu();
	});

	// オーバーレイのクリックイベント
	overlay.addEventListener("click", function () {
		closeMenu();
	});

	// 目次リンクのクリックイベント
	var tocLinks = document.querySelectorAll(".toc-link");
	tocLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			closeMenu();
		});
	});

	// メニューの開閉を制御する関数
	function toggleMenu() {
		sidebar.classList.toggle("active");
		overlay.classList.toggle("active");
		body.classList.toggle("menu-active");
	}

	// メニューを閉じる関数
	function closeMenu() {
		sidebar.classList.remove("active");
		overlay.classList.remove("active");
		body.classList.remove("menu-active");
	}
});

document.addEventListener("DOMContentLoaded", function () {
	// スムーズスクロール
	const sidebarLinks = document.querySelectorAll("#sidebar-toc a");
	const headerOffset = 104; // 3rem = 48px

	sidebarLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href").substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				const targetPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition =
					targetPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// スクロール位置による目次のアクティブ化
	const headings = document.querySelectorAll("h2, h3");
	let ticking = false;

	function updateActiveSection() {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const scrollPosition = window.scrollY + headerOffset + 5; // 少し余裕を持たせる

				// 全てのリンクから強調を解除
				sidebarLinks.forEach((link) => {
					link.classList.remove("active");
				});

				// 現在のスクロール位置に基づいて該当する見出しを探す
				let currentSection = null;

				headings.forEach((heading) => {
					if (heading.offsetTop <= scrollPosition) {
						currentSection = heading;
					}
				});

				// 該当する見出しが見つかった場合、対応するサイドバーリンクをアクティブに
				if (currentSection) {
					const id = currentSection.id;
					const correspondingLink = document.querySelector(
						`#sidebar-toc a[href="#${id}"]`
					);
					if (correspondingLink) {
						correspondingLink.classList.add("active");
					}
				}

				ticking = false;
			});
		}
		ticking = true;
	}

	// スクロールイベントのリスナー
	window.addEventListener("scroll", updateActiveSection, { passive: true });

	// 初期表示時にも実行
	updateActiveSection();
});
