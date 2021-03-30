import { CommentAndIgnoreCharacters } from "./commentAndIgnoreCharacters";

describe('CommentAndIgnoreCharacters', () => {
  let commentAndIgnoreCharacters: CommentAndIgnoreCharacters;
  const characterNotIgnored: string = "b";
  const comment: string = ">"
  const witheSpace: string = " ";
  const endline: string = "\n";
  const tab: string = "\t";
  const carriageReturn: string = "\r";

  
  it('Try with a character that must not be ignored.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(characterNotIgnored)
    ).toBe(false);
  });
  
  it('CarriageReturn, witheSpace and tab characters must be ignored.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(carriageReturn)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(witheSpace)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(tab)
    ).toBe(true);
  });

  it('Comments works and ignore the charactes even if they were not normally.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(comment)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(characterNotIgnored) // this time in a comment the character must be ignored
    ).toBe(true);
  });

  it('Comments ends with an endline and the next character is not ignored.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(comment)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(endline)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(characterNotIgnored) // this time out of a comment the character must do not be ignored
    ).toBe(false);
  });

  it('Try that comment cannot start at mid sentence.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(witheSpace)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(comment)
    ).toBe(false);
  });

  it('Comment can start after endline.', () => {
    commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(endline)
    ).toBe(true);
    expect(
      commentAndIgnoreCharacters.characterMustBeIgnored(comment)
    ).toBe(true);
  });
});