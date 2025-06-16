const TOKEN = "ea38c5437881ca";

function buscarIP() {
  const ip = document.getElementById("ipInput").value.trim();
  const erroDiv = document.getElementById("erro");
  erroDiv.textContent = "";
  document.getElementById("tabela").style.display = "none";

  if (!ip) {
    erroDiv.textContent = "Digite um IP válido.";
    return;
  }

  fetch(`https://ipinfo.io/${ip}/json?token=${TOKEN}`)
    .then(response => {
      if (!response.ok) throw new Error("IP inválido ou erro na API");
      return response.json();
    })
    .then(data => {
      const tbody = document.getElementById("infoIP");
      tbody.innerHTML = "";

      const campos = {
        IP: data.ip,
        Cidade: data.city,
        Região: data.region,
        País: data.country,
        Localização: data.loc,
        Organização: data.org,
        Hostname: data.hostname || "N/A"
      };

      for (const [chave, valor] of Object.entries(campos)) {
        const row = `<tr><th>${chave}</th><td>${valor}</td></tr>`;
        tbody.innerHTML += row;
      }

      document.getElementById("tabela").style.display = "table";
    })
    .catch(err => {
      erroDiv.textContent = "Erro ao buscar informações do IP.";
      console.error(err);
    });
}
