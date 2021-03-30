import { Codon } from "./codon";

export class Gene {
  public static readonly ERROR_GEN_COMPLETE: string = "ERROR: The gene is completed and you cannot add more codons."
  public static readonly ERROR_CODON_INCOMPLETE: string = "ERROR: The sequence of the codon '$codon' is not completed. To be added to gene it must have 3 nucleotides."

  constructor(
    private codons?: Codon[]
  ) {
    this.codons = [];
    if (codons != undefined) {
      codons.forEach(codon => {
        this.addCodon(codon);
      });
    }
  }

  /**
   * Add a codon to the codons list of the genonly if gene is not complete.
   * @param codon The codon to add.
   */
  public addCodon(codon: Codon): void {
    if (this.isComplete()) {
      throw Error(Gene.ERROR_GEN_COMPLETE);
    }
    if (!codon.isComplete()) {
      const errorMessage = Gene.ERROR_CODON_INCOMPLETE.replace("$codon", codon.getSequence());
      throw Error(errorMessage);
    }
    if (codon.isStopCodon()) {
      if (this.isNotEmpty()) { // If is empty must ignore the noise of StopCodons sequences.
        this.codons.push(codon);
        // this.completed = true;
      }
    } else {
      this.codons.push(codon);
    }
  }

  /**
   * @returns If the gene is completed with a sequence of codons that finish with a stop codon
   */
  public isComplete(): boolean {
    if (this.isNotEmpty()) {
      const lastCodon = this.codons[this.codons.length - 1];
      return lastCodon.isStopCodon()
    } else {
      return false;
    }
  }

  /**
   * @returns Get the Codons of the Gen
   */
   public getCodons(): Codon[] {
    return this.codons;
  }

  /**
   * @returns True if the codons list is not empty.
   */
  private isNotEmpty() {
    return this.codons.length > 0
  }
}
