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

  onChangeCallback = (x: boolean) => {};

  handleChange(e: InputEvent) {
    this.value = (e.target as HTMLInputElement).value;
    this.onChangeCallback(true); // Let Shiny know we've changed
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._adoptBootstrapStyles();
  }

  private _adoptBootstrapStyles(): void {
    // TODO: loop through all the stylesheets and find the one that is bootstrap
    const bsStyles = document.styleSheets[1];

    // TODO: is this the best way to do this?
    const sheet = new CSSStyleSheet();
    for (let i = 0; i < bsStyles.cssRules.length; i++) {
      const rule = bsStyles.cssRules[i];
      sheet.insertRule(rule.cssText);
    }

    const root = this.renderRoot as ShadowRoot;
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }

  render() {
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
