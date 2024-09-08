function removeAcents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function search() {
    // Obtém o valor do campo de pesquisa e normaliza
    let searchField = removeAcents(document.getElementById("search-field").value);

        // Obtém a seção HTML onde os resultados serão exibidos
        let section = document.getElementById("search-results");

    // Verifica se searchField é uma string vazia
    if (!searchField) {
        section.innerHTML = "<p>Você precisa digitar o nome de uma cidade.</p>"
        return 
    }
    
    // Inicializa uma string vazia para armazenar os resultados
    let results = "";
    let name = ""; 
    let description = "";
    let address = "";
    let city = "";
    let link = "";

    // Percorre cada dado no conjunto de dados
    for (let information of data) {
        // Normaliza o campo city e compara com o termo de busca normalizado
        const cityNormalized = removeAcents(information.city);

        // Verifica se o termo de busca está presente no campo city do item
        if (city.match(new RegExp(searchField, 'gi'))) {

            // Se o termo de busca for encontrado, cria uma nova div com a classe "result" e adiciona as informações relevantes (nome, descrição, endereço, cidade e link) ao HTML
            results += `
            <div class="result">
                <h2>
                    <a href="#" target="_blank">${information.name.replace(new RegExp(searchField, 'gi'), '<span class="highlight">$&</span>')}</a>
                </h2>
                <p class="meta-description">${information.description}</p>
                                <p class="meta-description">${information.address}</p>
                                <p class="meta-description">${information.city}</p>
                <a href=${information.link} target="_blank">Saiba mais!</a>
            </div>
        `;
        }
    }

    // Se nenhum resultado for encontrado, exibe uma mensagem indicando que não há resultados
    if (!results) {
        results = "<p>Sua busca não encontrou nenhum resultado</p>"
    }

    // Atribui o conteúdo da string results à seção HTML, substituindo o conteúdo anterior
    section.innerHTML = results;
}