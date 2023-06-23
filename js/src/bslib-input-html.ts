import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

import { makeInputBinding } from "./utils";

// =============================================================================
// WebComponent definition
// =============================================================================
export class BslibHtmlInput extends LitElement {
  @property({ type: String }) type: string = "text";
  @property({ type: String }) id: string = "id";
  @property({ type: String }) placeholder: string = "placeholder";
  @property({ type: String }) value: string = "";
  //@property({ type: Boolean }) floating: boolean = false;

  static styles = css``;

  onChangeCallback = (x: boolean) => {};

  handleChange(e: InputEvent) {
    console.log(e);
    // Let Shiny know we've changed
    this.onChangeCallback(true);
  }

  connectedCallback(): void {
    super.connectedCallback();
    const root = this.renderRoot as ShadowRoot;

    // TODO: loop through all the stylesheets and find the one that is bootstrap
    const bsStyles = document.styleSheets[1];

    // TODO: is this the most efficient way to do this?
    const sheet = new CSSStyleSheet();
    for (let i = 0; i < bsStyles.cssRules.length; i++) {
      const rule = bsStyles.cssRules[i];
      sheet.insertRule(rule.cssText);
    }

    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }

  render() {
    // TODO: put the label first if not floating?
    return html`
      <div class="form-floating">
        <input
          id=${this.id}
          type=${this.type}
          value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.handleChange}
          class="form-control"
        />
        <label for=${this.id}>
          <slot></slot>
        </label>
      </div>
    `;
  }
}

const ELEMENT_NAME = "bslib-input-html";

customElements.define(ELEMENT_NAME, BslibHtmlInput);

makeInputBinding(ELEMENT_NAME);

declare global {
  interface HTMLElementTagNameMap {
    ELEMENT_NAME: BslibHtmlInput;
  }
}
