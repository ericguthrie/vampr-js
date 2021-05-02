class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.creator = null;
    this.offspring = [];
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (vampire.numberOfVampiresFromOriginal >= this.numberOfVampiresFromOriginal) {
      return true;
    } else {
      return false;
    }
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name, level = 0) {
    console.log("Tree:", Array(level).fill('  ').join(''), this.name);
    if (this.name === name) {
      return this;
    }

    // Depth
    for (const vamp of this.offspring) {
      let result = vamp.vampireWithName(name, level + 1);
      if (result) {
        return result;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let everyone = this.offspring;
    console.log("Total descendents");
  
    for (let i = 0; i < everyone.length; i++) {
      let vamp = everyone[i];
      everyone = everyone.concat(vamp.offspring);
      console.log("Everyone (amount):", everyone.length)
    }

    return everyone.length;

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let everyone = this.offspring;
    let vampiresAfter1980 = [];

    for (let i = 0; i < everyone.length; i++) {
      let vamp = everyone[i];
      everyone = everyone.concat(vamp.offspring);

      if (vamp.yearConverted > 1980) {
        vampiresAfter1980.push(vamp);
      }
    }

    return vampiresAfter1980;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;