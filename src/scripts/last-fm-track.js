class LastFMTrack extends HTMLElement {
  #

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <slot></slot>
      <span class="error-message" aria-live="polite"></span>
    `;
  }

  connectedCallback() {
    
  }

  disconnectedCallback() {

  }
}

customElements.define('last-fm-track', LastFMTrack);
