import { Codon } from './codon';
import { Gene } from './gene'

describe('Gen', () => {
  let gene: Gene;
  const codon = new Codon("GCA");
  const stopCodon = new Codon("UGA");
  const codonIncomplete = new Codon("UG");

  it('Add an valid codon to gene.', () => {
    gene = new Gene();
    gene.addCodon(codon);
    expect(
      gene.getCodons()[0]
    ).toBe(codon);
  });
  
  it('Try to add a codon that is not complete.', () => {
    gene = new Gene();
    expect(
      () => gene.addCodon(codonIncomplete)
    ).toThrow(
      ErrorCodonIncomplete(codonIncomplete)
    );
  });

  it('Try to add noise adding a stop codon when the gene is empty.', () => {
    gene = new Gene();
    gene.addCodon(stopCodon);
    expect(
      gene.getCodons()
    ).toStrictEqual([]);
  });
  it('Create a valid gene with a valid list of codons.', () => {
    gene = new Gene([codon]);
    expect(
      gene.getCodons()
    ).toStrictEqual([codon]);
  });

  it('Gene is complete.', () => {
    gene = new Gene([
      codon,
      stopCodon
    ]);
    expect(
      gene.isComplete()
    ).toBe(true);
  });

  it('Gene is not complete.', () => {
    gene = new Gene([codon]);
    expect(
      gene.isComplete()
    ).toBe(false);
  });

  it('Try to add a codon when the gene is complete.', () => {
    gene = new Gene([
      codon,
      stopCodon
    ]);
    expect(
      () => gene.addCodon(codon)
    ).toThrow(
      ErrorGenComplete()
    );
  });

  it('Try to create a gene with a list of codons that contains more codons after an stop codon.', () => {
    gene = new Gene();
    expect(
      () => gene = new Gene([
        codon,
        stopCodon,
        codon
      ])
    ).toThrow(
      ErrorGenComplete()
    );
    expect(
      gene.getCodons()
    ).toStrictEqual([]);    
  });

  function ErrorCodonIncomplete(codonIncomplete: Codon): string {
    return Gene.ERROR_CODON_INCOMPLETE
      .replace("$codon", codonIncomplete.getSequence());
  }

  function ErrorGenComplete(): string {
    return Gene.ERROR_GEN_COMPLETE;
  }
});