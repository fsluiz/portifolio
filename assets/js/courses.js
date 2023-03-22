function flipCard(card) {
    card.classList.toggle('flipped');
  }
  
  const addCharactersToPage = characters => {
    const characterList = characters
      .map(character => {
        const { episode = [], gender, image, location = {}, name, species, status } = character;
  
        return `
        <li class="card__item">
          <button aria-label="Flip card for details" class="card__button" onclick=flipCard(this) type="button">
            <div class="card__front">
              <img 
                alt="${name}"
                class="card__image"
                height="288"
                loading="lazy"
                src="${image}"
                width="288"
              />
              <h2 class="card__name">${name}</h2>
            </div>
            <div class="card__back">
              <dl class="card__description">
                <dt class="card__term">Name</dt>
                <dd class="card__detail">${name}</dd>
                <dt class="card__term">Species</dt>
                <dd class="card__detail">${species}</dd>
                <dt class="card__term">Gender</dt>
                <dd class="card__detail">${gender}</dd>
                <dt class="card__term">Status</dt>
                <dd class="card__detail">${status}</dd>
                <dt class="card__term">Location</dt>
                <dd class="card__detail">${location.name}</dd>
                <dt class="card__term">Appearances</dt>
                <dd class="card__detail">${episode.length}</dd>
              </dl>
            </div>
          </button>
        </li>
      `;
      })
      .join('');
  
    document.querySelector('#character-list').innerHTML = characterList;
  };
  
  const getPaginatedData = async url => {
    const data = [];
    let nextUrl = url;
  
    while (nextUrl) {
      const pageData = await (await fetch(nextUrl)).json();
      nextUrl = await pageData?.info?.next;
      await data.push(...pageData.results);
    }
  
    return data;
  };
  //const addDataToPage = async () => {
  //  const characters = await getPaginatedData('https://rickandmortyapi.com/api/character');
  
  //  addCharactersToPage(characters);
  //};
  
  addDataToPage();