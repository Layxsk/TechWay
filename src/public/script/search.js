import carregarHistorias from "./memories.js";

export async function fetchStories() {
  try {
    const response = await fetch("/memories");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar as histórias:", error);
    return [];
  }
}

export async function filterAndRenderStories(searchParam) {
  const stories = await fetchStories();

  const filteredStories = stories.filter((story) => {
    return (
      story.nome.toLowerCase().includes(searchParam) ||
      story.sobrenome.toLowerCase().includes(searchParam) ||
      story.mensagem.toLowerCase().includes(searchParam) ||
      story.localAcidente.toLowerCase().includes(searchParam) ||
      story.dataFalecimento.includes(searchParam)
    );
  });

  if (filteredStories.length > 0) {
    carregarHistorias(filteredStories);
  } else {
    const postGroup = document.getElementById("post-group");
    postGroup.innerHTML = `<p class="text-center text-gray-500">Nenhuma história encontrada.</p>`;
  }
}

export async function initializeSearchBar() {
  const bar = document.getElementById("search-bar");

  bar.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const userSearch = bar.value.trim().toLowerCase();
      console.log(userSearch);

      if (userSearch) {
        window.location.href = `/memorial?search=${encodeURIComponent(
          userSearch
        )}`;
      } else {
        alert("Digite algo para buscar!");
      }
    }
  });
}

export function initializePageBehavior() {
  initializeSearchBar();
  document.addEventListener("DOMContentLoaded", async () => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/memorial")) {
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get("search")?.toLowerCase() || "";
      await filterAndRenderStories(searchParam);
    }
  });
}
