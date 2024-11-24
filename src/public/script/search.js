async function fetchStory() {
  try {
    const response = await fetch("../public/utils/memories.json");
    return response.json();
  } catch (error) {
    alert("Erro ao buscar as histórias: ", error);
    return [];
  }
}

async function searchBar() {
  const stories = await fetchStory();
  const bar = document.getElementById(searchBar);
  bar.addEventListener("keypress", (event) => {
    const key = event.key;
    if (!key && key != "enter") {
      alert("Aperte Enter para pesquisar");
      return;
    }
    const userSearch = event.target.value.toLowerCase();
    const filteredStory = stories.filter((story) => {
      story.nome.toLowerCase().includes(userSearch) ||
        story.mensagem.toLowerCase().includes(userSearch);
    });
  });
}
