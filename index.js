import cratedigger from './scripts/cratedigger';
const data = JSON.parse(`
[
  {"title":"Let it Hiss","artist":"The Barr Brothers","cover":"https://i.scdn.co/image/ab67616d0000b27392d68ffd58ad8ea4cf9be566","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Salesmen & Racists","artist":"Ike Reilly","cover":"https://i.scdn.co/image/ab67616d0000b273f63ef14157f7e8e0ed5e8113","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"The Horses and the Hounds","artist":"James McMurtry","cover":"https://i.scdn.co/image/ab67616d0000b27388ef788544886eb4cb162792","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Love This Giant","artist":"David Byrne& St. Vincent","cover":"https://i.scdn.co/image/ab67616d0000b2731f1bafb7b062972bdd1f6cdc","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Our Roots Run Deep","artist":"Dominique Fils-Aim√©","cover":"https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Taffetas","artist":"Taffetas","cover":"https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Halcyon Days (Expanded Edition)","artist":"Bruce Hornsby","cover":"https://i.scdn.co/image/ab67616d0000b27318caaf52d7c2a553548f3e54","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Hello Love","artist":"The Be Good Tanyas","cover":"https://i.scdn.co/image/ab67616d0000b2730050e6a23be3f843943930a8","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Money (That's What I Want) [From Jim Beam's Live Music Series]","artist":"David Gray","cover":"https://i.scdn.co/image/ab67616d0000b2730c1b380dd74426a61febcdf9","year":"acid jazz-jazz funk","hasSleeve":true},
  {"title":"Cafe Microphone / 32¬∞ Fahrenheit","artist":"Wilczynski","cover":"https://i.scdn.co/image/ab67616d0000b273caba7f127c7a27bfde00b31c","year":"acid jazz-jazz funk","hasSleeve":true},
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
  {"title":"Our Roots Run Deep","artist":"Dominique Fils-Aim√©","cover":"https://i.scdn.co/image/ab67616d0000b273810ebe4ee7d21b022a35980e","year":"alt country-americana","hasSleeve":true},
  {"title":"Taffetas","artist":"Taffetas","cover":"https://i.scdn.co/image/ab67616d0000b273923a878d3e0de9fb10993791","year":"alt country-americana","hasSleeve":true},
  {"title":"Halcyon Days (Expanded Edition)","artist":"Bruce Hornsby","cover":"https://i.scdn.co/image/ab67616d0000b27318caaf52d7c2a553548f3e54","year":"alt country-americana","hasSleeve":true},
  {"title":"Hello Love","artist":"The Be Good Tanyas","cover":"https://i.scdn.co/image/ab67616d0000b2730050e6a23be3f843943930a8","year":"alt country-americana","hasSleeve":true},
  {"title":"Money (That's What I Want) [From Jim Beam's Live Music Series]","artist":"David Gray","cover":"https://i.scdn.co/image/ab67616d0000b2730c1b380dd74426a61febcdf9","year":"alt country-americana","hasSleeve":true},
  {"title":"Cafe Microphone / 32¬∞ Fahrenheit","artist":"Wilczynski","cover":"https://i.scdn.co/image/ab67616d0000b273caba7f127c7a27bfde00b31c","year":"alt country-americana","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"alt country-americana","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"alt country-americana","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Eric Church","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"alt country-americana","hasSleeve":true},
  {"title":"I Won't Back Down","artist":"The Mighty Rootsmen& Toots & The Maytals& Gregory Isaacs& Mykal Rose","cover":"https://i.scdn.co/image/ab67616d0000b27371300435962e79c4d3c7f516","year":"alt country-americana","hasSleeve":true},
  {"title":"Sunrise In The Land Of Milk And Honey","artist":"Cracker","cover":"https://i.scdn.co/image/ab67616d0000b27363a16571d0382386dc2846ff","year":"alt country-americana","hasSleeve":true},
  {"title":"Daylight Savings Time","artist":"Steve Forbert","cover":"https://i.scdn.co/image/ab67616d0000b273653eaed759d9930c36805be9","year":"alt country-americana","hasSleeve":true},
  {"title":"The Cars","artist":"The Cars","cover":"https://i.scdn.co/image/ab67616d0000b273f725bc7907dcf15aa2c6e7b7","year":"alt country-americana","hasSleeve":true},
  {"title":"Honey Bones","artist":"DOPE LEMON","cover":"https://i.scdn.co/image/ab67616d0000b2736e5f26c11f97c7211fe5f4fb","year":"alt country-americana","hasSleeve":true},
  {"title":"Jah Victory","artist":"Alpha Blondy","cover":"https://i.scdn.co/image/ab67616d0000b27391f3bb8309fc2ef2066cabfe","year":"alt country-americana","hasSleeve":true},
  {"title":"Villa Amorini","artist":"Orions Belte","cover":"https://i.scdn.co/image/ab67616d0000b2739525069482163b8af80bf3c5","year":"alt country-americana","hasSleeve":true},
  {"title":"Blind Melon","artist":"Blind Melon","cover":"https://i.scdn.co/image/ab67616d0000b2737ed1df1690df31d094d7c2bc","year":"alt country-americana","hasSleeve":true},
  {"title":"The Traveling Wilburys, Vol. 1","artist":"Traveling Wilburys","cover":"https://i.scdn.co/image/ab67616d0000b273d9e06f988048ecf3c54ca749","year":"alt country-americana","hasSleeve":true},
  {"title":"Come Tomorrow","artist":"Dave Matthews Band","cover":"https://i.scdn.co/image/ab67616d0000b273b27b9b65abca5a3c3a1021c2","year":"alt country-americana","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"alt country-americana","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith& Jay Dee Daugherty& Lenny Kaye","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"alt country-americana","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Jackson Browne& Gregg Allman","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"alt country-americana","hasSleeve":true},
  {"title":"The Greatest Hits","artist":"Texas& John McElhone& Wu-Tang Clan& Robert F. \\"Prince Rakeem\\" Diggs","cover":"https://i.scdn.co/image/ab67616d0000b2733a1fb109b59d508c2acf724b","year":"alt country-americana","hasSleeve":true},

  {"title":"Nice, Nice, Very Nice (10th Anniversary Deluxe Edition)","artist":"Dan Mangan","cover":"https://i.scdn.co/image/ab67616d0000b2731bd0fb7cce906f89b7c1a641","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Magpie And The Dandelion (Deluxe)","artist":"The Avett Brothers","cover":"https://i.scdn.co/image/ab67616d0000b2739f7cabfabff0c2c64dbd0fae","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Journey Man","artist":"Colbey","cover":"https://i.scdn.co/image/ab67616d0000b27367c87cfcad680ea69affcee0","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Rastaman Vibration","artist":"Bob Marley & The Wailers","cover":"https://i.scdn.co/image/ab67616d0000b27396e1463315f7d1c84632e633","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"When the Night Feels My Song (Reimagined)","artist":"Bedouin Soundclash& Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b27343732cdab1c3aaf2638c2faa","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"The Max Romeo Catalog Chapter 1 - Verse 1-16","artist":"Max Romeo","cover":"https://i.scdn.co/image/ab67616d0000b2730c096957131d4a08d3475b96","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"At Your Service (Anthology)","artist":"Morphine","cover":"https://i.scdn.co/image/ab67616d0000b2733f3202c3327bca526f55d9bf","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Djin Djin","artist":"Angelique Kidjo& Peter Gabriel","cover":"https://i.scdn.co/image/ab67616d0000b273e57233b54a880463c5c429fa","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Havana Meets Kingston","artist":"Mista Savona& Julito Padron","cover":"https://i.scdn.co/image/ab67616d0000b27395a5fa55f8f9969534a54ddb","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"The Next Hundred Years","artist":"Ted Hawkins","cover":"https://i.scdn.co/image/ab67616d0000b27389525f5134cf5d741d52c138","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Live from the Bowling Alley","artist":"twiddy","cover":"https://i.scdn.co/image/ab67616d0000b2735bcd392373ebb4eb71352328","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"Africa","artist":"Amanaz","cover":"https://i.scdn.co/image/ab67616d0000b2731a3e9f74688b6c8f7fe97751","year":"alt country-americana-bluegrass","hasSleeve":true},
  {"title":"The Olympians","artist":"The Olympians","cover":"https://i.scdn.co/image/ab67616d0000b273dfb22883cfcb5dcd6d158d45","year":"alt country-americana-bluegrass","hasSleeve":true},

  {"title":"West Coast Mama","artist":"Deren Ney","cover":"https://i.scdn.co/image/ab67616d0000b273211366d64862cd2bd012d275","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Mothers & Daughters","artist":"Craig Cardiff","cover":"https://i.scdn.co/image/ab67616d0000b273a9f5002b07349416d840ee1a","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Strange Weirdos: Music From And Inspired By The Film Knocked Up","artist":"Loudon Wainwright III","cover":"https://i.scdn.co/image/ab67616d0000b2734054ad4034544e1d65497b06","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Time to Move On","artist":"Michigan Rattlers","cover":"https://i.scdn.co/image/ab67616d0000b273195f318aa3959e282fe56a80","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Battle Hymn of the Republic","artist":"Jon Batiste","cover":"https://i.scdn.co/image/ab67616d0000b27382b8a616d0cafa58178bf868","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Amassakoul","artist":"Tinariwen","cover":"https://i.scdn.co/image/ab67616d0000b27374757005c6b8a980d66e91eb","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Songbook","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b2736fb7596b0d83fcfaa274058e","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Be More Kind","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b273dce3805d8e00aac763236018","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Outside Society","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2738c26f65cf6d2eb781a73cbdc","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Jackson Browne& Gregg Allman","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"All My Friends: Celebrating The Songs & Voice Of Gregg Allman","artist":"Allman Brothers Band","cover":"https://i.scdn.co/image/ab67616d0000b273ca7965d1a450596137778f6a","year":"alt country-americana-outlaw country","hasSleeve":true},
  {"title":"Vol. 1","artist":"BROS","cover":"https://i.scdn.co/image/ab67616d0000b273151317b361cb89b3a014dd07","year":"alt country-americana-outlaw country","hasSleeve":true},

  {"title":"Love Is A Wish Away","artist":"FaithNYC","cover":"https://i.scdn.co/image/ab67616d0000b273150b2b0164feb9d7fcd4a6f0","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Lift Your Spirit","artist":"Aloe Blacc","cover":"https://i.scdn.co/image/ab67616d0000b2734de16370db3ca53c8e29e72f","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"II (10 Year Anniversary Edition)","artist":"Unknown Mortal Orchestra","cover":"https://i.scdn.co/image/ab67616d0000b273172b71645a2626c9cb34e300","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Malibu","artist":"Anderson .Paak","cover":"https://i.scdn.co/image/ab67616d0000b273f8e77075414234fd77fce32b","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Cluster Flies","artist":"Sylvan Esso","cover":"https://i.scdn.co/image/ab67616d0000b273b7010afabacdcf6536e8f361","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Mordechai","artist":"Khruangbin","cover":"https://i.scdn.co/image/ab67616d0000b273f94c16116e5e2e850af916d3","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"The Revivalists","artist":"The Revivalists","cover":"https://i.scdn.co/image/ab67616d0000b273130f93eb55c01218ba6939f9","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Chris Thile & Brad Mehldau","artist":"Chris Thile& Brad Mehldau","cover":"https://i.scdn.co/image/ab67616d0000b2737a2358b47feab5e9340e61ce","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Chet Atkins Certified Guitar Player","artist":"Chet Atkins& Mark Knopfler","cover":"https://i.scdn.co/image/ab67616d0000b2735aa4f6a4653dbc89dfab4658","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Be More Kind","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b273dce3805d8e00aac763236018","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Dream Of Life","artist":"Patti Smith","cover":"https://i.scdn.co/image/ab67616d0000b2733763d1cb36a0f79d7a198a0a","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Carry the Fire","artist":"Delta Rae& Lindsey Buckingham","cover":"https://i.scdn.co/image/ab67616d0000b27349aaf14f0936159764cd728a","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},
  {"title":"Eric McFadden does AC/DC (Acoustic Tribute)","artist":"Eric McFadden","cover":"https://i.scdn.co/image/ab67616d0000b273cddfc52b0f03f4a56828acd5","year":"alt country-americana-outlaw country-red dirt-texas country-roots rock","hasSleeve":true},

  {"title":"Pop Oud #2","artist":"Les Dynamites","cover":"https://i.scdn.co/image/ab67616d0000b2730c81e260743adad87ece7676","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Long Story Short: Willie Nelson 90 (Live At The Hollywood Bowl)","artist":"Ziggy Marley","cover":"https://i.scdn.co/image/ab67616d0000b2730d5328e56626d0a77bb0b53f","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Tomorrow Morning (Deluxe)","artist":"Eels","cover":"https://i.scdn.co/image/ab67616d0000b273b32b868b66c576c9c264a0a8","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Hello Starling","artist":"Josh Ritter","cover":"https://i.scdn.co/image/ab67616d0000b273c05b09ba8de646a48fe53fcf","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"White Moth","artist":"Xavier Rudd","cover":"https://i.scdn.co/image/ab67616d0000b273e0b6e20c4d70ebb46a3eb0cc","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Favorites","artist":"The Supremes","cover":"https://i.scdn.co/image/ab67616d0000b273e6bee0d562bda5b6237996f8","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Mad Dogs & Englishmen (Deluxe Edition)","artist":"Joe Cocker","cover":"https://i.scdn.co/image/ab67616d0000b273c26d29e0574c83b3e2ab6371","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"From The Ground Up","artist":"John Fullbright","cover":"https://i.scdn.co/image/ab67616d0000b273ec1ee525a147d369bca9eef1","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Adventure","artist":"Lydian Collective","cover":"https://i.scdn.co/image/ab67616d0000b2734b2cd72576601e9cc6c9a25b","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Be More Kind","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b273dce3805d8e00aac763236018","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"I Do Not Want What I Haven't Got","artist":"Sin√©ad O'Connor","cover":"https://i.scdn.co/image/ab67616d0000b2736f6536c2e326fb2b42db90f8","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Hope the High Road","artist":"Jason Isbell and the 400 Unit","cover":"https://i.scdn.co/image/ab67616d0000b273f041f136a4faea8356d8811f","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Alfa Romeo","artist":"Mac Hanson","cover":"https://i.scdn.co/image/ab67616d0000b273cfee37e97e42f473d29ae005","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Walk Faster","artist":"Macadam Crocodile","cover":"https://i.scdn.co/image/ab67616d0000b273c074a844ee6a76232c2bbb07","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Strictly A One-Eyed Jack","artist":"John Mellencamp","cover":"https://i.scdn.co/image/ab67616d0000b273469af8f55b559334071ae9f9","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Magic City Thrill","artist":"James Tillman","cover":"https://i.scdn.co/image/ab67616d0000b27382a2451d708d00ce2b486be6","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"I'm Good Now","artist":"Bob Schneider","cover":"https://i.scdn.co/image/ab67616d0000b273ada52ffaa777929fd151f8c1","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Canaries in a Coal Mine","artist":"Bukahara","cover":"https://i.scdn.co/image/ab67616d0000b273f46f70bcbc37d92ebf959fac","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Wavelength","artist":"Van Morrison","cover":"https://i.scdn.co/image/ab67616d0000b273bad7dd1bb61103d0e71dc0b5","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Queen of the Minor Key","artist":"Eilen Jewell","cover":"https://i.scdn.co/image/ab67616d0000b2730e19f19aaca37f7edfc6ed51","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Austin","artist":"Matthew Logan Vasquez","cover":"https://i.scdn.co/image/ab67616d0000b27329144767f7087d7014fe40b7","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Children of Light","artist":"AQUA STONE THRONE","cover":"https://i.scdn.co/image/ab67616d0000b273b8212da81e41476b2efbc019","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Be More Kind","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b273dce3805d8e00aac763236018","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"I Do Not Want What I Haven't Got","artist":"Sin√©ad O'Connor","cover":"https://i.scdn.co/image/ab67616d0000b2736f6536c2e326fb2b42db90f8","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Freedom","artist":"Neil Young","cover":"https://i.scdn.co/image/ab67616d0000b27349862db9cbce96b19c03c3c6","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Like a Bird, Like a Plane","artist":"Charlie Mars","cover":"https://i.scdn.co/image/ab67616d0000b273ab41b018fcf7fb93b8f6af70","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Face the Music","artist":"Electric Light Orchestra","cover":"https://i.scdn.co/image/ab67616d0000b273f309550529487fe09f3ff041","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Discreet Music","artist":"Brian Eno","cover":"https://i.scdn.co/image/ab67616d0000b273b540c9476ea9425a2bd6d3ec","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Evil Plan","artist":"Ukandanz","cover":"https://i.scdn.co/image/ab67616d0000b273461bc8f7026536da909196e0","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Bang Bang Boom Boom","artist":"Beth Hart","cover":"https://i.scdn.co/image/ab67616d0000b2736b5f77b7966a82a998cfda24","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"All the Love in the World","artist":"MC YOGI","cover":"https://i.scdn.co/image/ab67616d0000b2731ae6807ea26ed12dcf78365d","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"American Patchwork","artist":"Anders Osborne","cover":"https://i.scdn.co/image/ab67616d0000b2730579f666c1149d49a77f1e3e","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Bobby Alu","artist":"Bobby Alu","cover":"https://i.scdn.co/image/ab67616d0000b2734824c01e17b7d67db29bf273","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Extraordinary Renditions","artist":"Nil√ºfer Yanya","cover":"https://i.scdn.co/image/ab67616d0000b273fb156eeb4ff1552379483d36","year":"alt country-americana-roots rock","hasSleeve":true},
  {"title":"Undefeated","artist":"Frank Turner","cover":"https://i.scdn.co/image/ab67616d0000b273a240f004cd8c693b7bc827a7","year":"alt country-americana-roots rock","hasSleeve":true}
]
`);

// ---------- original UI wiring ----------
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
  if (record?.data?.title) titleContainer.textContent = record.data.title;
  if (record?.data?.artist) artistContainer.textContent = record.data.artist;
  if (record?.data?.cover) coverContainer.style.backgroundImage = 'url(' + record.data.cover + ')';
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

// load the hard-coded array (same call pattern as your original file)
cratedigger.loadRecords(data, true, () => {
  bindEvents();
});
