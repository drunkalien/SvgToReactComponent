export class SvgReactConverter {
  private svg: string;
  private index: number = 0;
  private result: string = "";

  constructor(svg: string) {
    this.svg = svg;
  }

  parse() {
    while (this.index < this.svg.length && this.svg[this.index] !== undefined) {
      this.skipWhitespace();
      const currentChar = this.svg[this.index];

      if (currentChar === '"') {
        this.skipValue();
      } else if (currentChar === "<") {
        this.skipElementTag();
      } else if (currentChar === ">") {
        this.result += ">";
        this.move();
      } else if (this.isAlphaNumeric()) {
        this.parseAttribute();
      } else {
        this.result += currentChar;
        this.move();
      }
    }
    return this.result;
  }

  skipElementTag() {
    // Skip the opening "<"
    this.result += this.svg[this.index];
    this.move();

    // Skip the tag name (e.g., "svg", "rect")
    while (this.isAlphaNumeric()) {
      this.result += this.svg[this.index];
      this.move();
    }

    // Now, either at a space (before attributes) or at ">"
    this.skipWhitespace();
  }

  parseAttribute() {
    let attribute = "";

    // Build the attribute name
    while (
      (this.isAlphaNumeric() && this.index < this.svg.length) ||
      this.svg[this.index] === "-"
    ) {
      if (this.svg[this.index] === "-") {
        this.move();
        attribute += this.svg[this.index].toUpperCase();
      } else {
        attribute += this.svg[this.index];
      }
      this.move();
    }

    this.result += attribute;
  }

  skipValue() {
    while (this.svg[this.index] !== '"' && this.index < this.svg.length) {
      this.result += this.svg[this.index];
      this.move();
    }

    // Add the closing quote
    if (this.svg[this.index] === '"') {
      this.result += this.svg[this.index];
      this.move();
    }
  }

  move() {
    this.index++;
  }

  skipWhitespace() {
    while (this.svg[this.index] === " " && this.index < this.svg.length) {
      this.result += this.svg[this.index];
      this.move();
    }
  }

  isAlphaNumeric() {
    const char = this.svg[this.index];
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      (char >= "0" && char <= "9")
    );
  }
}
