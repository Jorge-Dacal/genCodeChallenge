import { Codon } from './codon';
import { Gen } from './gen'

describe('Gen', () => {
  let gen: Gen;
  const codon = new Codon("GCA");
  const stopCodon = new Codon("UGA");
  const codonIncomplete = new Codon("UG");

  it('Add an valid codon to gen.', () => {
    gen = new Gen();
    gen.addCodon(codon);
    expect(
      gen.getCodons()[0]
    ).toBe(codon);
  });
  
  it('Try to add a codon that is not complete.', () => {
    gen = new Gen();
    expect(
      () => gen.addCodon(codonIncomplete)
    ).toThrow(
      ErrorCodonIncomplete(codonIncomplete)
    );
  });

  it('Try to add noise adding a stop codon when the gen is empty.', () => {
    gen = new Gen();
    gen.addCodon(stopCodon);
    expect(
      gen.getCodons()
    ).toStrictEqual([]);
  });
  it('Create a valid gen with a valid list of codons', () => {
    gen = new Gen([codon]);
    expect(
      gen.getCodons()
    ).toStrictEqual([codon]);
  });

  it('Gen is complete', () => {
    gen = new Gen([
      codon,
      stopCodon
    ]);
    expect(
      gen.isComplete()
    ).toBe(true);
  });

  it('Gen is not complete', () => {
    gen = new Gen([codon]);
    expect(
      gen.isComplete()
    ).toBe(false);
  });

  it('Try to add a codon when the gen is complete.', () => {
    gen = new Gen([
      codon,
      stopCodon
    ]);
    expect(
      () => gen.addCodon(codon)
    ).toThrow(
      ErrorGenComplete()
    );
  });

  it('Try to create a gen with a list of codons that contains more codons after an stop codon.', () => {
    gen = new Gen();
    expect(
      () => gen = new Gen([
        codon,
        stopCodon,
        codon
      ])
    ).toThrow(
      ErrorGenComplete()
    );
    expect(
      gen.getCodons()
    ).toStrictEqual([]);    
  });

  function ErrorCodonIncomplete(codonIncomplete: Codon): string {
    return Gen.ERROR_CODON_INCOMPLETE
      .replace("$codon", codonIncomplete.getSequence());
  }

  function ErrorGenComplete(): string {
    return Gen.ERROR_GEN_COMPLETE;
  }
});