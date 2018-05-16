import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@nuxeo/nuxeo-elements/nuxeo-document.js';
import '@nuxeo/nuxeo-elements/nuxeo-page-provider.js';
import './shared-styles.js';

class DocReader extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles"></style>

    <nuxeo-document id="doc" auto doc-path="/default-domain/" response="{{document}}"></nuxeo-document>
    <nuxeo-page-provider auto
                     provider="advanced_document_content"
                     params="[[_computeParams(document)]]"
                     current-page="{{children}}">
    </nuxeo-page-provider>

    <div class="card">
      <div class="circle">P3</div>
      <h1>Polymer 3 - Doc Reader</h1>
      <h2>[[document.title]]</h2>
      <p>ID: [[document.uid]]</p>
      <p>Repository: [[document.repository]]</p>
      <p>State: [[document.state]]</p>
      <h3>Contributors:</h3>
      <ul>
        <template is="dom-repeat" items="[[document.properties.dc:contributors]]" as="contributor">
          <li>[[contributor]]</li>
        </template>
      </ul>

      <h3>Children:</h3>
      <ul>
        <template is="dom-repeat" items="[[children]]" as="child">
          <li>[[child.title]]</li>
        </template>
      </ul>
    </div>
  `;
  }

  _computeParams(document) {
    return document ? { ecm_parentId: this.document.uid } : {};
  }
}

window.customElements.define('p3-doc-reader', DocReader);
