export default function Header() {
  const header = document.querySelector(".xc-header");

  window.addEventListener("scroll", function () {
    header.classList.toggle("stick", window.scrollY > 10);
    this.document.querySelector('.xc-body').classList.toggle("adjust", window.scrollY > 10);
  });
}
