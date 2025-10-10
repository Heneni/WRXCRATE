import cratedigger from './scripts/cratedigger';
const data = JSON.parse(`
[
  {"title":"Let it Hiss","artist":"The Barr Brothers","cover":"https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Salesmen & Racists","artist":"Ike Reilly","cover":"https://i.scdn.co/image/ab67616d0000b273f63ef14157f7e8e0ed5e8113","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"The Horses and the Hounds","artist":"James McMurtry","cover":"https://i.scdn.co/image/ab67616d0000b27388ef788544886eb4cb162792","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Love This Giant","artist":"David Byrne& St. Vincent","cover":"https://i.scdn.co/image/ab67616d0000b2731f1bafb7b062972bdd1f6cdc","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Our Roots Run Deep","artist":"Dominique Fils-Aimé","cover":"https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Taffetas","artist":"Taffetas","cover":"https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Halcyon Days (Expanded Edition)","artist":"Bruce Hornsby","cover":"https://i.scdn.co/image/ab67616d0000b27318caaf52d7c2a553548f3e54","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Hello Love","artist":"The Be Good Tanyas","cover":"https://i.scdn.co/image/ab67616d0000b2730050e6a23be3f843943930a8","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Money (That's What I Want) [From Jim Beam's Live Music Series]","artist":"David Gray","cover":"https://i.scdn.co/image/ab67616d0000b2730c1b380dd74426a61febcdf9","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Cafe Microphone / 32° Fahrenheit","artist":"Wilczynski","cover":"https://i.scdn.co/image/ab67616d0000b273caba7f127c7a27bfde00b31c","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Eric Church","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"I Won't Back Down","artist":"The Mighty Rootsmen& Toots & The Maytals& Gregory Isaacs& Mykal Rose","cover":"https://i.scdn.co/image/ab67616d0000b27371300435962e79c4d3c7f516","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Sunrise In The Land Of Milk And Honey","artist":"Cracker","cover":"https://i.scdn.co/image/ab67616d0000b27363a16571d0382386dc2846ff","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Daylight Savings Time","artist":"Steve Forbert","cover":"https://i.scdn.co/image/ab67616d0000b273653eaed759d9930c36805be9","year":"afro soul-afropop","hasSleeve":true},
  {"title":"The Cars","artist":"The Cars","cover":"https://i.scdn.co/image/ab67616d0000b273f725bc7907dcf15aa2c6e7b7","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Honey Bones","artist":"DOPE LEMON","cover":"https://i.scdn.co/image/ab67616d0000b2736e5f26c11f97c7211fe5f4fb","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Jah Victory","artist":"Alpha Blondy","cover":"https://i.scdn.co/image/ab67616d0000b27391f3bb8309fc2ef2066cabfe","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Villa Amorini","artist":"Orions Belte","cover":"https://i.scdn.co/image/ab67616d0000b2739525069482163b8af80bf3c5","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Blind Melon","artist":"Blind Melon","cover":"https://i.scdn.co/image/ab67616d0000b2737ed1df1690df31d094d7c2bc","year":"afro soul-afropop","hasSleeve":true},
  {"title":"The Traveling Wilburys, Vol. 1","artist":"Traveling Wilburys","cover":"https://i.scdn.co/image/ab67616d0000b273d9e06f988048ecf3c54ca749","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Come Tomorrow","artist":"Dave Matthews Band","cover":"https://i.scdn.co/image/ab67616d0000b273b27b9b65abca5a3c3a1021c2","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith& Jay Dee Daugherty& Lenny Kaye","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Let it Hiss","artist":"The Barr Brothers","cover":"https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566","year":"afro soul-afropop","hasSleeve":true},
  {"title":"Salesmen & Racists","artist":"Ike Reilly","cover":"https://i.scdn.co/image/ab67616d0000b273f63ef14157f7e8e0ed5e8113","year":"alt country-americana","hasSleeve":true},
  {"title":"The Horses and the Hounds","artist":"James McMurtry","cover":"https://i.scdn.co/image/ab67616d0000b27388ef788544886eb4cb162792","year":"alt country-americana","hasSleeve":true},
  {"title":"Love This Giant","artist":"David Byrne& St. Vincent","cover":"https://i.scdn.co/image/ab67616d0000b2731f1bafb7b062972bdd1f6cdc","year":"alt country-americana","hasSleeve":true},
  {"title":"Our Roots Run Deep","artist":"Dominique Fils-Aimé","cover":"https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e","year":"alt country-americana","hasSleeve":true},
  {"title":"Taffetas","artist":"Taffetas","cover":"https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791","year":"alt country-americana","hasSleeve":true},
  {"title":"Halcyon Days (Expanded Edition)","artist":"Bruce Hornsby","cover":"https://i.scdn.co/image/ab67616d0000b27318caaf52d7c2a553548f3e54","year":"alt country-americana","hasSleeve":true},
  {"title":"Hello Love","artist":"The Be Good Tanyas","cover":"https://i.scdn.co/image/ab67616d0000b2730050e6a23be3f843943930a8","year":"alt country-americana","hasSleeve":true},
  {"title":"Money (That's What I Want) [From Jim Beam's Live Music Series]","artist":"David Gray","cover":"https://i.scdn.co/image/ab67616d0000b2730c1b380dd74426a61febcdf9","year":"alt country-americana","hasSleeve":true},
  {"title":"Cafe Microphone / 32° Fahrenheit","artist":"Wilczynski","cover":"https://i.scdn.co/image/ab67616d0000b273caba7f127c7a27bfde00b31c","year":"alt country-americana","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"alt country-americana","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"alt country-americana","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Eric Church","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"alt country-americana","hasSleeve":true}
]
`);

const bottomBar = document.getElementById('bottom-bar');
const buttonPrev = document.getElementById('button-prev');
const buttonShow = document.getElementById('button-show');
const buttonNext = document.getElementById('button-next');
const titleContainer = document.getElementById('cratedigger-record-title');
const artistContainer = document.getElementById('cratedigger-record-artist');
const coverContainer = document.getElementById('cratedigger-record-cover');

function bindEvents() {
  buttonPrev.addEventListener('click', (e) => {
    e.preventDefault();
    cratedigger.selectPrevRecord();
  }, false);

  buttonShow.addEventListener('click', (e) => {
    e.preventDefault();
    if (cratedigger.getSelectedRecord()) {
      cratedigger.flipSelectedRecord();
    } else {
      cratedigger.selectNextRecord();
    }
  }, false);

  buttonNext.addEventListener('click', (e) => {
    e.preventDefault();
    cratedigger.selectNextRecord();
  }, false);
}

function fillInfoPanel(record) {
  if (record.data.title) {
    titleContainer.innerHTML = record.data.title;
  }
  if (record.data.artist) {
    artistContainer.innerHTML = record.data.artist;
  }
  if (record.data.cover) {
    coverContainer.style.backgroundImage = 'url(' + record.data.cover + ')';
  }
}

cratedigger.init({
  debug: false,
  elements: {
    rootContainer: document.getElementById('cratedigger'),
    canvasContainer: document.getElementById('cratedigger-canvas'),
    loadingContainer: document.getElementById('cratedigger-loading'),
    infoContainer: document.getElementById('cratedigger-info'),
  },
  onInfoPanelOpened() {
    bottomBar.classList.add('closed');
    fillInfoPanel(cratedigger.getSelectedRecord());
  },
  onInfoPanelClosed() {
    bottomBar.classList.remove('closed');
  },
});

cratedigger.loadRecords(data, true, () => {
  bindEvents();
});
