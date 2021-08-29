const urlUser = 'https://api.github.com/users/';

const form = document.getElementById('formulario');
const input = document.getElementById('entrada');

form.addEventListener('submit', async e =>{
    e.preventDefault();
    const resultado = await getAPI(urlUser+input.value)
    imprimir(resultado);
});


async function getAPI(url) {
    const pedido = await fetch(url);
    const resultado = await pedido.json();
    return resultado;
}

async function imprimir(perfil) {    
    const {avatar_url, name, company, bio, followers, following, public_repos, login} = perfil;    
    const repos = await getAPI(urlUser+login+'/repos');    
    // console.log(perfil);
    // console.log(repos);
    if (document.querySelector('.card')) document.querySelector('.card').remove();
    const main = document.querySelector('main');
    const divCard = document.createElement('div');    
    divCard.classList.add('card');

    divCard.innerHTML = `
    <div class="perfil">
        <div class="foto">
            <img src="${avatar_url}" />
        </div>
        <div class="perfil-info">
            <div class="general">
                <h3>${name}</h3>
                <small>${company}</small>
                <p>${bio}</p>
            </div>
            <div class="iconos">                
                <div><i class="fas fa-heart"></i>${followers}</div>
                <div><i class="fas fa-user"></i>${following}</div>
                <div><i class="fas fa-code"></i>${public_repos}</div>
            </div>                
        </div>    
    </div>
    `;
    const divRepos = document.createElement('div');
    divRepos.classList.add('repos');    
    divRepos.innerHTML += '<small id="repo">&#60; repos &#62;</small>';
    repos.slice(0,9).forEach( e => {        
        divRepos.innerHTML += `
            <a href="${e.html_url}" target="_blank">${e.name}</a>
        `
    })

    divCard.appendChild(divRepos);
    main.appendChild(divCard);
}