import { Codon } from "./codon";

export class CommentAndIgnoreCharacters {
  public static readonly COMMENT_CHARACTER: string = ">";
  public static readonly IGNORED_CHARACTERS: string[] = [" ", "\t", "\r", "\n"]
  private comment: boolean;
  private newLine: boolean;
  
  constructor() {
    this.comment = false; 
    this.newLine = true;
  }

  /**
   * Analyze if the character must be ignored or not. Also analice if must start a comment and if we are on a newLine case. 
   * @param c the character to analyze
   * @returns true if character must be ignored
   */
   public characterMustBeIgnored(c: string): boolean {
    if(!this.comment) { // If we are not in comment, lets to see if charcater must be ignored or not
      if ( CommentAndIgnoreCharacters.IGNORED_CHARACTERS.includes(c) || c == CommentAndIgnoreCharacters.COMMENT_CHARACTER ) {
        switch (c) {
          case "\n":
            this.newLine = true;
            return true;
          case CommentAndIgnoreCharacters.COMMENT_CHARACTER:
            if (this.newLine) {
              this.comment = true;
              this.newLine = false;
              return true;
            } else {
              this.newLine = false;
              return false;
            }
        }
        this.newLine = false;
        return true;
      } else {
        this.newLine = false;
        return false;
      }
    } else { // During a comment, all the characters must be ignored
      this.checkCommentEnds(c);
      return true;
    }
  }
  
  /**
   * Used during a comment state, to analyze if the character readed is an enter to end the comment state.
   * @param c the character to analyze
   */
   private checkCommentEnds(c: string): void {
    if (c == "\n") {
      this.newLine = true;
      this.comment = false;
    }
  }
}
