import { Gen } from "../gen";

export class ProcessRNASequenceDto {
  constructor(
    private gen?: Gen,
    private next?: boolean
  ) {
    if(gen != undefined) {
      this.setGen(gen)
    } else {
      this.gen = new Gen();
    }
    if(next != undefined) {
      this.next = next;
    } else {
      this.next = true;
    }
  }

  /**
   * Set the gen of the rna sequence analized
   * @param gen A gen completed
   */
  setGen(gen: Gen) {
    if(gen.isComplete) {
      this.gen = gen;
    } else {
      throw Error("ERROR: The gen is completed and you cannot add more codons.'");
    }
  }

  /**
   * @returns The gen analized
   */
  getGen() {
    return this.gen;
  }

  /**
   * @returns If the sequence of genes have more characteres to be analized that maybe returns a new gen.
   */
  hasNext() {
    return this.next;
  }

  /**
   * @returns If the sequence of genes is complete and there is no more genes to be analized.
   */
  complete() {
    return this.next = false;
  }
}