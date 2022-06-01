export default class Figure {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = {backgroundImage: `url('${iconUrl}')`};
  }
}