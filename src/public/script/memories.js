export default async function carregarHistorias(historias) {
  try {
    const postGroup = document.getElementById("post-group");
    postGroup.innerHTML = "";

    historias.forEach((historia) => {
      const postDiv = document.createElement("div");
      postDiv.className = "bg-gray-100 p-5 mb-10";

      const titulo = document.createElement("h1");
      titulo.className = "font-bold text-2xl mb-2";
      titulo.textContent = `${historia.nome} ${historia.sobrenome}`;

      const dataLocal = document.createElement("h2");
      dataLocal.className = "font-bold text-2xl mb-2";
      dataLocal.textContent = `${historia.dataFalecimento} - ${historia.localAcidente}`;

      const mensagem = document.createElement("p");
      mensagem.className = "my-3 truncate";
      mensagem.textContent = historia.mensagem;

      const btnLeiaMais = document.createElement("button");
      btnLeiaMais.className =
        "text-blue-900 font-semibold bg-white border border-orange-500 hover:text-orange-500 p-2 my-1 rounded-md";
      btnLeiaMais.textContent = "Leia Mais";
      btnLeiaMais.id = `memory${historia.id}`;

      const btnVisualizacoes = document.createElement("button");
      btnVisualizacoes.className =
        "text-blue-900 font-semibold bg-white border border-orange-500 hover:text-orange-500 p-2 my-1 rounded-md";
      btnVisualizacoes.textContent = `Visualizações: ${historia.visualizacoes}`;

      postDiv.appendChild(titulo);
      postDiv.appendChild(dataLocal);
      postDiv.appendChild(mensagem);
      postDiv.appendChild(btnLeiaMais);
      postDiv.appendChild(btnVisualizacoes);

      postGroup.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar as histórias:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/memories");
  const historias = await response.json();
  carregarHistorias(historias);
});
