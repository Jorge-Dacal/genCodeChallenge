import { Nucleotides } from "./enum/nucleotides.enum";
import { StopCodons } from "./enum/stopCodons.enum";

export class Codon {
  public static readonly ERROR_NOT_NUCLEOTIDE: string = "ERROR: The nucleotide '$nucleotide' is not valid. Nucleotides can only be: " + Object.keys(Nucleotides);
  public static readonly ERROR_CODON_COMPLETE: string = "ERROR: A sequence of nucleotides can only contains 3, you cannot add more."
  public static readonly ERROR_INVALID_SEQUENCE: string = "ERROR: The sequence '$sequence' is not a valid sequence to be set. REASON:\n  $e"

  constructor(
    private sequence?: string
  ) {
    if(sequence != undefined) {
      this.setSequence(sequence);
    } else {
      this.sequence = "";
    }
  }

  /**
   * Add a nucleotide to the codon sequence.
   * @param nucleotide Nucleotide to be added in the sequence
   */
   public addNucleotide(nucleotide: string): void {

    nucleotide = nucleotide.toLowerCase();
    if (!this.isNucleotide(nucleotide)) {
      const errorMessage = Codon.ERROR_NOT_NUCLEOTIDE.replace("$nucleotide", nucleotide);
      throw Error(errorMessage)
    }
    if (this.sequence.length < 3) {
      this.sequence += nucleotide;
    } else {
      throw Error(Codon.ERROR_CODON_COMPLETE);
    }
  }

  /**
   * Try to set the sequence of the codon checking if the value of it is correct.
   * @param sequence The sequence to be set
   */
   public setSequence(sequence: string): void {
    let auxCodon: Codon = new Codon;
    try {
      for (let c of sequence) {
        auxCodon.addNucleotide(c);
      }
    } catch (e) {
      const errorMessage = Codon.ERROR_INVALID_SEQUENCE.replace("$sequence", sequence).replace("$e",e.message);
      throw Error(errorMessage);
    }
    this.sequence = auxCodon.getSequence();
  }

  /**
   * Check if the value passed as a parameter is a valid value for a nucleotide.
   * @param nucleotide The value to check
   * @returns If its a nucleotide.
   */
   private isNucleotide(nucleotide: string): boolean {
    return nucleotide in Nucleotides;
  }

  /**
   * @returns Return if the sequence is an stop condon.
   */
   public isStopCodon(): boolean {
    return this.sequence in StopCodons;
  }

  /**
   * @returns Return if the sequence is completed with 3 nucleotides.
   */
   public isComplete(): boolean {
    return (this.sequence.length == 3)
  }

  /**
   * @returns The Codon sequence value.
   */
   public getSequence(): string {
    return this.sequence;
  }
}
