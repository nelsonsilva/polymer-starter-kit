import {LitElement, html} from '@polymer/lit-element';
import '@nuxeo/nuxeo-elements/nuxeo-document.js';
import '@nuxeo/nuxeo-elements/nuxeo-page-provider.js';
import { stylesFromModule } from '@polymer/polymer/lib/utils/style-gather.js'
import './shared-styles.js';

class DocReader extends LitElement {

  static get properties() {
    return {
      _doc: Object,
      ppParams: Object,
      docChildren: Array
    }
  }

  render() {
    const {doc, ppParams, docChildren} = this;
    return html`
    ${stylesFromModule('shared-styles')}

    <nuxeo-document id="doc" auto doc-path="/default-domain" @response="${(e) => this.doc = e.detail.response}"></nuxeo-document>
    <nuxeo-page-provider auto
                     provider="advanced_document_content"
                    .params="${ppParams}"
                     @update="${(e) => this.docChildren = e.target.currentPage}">
    </nuxeo-page-provider>

    <div class="card">
      <div class="circle">Lit</div>
      <h1>LitElement - Doc Reader</h1>
      <h2>${doc && doc.title}</h2>
      <p>ID: ${doc && doc.uid}</p>
      <p>Repository: ${doc && doc.repository}</p>
      <p>State: ${doc && doc.state}</p>
      <h3>Contributors:</h3>
      <ul>
        ${doc && doc.properties['dc:contributors'].map((contributor) => html`<li>${contributor}</li>`)}
      </ul>
      <h3>Children:</h3>
      <ul>
        ${docChildren && docChildren.map((child) => html`<li>${child.title}</li>`)}
      </ul>
    </div>
  `;
  }

  set doc(doc) {
    this._doc = doc;
    this.ppParams = doc ? { ecm_parentId: doc.uid } : {};
  }

  get doc() {
    return this._doc;
  }
}

window.customElements.define('lit-doc-reader', DocReader);
