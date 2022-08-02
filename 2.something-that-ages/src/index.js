const photograph = document.getElementById("photograph");
const agedPaper = document.getElementById("aged-paper");

function toggle() {
	photograph.classList.toggle("photograph-anim");
	agedPaper.classList.toggle("aged-paper-anim");
}

(async () => {
	while (true) {
		toggle();
		await new Promise((resolve) => setTimeout(resolve, 9_000));
		toggle();
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
})();
