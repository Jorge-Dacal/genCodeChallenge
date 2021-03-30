import { Codon } from './codon'

describe('Codon', () => {
  let codon: Codon;
  const nucleotide: string = "A";
  const goodSequence: string = "CGU";
  const stopCodon: string = "UAG";
  const badNucleotide: string = "B";
  const badSequence: string = "CU" + badNucleotide;
  const badSequenceLong: string = "CGUA";

  it('Add a valid secuence to codon.', () => {
    codon = new Codon();
    codon.setSequence(goodSequence);
    expect(
      codon.getSequence()
    ).toBe(goodSequence.toLowerCase());
  });

  it('Create a valid codon', () => {
    codon = new Codon(goodSequence)
    expect(
      codon.getSequence()
    ).toBe(goodSequence.toLowerCase());
  });

  it('Try to create a codon with a bad sequence with a non nucleotid character.', () => {
    expect(
      () => new Codon(badSequence)
    ).toThrow(
      errorInvalidSequence(badSequence, badNucleotide)
    );
  });

  it('Try to add an invalid secuence with an invalid character to codon and check that codons continue equal.', () => {
    codon = new Codon(nucleotide);
    expect(
      () => codon.setSequence(badSequence)
    ).toThrow(
      errorInvalidSequence(badSequence, badNucleotide)
    );
    expect(
      codon.getSequence()
    ).toBe(nucleotide.toLowerCase());
  });

  it('Try to add an invalid secuence to codon and check that codons is equal. One that contains a character that is not nucleotide and another that have more lenght.', () => {
    codon = new Codon(nucleotide);
    expect(
      () => codon.setSequence(badSequenceLong)
    ).toThrow(
      errorInvalidSequenceLong(badSequenceLong)
    );
    expect(
      codon.getSequence()
    ).toBe(nucleotide.toLowerCase());
  });

  it('Add a valid nucleotide to codon', () => {
    codon = new Codon()
    codon.addNucleotide(nucleotide)
    expect(
      codon.getSequence()
    ).toBe(nucleotide.toLowerCase());
  });

  it('Try to add an invalid nucleotide to codon.', () => {
    codon = new Codon();
    expect(
      () => codon.addNucleotide(badNucleotide)
    ).toThrow(
      errorNotNucleotide(badNucleotide)
    );
  });

  it('Try to add a valid nucleotide when codon is complete', () => {
    codon = new Codon(goodSequence);
    expect(
      () => codon.addNucleotide(nucleotide)
    ).toThrow(
      errorCodonComplete()
    );
  });

  it('Check that codon is not completed', () => {
    codon = new Codon(nucleotide);
    expect(
      codon.isComplete()
    ).toBe(false);
  });

  it('Check that codon is comleted', () => {
    codon = new Codon(stopCodon);
    expect(
      codon.isComplete()
    ).toBe(true);
  });

  it('Codon is a stop codon', () => {
    codon = new Codon(stopCodon);
    expect(
      codon.isStopCodon()
    ).toBe(true);
  });

  it('Codon is not a stop codon', () => {
    codon = new Codon(goodSequence);
    expect(
      codon.isStopCodon()
    ).toBe(false);
  });

  function errorCodonComplete() {
    return Codon.ERROR_CODON_COMPLETE;
  }

  function errorNotNucleotide(badNucleotide: string) {
    return Codon.ERROR_NOT_NUCLEOTIDE.replace("$nucleotide", badNucleotide.toLowerCase());
  }

  function errorInvalidSequence(badSequence: string, badNucleotide: string): string {
    return Codon.ERROR_INVALID_SEQUENCE
      .replace("$sequence", badSequence)
      .replace("$e",errorNotNucleotide(badNucleotide));
  }

  function errorInvalidSequenceLong(badSequenceLong: string): string {
    return Codon.ERROR_INVALID_SEQUENCE
      .replace("$sequence", badSequenceLong)
      .replace("$e",errorCodonComplete());
  }
});