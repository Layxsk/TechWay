function navigation() {
  const routes = [
    { id: "btn-landingPage", href: "/" },
    { id: "btn-login", href: "/login" },
    { id: "btn-ong", href: "/ongs" },
    { id: "btn-ong2", href: "/ongs" },
    { id: "btn-sobre", href: "/quemsomos" },
    { id: "btn-quemsomos", href: "/quemsomos" },
    { id: "btn-campanhas", href: "/campanhas" },
    { id: "btn-campanhas2", href: "/campanhas" },
    { id: "btn-cadastro", href: "/cadastro" },
    { id: "btn-submit-history", href: "/memorial-cadastro" },
  ];

  routes.forEach(({ id, href }) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => {
        window.location.href = href;
      });
    }
  });
}

navigation();
