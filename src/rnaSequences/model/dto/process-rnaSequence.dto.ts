import { Gene } from "../gene";

export class ProcessRNASequenceDto {
  constructor(
    private gene?: Gene,
    private next?: boolean
  ) {
    if(gene != undefined) {
      this.setGene(gene)
    } else {
      this.gene = new Gene();
    }
    if(next != undefined) {
      this.next = next;
    } else {
      this.next = true;
    }
  }

  /**
   * Set the gene of the rna sequence analized
   * @param gene A gene completed
   */
  public setGene(gene: Gene): void {
    if(gene.isComplete) {
      this.gene = gene;
    } else {
      throw Error("ERROR: The gene is completed and you cannot add more codons.'");
    }
  }

  /**
   * @returns The gene analized
   */
  public getGene(): Gene {
    return this.gene;
  }

  /**
   * @returns If the sequence of genes have more characteres to be analized that maybe returns a new gene.
   */
  public hasNext(): boolean {
    return this.next;
  }

  /**
   * @returns If the sequence of genes is complete and there is no more genes to be analized.
   */
  public complete(): boolean {
    return this.next = false;
  }
}