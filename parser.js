/*
import React from "react";

const Component = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.14424 18.1111H14.8556M11.9999 1V2.22222M19.7781 4.22183L18.9139 5.08607M23 11.9999H21.7778M2.22222 11.9999H1M5.086 5.08607L4.22176 4.22182M7.67873 16.3212C5.29219 13.9347 5.29219 10.0654 7.67873 7.67882C10.0653 5.29228 13.9346 5.29228 16.3211 7.67882C18.7077 10.0654 18.7077 13.9347 16.3211 16.3212L15.6525 16.9899C14.8789 17.7634 14.4444 18.8126 14.4444 19.9065V20.5556C14.4444 21.9056 13.35 23 11.9999 23C10.6499 23 9.55549 21.9056 9.55549 20.5556V19.9065C9.55549 18.8126 9.12093 17.7634 8.3474 16.9899L7.67873 16.3212Z" stroke="#364766" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

);

export default Component;
*/
export class Parser {
    constructor(svg) {
        this.index = 0;
        this.result = "";
        this.svg = svg;
    }
    parse() {
        while (this.index < this.svg.length) {
            this.skipWhitespace();
            const currentChar = this.svg[this.index];
            if (currentChar === '"') {
                this.skipValue();
            }
            else if (currentChar === "<") {
                this.skipElementTag();
            }
            else if (this.isAlphaNumeric()) {
                this.parserAttribute();
            }
            this.move();
        }
    }
    skipValue() {
        while (this.svg[this.index] !== '"') {
            this.result += this.svg[this.index];
            this.move();
        }
    }
    move() {
        this.index++;
    }
    skipWhitespace() {
        while (this.svg[this.index] === " ") {
            this.result += this.svg[this.index];
            this.move();
        }
    }
    skipElementTag() {
        while (this.svg[this.index] !== " " || this.svg[this.index] !== ">") {
            this.result += this.svg[this.index];
            this.move();
        }
    }
    isAlphaNumeric() {
        const char = this.svg[this.index];
        return ((char >= "a" && char <= "z") ||
            (char >= "A" && char <= "Z") ||
            (char >= "0" && char <= "9"));
    }
    parserAttribute() {
        let attribute = "";
        while (this.svg[this.index] !== "=") {
            if (this.svg[this.index] === "-") {
                this.move();
                attribute += this.svg[this.index].toUpperCase();
            }
            attribute += this.svg[this.index];
            this.move();
        }
        this.result += attribute;
    }
}
