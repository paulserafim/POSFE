import { LitElement, html, css } from "lit-element";

import { getData, postData, putData } from "./ServerOperations";
import { read, write, removeItem, removeAll } from "./Storage";

export class BonFiscalApp extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: "Helvetica Neue";
      }

      /* Add a white background color to the top navigation */
      .topnav {
        background-color: #501714;
        overflow: hidden;
        border-radius: 0.5rem;
      }

      /* Style the links inside the navigation bar */
      .topnav a {
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 0.875rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        font-family: "Helvetica Neue";
        text-decoration: none;
        font-size: 0.9rem;
        border-radius: 0.25rem;
      }

      /* Change the color of links on hover */
      .topnav a:hover {
        background-color: #f5f5f5;
        color: black;
      }
      a:visited {
        text-decoration: none;
      }

      /* Add a color to the active/current link */
      .topnav a.active {
        background-color: #4caf50;
        color: white;
      }

      .Adauga {
        background-color: #5bc0de;
        background-repeat: no-repeat;
        background-image: url("src/Media/plus-square.svg");
        background-position: 0.5rem center;
        border: none;
        color: white;
        padding: 1rem 1rem 1rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.5rem;
        margin: 0.5rem;
      }

      .tableFixHead {
        overflow-y: auto;
        height: 25.25rem;
      }

      .tableFixHeadIncasare {
        overflow-y: auto;
        height: 9.5rem;
      }

      .tableFixHead thead th {
        position: sticky;
        top: 0;
      }
      table {
        border-collapse: collapse;
        width: 95%;
      }

      th,
      td {
        padding: 0.5rem 0.5rem;
        text-align: center;
        font-family: "Helvetica Neue";
        border-color: #c0c0c0;
        font-size: 0.7rem;
      }

      td {
        border: 0.06rem solid #ccc;
      }
      th {
        background: #501714;
        color: white;
      }
      tr:hover {
        background-color: #f5f5f5;
      }

      .cancelledItem {
        background-color: #d9534f;
      }

      .pressedButton {
        color: #d9534f;
      }

      .column {
        float: left;
      }

      .left {
        width: 35%;
      }
      .right {
        width: 35%;
      }

      .middle {
        width: 30%;
      }

      .keyboard {
        width: 33%;
      }

      #totalFieldset {
        background-color: #d9534f;
      }

      #totalFieldset td {
        color: white;
        font-size: 1rem;
        text-align: right;
        padding: 0.5rem;
      }

      #totalFieldset table tr td {
        border: none;
        pointer-events: none;
      }

      #denumireProdusGasita {
        width: 18.5rem;
      }

      button {
        border-radius: 0.25rem;
        background-color: #f0ad4e;
        border: none;
        color: white;
        padding: 1rem 2rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        width: 40%;
        margin-bottom: 0.5rem;
      }

      .tastatura {
        background-color: #d9534f;
        background-repeat: no-repeat;
        background-image: url("src/Media/keyboard.svg");
        background-position: 0.5rem center;
        color: white;
        padding: 1rem 1rem 1rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.5rem;
        width: 10%;
      }

      .keypadButton {
        border-radius: 0.25rem;
        background-color: #f0ad4e;
        border: none;
        color: white;
        padding: 1rem 2rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        width: 30%;
        margin-bottom: 0.5rem;
      }

      .keypadButtonAlphabet {
        border-radius: 0.25rem;
        background-color: #f0ad4e;
        border: none;
        color: white;
        padding: 1rem 2rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
        width: 5%;
      }

      .listareButton {
        background-color: #5cb85c;
        width: 24%;
        padding-top: 3.4rem;
        padding-bottom: 3.4rem;
      }

      .subtotalButton {
        background-color: #5bc0de;
        width: 24%;
        padding-top: 3.4rem;
        padding-bottom: 3.4rem;
      }

      .anuleazaButton {
        background-color: #d9534f;
        width: 25%;
        padding-top: 3.4rem;
        padding-bottom: 3.4rem;
      }

      .inAsteptareButton {
        width: 25%;
        padding-top: 3.4rem;
        padding-bottom: 3.4rem;
      }

      .metodaDePlataButton {
        font-size: 0.75rem;
        padding: 1rem;
      }

      .backspace {
        padding-left: 4.2rem;
        padding-right: 4.2rem;
      }

      .zero {
        padding-left: 2rem;
        padding-right: 2rem;
      }
      .comma {
        padding-left: 2.15rem;
        padding-right: 2.15rem;
      }

      .return {
        padding-left: 1.7rem;
        padding-right: 1.7rem;
      }

      .discountButton {
        font-size: 0.75rem;
        margin: 0.38rem;
      }

      .columnTaste {
        float: left;
        width: 33.33%;
      }

      .alfa-column-left {
        float: left;
        width: 60%;
      }
      .alfa-column-right {
        float: left;
        width: 40%;
      }
      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      .tasteRapide {
        text-align: left;
        font-size: 0.75rem;
        width: 7.2rem;
        height: 7.2rem;
      }

      fieldset {
        border-radius: 0.25rem;
      }

      button {
        border-radius: 0.25rem;
        background-color: #f0ad4e;
        border: none;
        color: white;
        padding: 1rem 2rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      .searchButton {
        background-color: #5bc0de;
        background-repeat: no-repeat;
        background-image: url("src/Media/search.svg");
        background-position: center;
        padding: 1rem;
        display: inline-block;
      }

      .clearButton {
        background-color: #5bc0de;
        background-repeat: no-repeat;
        background-image: url("src/Media/eraser.svg");
        background-position: center;
        padding: 1rem;
        display: inline-block;
      }

      .actualizareButton {
        width: 20rem;
      }

      .inputNumber,
      .unitateDeMasuraInput,
      #procentTVAInput,
      #unitateDeMasuraInput {
        width: 3.75rem;
      }

      .column {
        float: left;
      }

      .left {
        width: 50%;
      }

      .right {
        width: 50%;
      }

      /* The Modal (background) */
      .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 1rem; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 1.25rem;
        border: 0.06rem solid #888;
        width: 70%;
      }

      /* Modal Content */
      .modal-content-number-keypad {
        background-color: #fefefe;
        margin: auto;
        padding: 1.25rem;
        border: 0.06rem solid #888;
        width: 33%;
      }

      .modal-content-alphanumeric-keypad {
        background-color: #fefefe;
        margin: auto;
        padding: 1.25rem;
        border: 0.06rem solid #888;
        width: 80%;
      }

      .Salvare {
        background-color: #5bc0de;
        background-repeat: no-repeat;
        background-image: url("src/Media/save.svg");
        background-position: 0.5rem center;
        border: none;
        color: white;
        padding: 1rem 1rem 1rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.5rem;
        margin: 0.5rem;
      }

      .Sterge {
        background-color: #d9534f;
        background-repeat: no-repeat;
        background-image: url("src/Media/trash.svg");
        background-position: 0.5rem center;
        border: none;
        color: white;
        padding: 1rem 1rem 1rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 0.8rem;
        border-radius: 0.5rem;
        margin: 0.5rem;
      }

      label,
      select,
      input,
      textarea,
      option {
        display: inline-block;
        text-align: left;
        width: 8.75rem;

        padding: 0.25rem;
        margin: 0.25rem;
      }

      .tableFixHead {
        overflow-y: auto;
        max-height: 30rem;
      }
      .tableFixHead thead th {
        position: sticky;
        top: 0;
      }
      table {
        border-collapse: collapse;
        width: 95%;
      }

      th,
      td {
        padding: 0.5rem 1rem;
        text-align: center;
        font-family: "Helvetica Neue";
        border-color: #c0c0c0;
        margin: 1rem;
        font-size: 0.7rem;
      }

      td {
        border: 0.06rem solid #ccc;
      }
      th {
        background: #501714;
        color: white;
      }
      tr:hover {
        background-color: #f5f5f5;
      }

      @media only screen and (max-width: 800px) and (max-height: 1280px) {
        .column {
          float: left;
        }

        .left {
          width: 100%;
        }
        .middle {
          width: 100%;
        }

        .right {
          width: 100%;
        }

        .tableFixHead {
          overflow-y: auto;
          height: 20rem;
        }

        #denumireProdusGasita {
          width: 45rem;
        }
      }

      @media only screen and (max-width: 750px) and (max-height: 1334px) {
        .column {
          float: left;
        }

        .left {
          width: 100%;
        }
        .middle {
          width: 100%;
        }
        .right {
          width: 100%;
        }

        .tableFixHead {
          overflow-y: auto;
          height: 29rem;
        }

        .listareButton {
          background-color: #5cb85c;
          width: 32%;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        .subtotalButton {
          background-color: #5bc0de;
          width: 24%;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }

        .anuleazaButton {
          background-color: #d9534f;
          width: 25%;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .inAsteptareButton {
          width: 25%;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      indexTabel: Number,
      indexTabelIncasare: Number,
      tasteRapide: Array,
      denumireProdusGasit: String,
      umProdusGasit: String,
      pretProdusGasit: Number,
      codInternGasit: Number,
      valoareTVAGasit: Number,
      idProdusGasit: Number,
      intrareBonFiscalList: Array,
      produseDupaDenumire: Array,
      grupaTVA: Array,
      unitateDeMasura: Array,
      incasareList: Array,
      activeElement: Object,
      subtotalClicked: Boolean,
      discountPercentage: Number,
      discountValue: Number,
      increasePercentage: Number,
      increaseValue: Number,
      bonFiscal: Object,
    };
  }

  constructor() {
    super();
    this.indexTabel = 1;
    this.indexTabelIncasare = 1;
    this._checkIfStorageValuesExistAndInitilizareIfNot();
    this.tasteRapide = [];
    this.denumireProdusGasit = "";
    this.tasteRapide = read("tasteRapide");
    this.grupaTVA = read("grupaTVA");
    this.unitateDeMasura = read("unitateDeMasura");
    this.incasareList = [];
    this.intrareBonFiscalList = [];
  }

  render() {
    this.indexTabel = 1;
    this.indexTabelIncasare = 1;
    write(this.bonFiscal.intrareBonFiscalList, "intrareBonFiscalBonDeschis");
    write(this.bonFiscal.incasareList, "incasareListBonDeschis");
    return html`<div id="myModalDenumire" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span
        @click=${this._closeModalDenumire}
        id="closeButton"
        class="close"
        >&times;</span
      >
      <h2>Denumire articole</h2>
      <div class="tableFixHead">
        <table>
          <thead>
            <th>Denumire</th>
            <th>Cod Extern</th>
            <th>Cod Intern</th>
            <th>Pret</th>
            <th>Procent TVA</th>
            <th>Unitate de masura</th>
            <th>Adauga</th>
          </thead>
          <tbody>
            ${
              this.produseDupaDenumire != null
                ? html` ${this.produseDupaDenumire.map(
                    (dataRow) => html`<tr>
                      <td>${dataRow.denumire}</td>
                      <td>${dataRow.codExtern}</td>
                      <td>${dataRow.codIntern}</td>
                      <td>
                        ${dataRow.pret != null
                          ? dataRow.pret.toPrecision(4)
                          : "-"}
                      </td>
                      <td>${dataRow.valoareTVA}</td>
                      <td>${dataRow.unitateDeMasura}</td>
                      <td>
                        <button
                          @click=${this._onAdaugaClick}
                          class="Adauga"
                          id=${dataRow.codExtern}
                          type="button"
                        ></button>
                      </td>
                    </tr>`
                  )}`
                : html``
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="column left">
      <fieldset>
        <legend>Detalii bon</legend>
        <div class="row">
          <div class="column">
            <label
            @click=${this._onCodExternClick}
            for="codExternInput">Cod extern: </label>
            <input
              @focus=${this._onFocusCodExtern}
              @keyup=${this._onInputKeyUpCodExtern}
              type="text"
              name="codExtern"
              id="codExternInput"
            />
            <br />
            <label for="cantitateInput">Cantitate: </label>
            <input
              @keyup=${this._onInputKeyUpCantitate}
              @focus=${this._onFocusCantitate}
              type="text"
              name="cantitate"
              id="cantitateInput"
              min="0"
              step="0.01"
              onfocus="this.value=''"
            /><br />
            <label for="denumireProdus">Denumire: </label>
            <input
              @keyup=${this._onInputKeyUpDenumire}
              @focus=${this._onFocusDenumire}
              type="text"
              name="denumireProdus"
              id="denumireProdusInput"
              onfocus="this.value=''"
            /><br />
            <label for="CUIInput">Cod fiscal: </label>
            <input
              type="text"
              name="CUI"
              id="CUIInput"
              onfocus="this.value=''"
              value=${this.bonFiscal.cui}
              @focus=${this._onFocusCUI}
            /><br />
            <input
              id="denumireProdusGasita"
              value=${this.denumireProdusGasit}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Bon fiscal nr. ${this.bonFiscal.id} -  ${
      this.bonFiscal.status
    }</legend>
        <div class="tableFixHead">
          <table>
            <thead>
              <th>Nr. crt.</th>
              <th>Articol</th>
              <th>Pret</th>
              <th>Cantitate</th>
              <th>D/M v.</th>
              <th>D/M %</th>
              <th>Sterge</th>
            </thead>
            <tbody>
              ${read("intrareBonFiscalBonDeschis")
                .reverse()
                .map(
                  (dataRow) => html`<tr
                    class=${dataRow.cancelled == true ? "cancelledItem" : ""}
                  >
                    <td>${this.indexTabel}</td>
                    <td>${dataRow.produs.denumire}</td>
                    <td>${dataRow.produs.pret}</td>
                    <td>
                      <input
                        class="cantitateInput"
                        .value=${dataRow.cantitate}
                        step="0.01"
                        id="${this.indexTabel++}"
                        style="width: 2rem;"
                        @change=${this._onInputChange}
                        type="number"
                      />
                    </td>
                    <td>
                      <input
                        class="discountValoricInput"
                        style="width: 2rem;"
                        value="0"
                        step="0.01"
                        type="number"
                        @change=${this._onInputChange}
                      />
                    </td>
                    <td>
                      <input
                        class="discountProcentualInput"
                        style="width: 2rem;"
                        value="0"
                        step="0.01"
                        type="number"
                        @change=${this._onInputChange}
                      />
                    </td>
                    <td>
                      <button
                        class="Sterge"
                        @click=${this._onStergeClick}
                        id=${read("intrareBonFiscalBonDeschis").length -
                        this.indexTabel +
                        1}
                        type="button"
                      ></button>
                    </td>
                  </tr>`
                )}
            </tbody>
          </table>
        </div>
      </fieldset>
      ${this._displayButtonsInrelationToBonFiscalStatus()}
    </div>
    <div class="column middle">
      <div id="modalNumberKeypad" class="modal">
        <!-- Modal content -->
        <div class="modal-content-number-keypad">
          <span
            @click=${this._closeModalNumberKeypad}
            id="closeButton"
            class="close"
            >&times;</span
          >
          <h2>Tastatura numerica</h2>
          <label for="numericValueInput">Valoare:</label>
          <input id="numericValueInput" type="text">
          <fieldset class="keypad">
            <button
              @click=${this._onNumberKeypadValueClick}
              id="keyESC"
              class="keypadButton"
            >
              ESC
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="keyBackspace"
              class="keypadButton"
            >
              ←
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="keyClear"
              class="keypadButton"
            >
              c
            </button>
            <br />
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key7"
              class="keypadButton"
            >
              7
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key8"
              class="keypadButton"
            >
              8
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key9"
              class="keypadButton"
            >
              9
            </button>
            <br />
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key4"
              class="keypadButton"
            >
              4
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key5"
              class="keypadButton"
            >
              5
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key6"
              class="keypadButton"
            >
              6
            </button>
            <br />
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key1"
              class="keypadButton"
            >
              1
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key2"
              class="keypadButton"
            >
              2
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key3"
              class="keypadButton"
            >
              3
            </button>
            <br />
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key0"
              class="keypadButton"
            >
              0
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="key."
              class="keypadButton"
            >
              ,
            </button>
            <button
              @click=${this._onNumberKeypadValueClick}
              id="keyReturn"
              class="keypadButton"
            >
              ↵
            </button>
            <br />
          </fieldset>
        </div>
      </div>
      <div id="modalAlphanumericKeypad" class="modal">
        <!-- Modal content -->
        <div class="modal-content-alphanumeric-keypad">
          <span
            @click=${this._closeModalAlphanumericKeypad}
            id="closeButton"
            class="close"
            >&times;</span
          >
          <h2>Tastatura alfanumerica</h2>
          <label for="alphanumericValueInput">Valoare:</label>
          <input id="alphanumericValueInput" type="text">
          <fieldset class="keypad">
            <div class="alfa-column-left">
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyA"
              class="keypadButtonAlphabet"
            >
              A
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyB"
              class="keypadButtonAlphabet"
            >
              B
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyC"
              class="keypadButtonAlphabet"
            >
              C
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyD"
              class="keypadButtonAlphabet"
            >
              D
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyE"
              class="keypadButtonAlphabet"
            >
              E
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyF"
              class="keypadButtonAlphabet"
            >
              F
            </button>
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyG"
              class="keypadButtonAlphabet"
            >
              G
            </button>
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyH"
              class="keypadButtonAlphabet"
            >
              H
            </button>
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyI"
              class="keypadButtonAlphabet"
            >
              I
            </button>
            <br/>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyJ"
              class="keypadButtonAlphabet"
            >
              J
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyK"
              class="keypadButtonAlphabet"
            >
              K
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyL"
              class="keypadButtonAlphabet"
            >
              L
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyM"
              class="keypadButtonAlphabet"
            >
              M
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyN"
              class="keypadButtonAlphabet"
            >
              N
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyO"
              class="keypadButtonAlphabet"
            >
              O
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyP"
              class="keypadButtonAlphabet"
            >
              P
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyQ"
              class="keypadButtonAlphabet"
            >
              Q
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyR"
              class="keypadButtonAlphabet"
            >
              R
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyS"
              class="keypadButtonAlphabet"
            >
              S
            </button>
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyT"
              class="keypadButtonAlphabet"
            >
              T
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyU"
              class="keypadButtonAlphabet"
            >
              U
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyV"
              class="keypadButtonAlphabet"
            >
              V
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyW"
              class="keypadButtonAlphabet"
            >
              W
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyX"
              class="keypadButtonAlphabet"
            >X
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyY"
              class="keypadButtonAlphabet"
            >
              Y
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyZ"
              class="keypadButtonAlphabet"
            >
              Z
            </button>
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key."
              class="keypadButtonAlphabet"
            >
              .
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keySpace"
              class="keypadButtonAlphabet"
            >
            spc
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key+"
              class="keypadButtonAlphabet"
            >
            +
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key-"
              class="keypadButtonAlphabet"
            >
            -
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key="
              class="keypadButtonAlphabet"
            >
            =
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key?"
              class="keypadButtonAlphabet"
            >
            ?
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key*"
              class="keypadButtonAlphabet"
            >
            *
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key/"
              class="keypadButtonAlphabet"
            >
            /
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key<"
              class="keypadButtonAlphabet"
            >
            <
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key>"
              class="keypadButtonAlphabet"
            >
            >
            </button>
            </div>
            <div class="alfa-column-right">
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyESC"
              class="keypadButton"
            >
              ESC
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyBackspace"
              class="keypadButton"
            >
              ←
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyClear"
              class="keypadButton"
            >
              c
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key7"
              class="keypadButton"
            >
              7
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key8"
              class="keypadButton"
            >
              8
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key9"
              class="keypadButton"
            >
              9
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key4"
              class="keypadButton"
            >
              4
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key5"
              class="keypadButton"
            >
              5
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key6"
              class="keypadButton"
            >
              6
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key1"
              class="keypadButton"
            >
              1
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key2"
              class="keypadButton"
            >
              2
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key3"
              class="keypadButton"
            >
              3
            </button>
            <br />
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key0"
              class="keypadButton"
            >
              0
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="key."
              class="keypadButton"
            >
              ,
            </button>
            <button
              @click=${this._onAlfanumericKeypadValueClick}
              id="keyReturn"
              class="keypadButton"
            >
              ↵
            </button>
            <br />
            </div>
          </fieldset>
        </div>
      </div>
      <fieldset>
        <legend>Discount/majorare</legend>
        <button
        name="discountValue"
        id="discountValueButton"
        class="discountButton" @click=${this._onDiscountMajorareClick}>
          Discount v.
        </button>
        <button
        name="increaseValue"
        id="increaseValueButton"
        class="discountButton" @click=${this._onDiscountMajorareClick}>
          Majorare v.
        </button>
        <button
        name="discountPercentage"
        id="discountPercentageButton"
        class="discountButton" @click=${this._onDiscountMajorareClick}>
          Discount %
        </button>
        <button
        name="increasePercentage"
        id="increasePercentageButton"
        class="discountButton" @click=${this._onDiscountMajorareClick}>
          Majorare %
        </button>
      </fieldset>
      <fieldset>
        <legend>Incasare</legend>
        <div class="tableFixHeadIncasare">
          <table>
            <thead>
              <th>Nr. crt.</th>
              <th>Metoda plata</th>
              <th>Valoare</th>
              <th>Sterge</th>
            </thead>
            <tbody>
              ${this.bonFiscal.incasareList.reverse().map(
                (dataRow) => html`<tr>
                  <td>${this.indexTabelIncasare}</td>
                  <td>${dataRow.instrument}</td>
                  <td>
                    <input
                      .value=${dataRow.value}
                      step="0.01"
                      id="${this.indexTabelIncasare++}"
                      style="width: 2rem;"
                      @change=${this._onInputChange}
                      type="number"
                    />
                  </td>
                  <td>
                    <button
                      class="Sterge"
                      @click=${this._onStergeIncasareClick}
                      id=${"INC" +
                      (this.bonFiscal.incasareList.length -
                        this.indexTabelIncasare +
                        1)}
                      type="button"
                    ></button>
                  </td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
      </fieldset>
      <fieldset>
        <legend>Metoda de plata</legend>
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonNumerar"
          class="metodaDePlataButton"
          name="NUMERAR"
        >
          Numerar
        </button>
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonCard"
          class="metodaDePlataButton"
          name="CARD"
        >
          Card</button
        ><br />
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonCredit"
          class="metodaDePlataButton"
          name="CREDIT"
        >
          Credit
        </button>
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonTichetMasa"
          class="metodaDePlataButton"
          name="TICHET_MASA"
        >
          Tichet masa</button
        ><br />
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonTichetValoric"
          class="metodaDePlataButton"
          name="TICHET_VALORIC"
        >
          Tichet valoric
        </button>
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonVoucher"
          class="metodaDePlataButton"
          name="VOUCHER"
        >
          Voucher</button
        ><br />
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonPlataModerna"
          class="metodaDePlataButton"
          name="PLATA_MODERNA"
        >
          P. moderna
        </button>
        <button
          @click=${this._onMetodaPlataClick}
          id="buttonAltaMetoda"
          class="metodaDePlataButton"
          name="ALTA_METODA"
        >
          Alta metoda
        </button>
      </fieldset>
      <fieldset id="totalFieldset">
        <table>
          <tr>
            <td>Valoare bon:</td>
            <td>${this._getTotalBeforeDiscountIncrease()} lei</td>
          </tr>
          <tr>
                <td>Valoare TVA:</td>
                <td>${this._getTVA()} lei</td>
              </tr>
          <tr>
            <td>Articole stornate:</td>
            <td>${this._getTotalArticoleStornate()} lei</td>
          </tr>
          <tr>
            <td>Discount/majorare:</td>
            <td>${this._getDiscountIncrease()} lei</td>
          </tr>
          <tr>
            <td>Total de plata:</td>
            <td>${(this._getTotal() - 0).toPrecision(3)} lei</td>
          </tr>
          <tr>
            <td>Rest de plata:</td>
            <td>
              ${(this._getTotal() - this._getTotalPlatit()).toPrecision(3)}
              lei
            </td>
          </tr>
        </table>
      </fieldset>
    </div>
  </div>
`;
  }

  _checkIfStorageValuesExistAndInitilizareIfNot() {
    if (read("intrareBonFiscalBonDeschis") == null) {
      write([], "intrareBonFiscalBonDeschis");
    }
    if (read("incasareListBonDeschis") == null) {
      write([], "incasareListBonDeschis");
    }
  }

  _getTotal() {
    var total = 0;
    read("intrareBonFiscalBonDeschis").forEach((line) => {
      total += line.produs.pret * line.cantitate;
    });

    return (
      total +
      parseFloat(this._getDiscountIncrease()) -
      parseFloat(this._getTotalArticoleStornate())
    ).toPrecision(3);
  }

  _getTVA() {
    var totalTVA = 0;
    read("intrareBonFiscalBonDeschis").forEach((line) => {
      totalTVA +=
        ((line.produs.pret * line.produs.valoareTVA) / 100) * line.cantitate;
    });

    return parseFloat(totalTVA).toPrecision(3);
  }

  _getTotalBeforeDiscountIncrease() {
    var total = 0;
    read("intrareBonFiscalBonDeschis").forEach((line) => {
      total += line.produs.pret * line.cantitate;
    });

    return (total - parseFloat(this._getTotalArticoleStornate())).toPrecision(
      3
    );
  }

  _getDiscountIncrease() {
    var discountIncreaseValue = 0;

    if (this.bonFiscal.discountPercentage != 0) {
      discountIncreaseValue =
        ((this._getTotalBeforeDiscountIncrease() *
          this.bonFiscal.discountPercentage) /
          100) *
        -1;
    }
    if (this.bonFiscal.discountValue != 0) {
      discountIncreaseValue = this.bonFiscal.discountValue * -1;
    }
    if (this.bonFiscal.increasePercentage != 0) {
      discountIncreaseValue =
        (this._getTotalBeforeDiscountIncrease() *
          this.bonFiscal.increasePercentage) /
        100;
    }
    if (this.bonFiscal.increaseValue != 0) {
      discountIncreaseValue = this.bonFiscal.increaseValue;
    }
    return parseFloat(discountIncreaseValue).toPrecision(3);
  }

  _getTotalArticoleStornate() {
    var total = 0;
    read("intrareBonFiscalBonDeschis").forEach((line) => {
      if (line.cancelled == true) {
        total += line.produs.pret * line.cantitate;
      }
    });
    return total.toPrecision(3);
  }

  _getTotalPlatit() {
    var totalPlatit = 0;
    this.bonFiscal.incasareList.forEach((line) => {
      totalPlatit += parseFloat(line.value);
    });

    return totalPlatit.toPrecision(4);
  }

  _actualizareValoriCampuriTasteRapide() {
    getData("http://localhost:8080/tastaRapida/all", {}).then((data) => {
      write(
        data.sort(function (a, b) {
          if (a.numar < b.numar) {
            return -1;
          }
          if (a.numar > b.numar) {
            return 1;
          }

          return 0;
        }),
        "tasteRapide"
      );
    });
  }

  _closeModalDenumire(event) {
    event.preventDefault();
    var modal = this.shadowRoot.getElementById("myModalDenumire");
    modal.style.display = "none";
  }

  _closeModalNumberKeypad(event) {
    event.preventDefault();
    var modal = this.shadowRoot.getElementById("modalNumberKeypad");
    modal.style.display = "none";
    this.activeElement = {};
  }

  _closeModalAlphanumericKeypad(event) {
    event.preventDefault();
    var modal = this.shadowRoot.getElementById("modalAlphanumericKeypad");
    modal.style.display = "none";
    this.activeElement = {};
  }

  _closeModalVanzare() {
    this.dispatchEvent(new CustomEvent("close-modalVanzare", {}));
  }

  _onInputKeyUpCodExtern(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      const codExtern = this.shadowRoot.getElementById("codExternInput").value;
      this._searchProdusByCodExternAndAssignResultToGlobalValuesIfExists(
        codExtern
      );
    }
  }

  _searchProdusByCodExternAndAssignResultToGlobalValuesIfExists(codExtern) {
    getData(
      "http://localhost:8080/produs/codExtern?codExtern=" + codExtern,
      {}
    ).then((data) => {
      if (data.length != 0) {
        this.pretProdusGasit = data[0].pret;
        this.shadowRoot.getElementById("cantitateInput").focus();
        this.denumireProdusGasit = data[0].denumire;
        this.umProdusGasit = data[0].unitateDeMasura;
        this.valoareTVAGasit = data[0].valoareTVA;
        this.codInternGasit = data[0].codIntern;
        this.idProdusGasit = data[0].id;
      } else {
        alert("Niciun produs gasit cu codul extern: " + codExtern);
        this.shadowRoot.getElementById("codExternInput").value = "";
        this.denumireProdusGasit = "";
      }
    });
  }

  _onInputKeyUpCantitate(event) {
    event.preventDefault();

    if (event.keyCode == 13) {
      this._addIntrareToBonFiscalIfProdusGasitIsNotNull();
    }
  }

  _addIntrareToBonFiscalIfProdusGasitIsNotNull() {
    if (this.denumireProdusGasit != "" && this.denumireProdusGasit != null) {
      if (
        this.shadowRoot.getElementById("cantitateInput").value == "" ||
        this.shadowRoot.getElementById("cantitateInput").value == null
      ) {
        this.shadowRoot.getElementById("cantitateInput").value = 1;
      }

      const discountPercentage = 0;
      const discountValue = 0;
      const increasePercentage = 0;
      const increaseValue = 0;
      const codExtern = this.shadowRoot.getElementById("codExternInput").value;
      const cantitate = this.shadowRoot.getElementById("cantitateInput").value;
      const cancelled = false;

      const intrareBonFiscalRequestDTO = this._buildIntrareBonFiscalRequestDTO(
        cantitate,
        this.idProdusGasit,
        this.codInternGasit,
        this.denumireProdusGasit,
        codExtern,
        this.pretProdusGasit,
        this._valoareToIdGrupaTVA(this.valoareTVAGasit),
        this._valoareToIdUnitateDeMasura(this.umProdusGasit),
        discountPercentage,
        discountValue,
        increasePercentage,
        increaseValue,
        cancelled
      );

      if (this.intrareBonFiscalList != null) {
        this.intrareBonFiscalList = read("intrareBonFiscalBonDeschis");
      } else {
        this.intrareBonFiscalList = [];
      }

      this.intrareBonFiscalList.push(intrareBonFiscalRequestDTO);
      write(this.intrareBonFiscalList, "intrareBonFiscalBonDeschis");

      this.shadowRoot.getElementById("cantitateInput").value = "";
      this.shadowRoot.getElementById("codExternInput").value = "";

      this.shadowRoot.getElementById("codExternInput").focus();
    } else {
      alert("Introduceti un produs");
      this.shadowRoot.getElementById("codExternInput").focus();
    }
  }

  _onInputKeyUpDenumire(event) {
    event.preventDefault();
    const denumireProdus = event.target.value;
    if (event.keyCode == 13) {
      this._searchProdusByDenumireAndOpenModal(denumireProdus);
    }
  }

  _searchProdusByDenumireAndOpenModal(denumireProdus) {
    getData(
      "http://localhost:8080/produs/denumire?denumire=" + denumireProdus,
      {}
    ).then((data) => {
      this.produseDupaDenumire = data;
      if (this.produseDupaDenumire.length != 0) {
        const modal = this.shadowRoot.getElementById("myModalDenumire");
        modal.style.display = "block";
      } else {
        alert("Produs inexistent in nomenclator!");
      }
    });
  }

  _onFocusCantitate(event) {
    event.preventDefault();
    this.shadowRoot.getElementById("cantitateInput").focus();
    this.activeElement = this.shadowRoot.activeElement;
    this._openNumberKeypadModal();
  }

  _openNumberKeypadModal() {
    const modal = this.shadowRoot.getElementById("modalNumberKeypad");
    modal.style.display = "block";
    this.shadowRoot.getElementById("numericValueInput").value =
      this.activeElement.value;
  }

  _onFocusCodExtern(event) {
    event.preventDefault();
    this.shadowRoot.getElementById("codExternInput").focus();
    this.activeElement = this.shadowRoot.activeElement;
  }

  _onFocusDenumire(event) {
    event.preventDefault();
    this.shadowRoot.getElementById("denumireProdusInput").focus();
    this.activeElement = this.shadowRoot.activeElement;
    this._openAlphanumericKeypadModal();
  }

  _openAlphanumericKeypadModal() {
    const modal = this.shadowRoot.getElementById("modalAlphanumericKeypad");
    modal.style.display = "block";
    this.shadowRoot.getElementById("alphanumericValueInput").value =
      this.activeElement.value;
  }

  _onFocusCUI(event) {
    event.preventDefault();
    this.shadowRoot.getElementById("CUIInput").focus();
    this.activeElement = this.shadowRoot.activeElement;
    this._openAlphanumericKeypadModal();
  }

  _onCodExternClick(event) {
    event.preventDefault();

    this.shadowRoot.getElementById("codExternInput").focus();
    this.activeElement = this.shadowRoot.activeElement;
    this._openNumberKeypadModal();
  }

  _onStergeClick(event) {
    event.preventDefault();

    this.intrareBonFiscalList = read("intrareBonFiscalBonDeschis");

    event.target.parentNode.parentNode.className = "cancelledItem";

    this.intrareBonFiscalList[parseInt(event.target.id)].cancelled = true;
    this.bonFiscal.intrareBonFiscalList = this.intrareBonFiscalList;
    write(this.intrareBonFiscalList, "intrareBonFiscalBonDeschis");
    this.intrareBonFiscalList = read("intrareBonFiscalBonDeschis");
  }

  _onStergeIncasareClick(event) {
    event.preventDefault();

    this.incasareList = read("incasareListBonDeschis");
    const indexLocal = event.target.id.split("INC")[1];
    this.incasareList.splice(parseInt(indexLocal), 1);
    this.bonFiscal.incasareList = this.incasareList;

    write(this.incasareList, "incasareListBonDeschis");
    this.incasareList = read("incasareListBonDeschis");
  }

  _onAdaugaClick(event) {
    event.preventDefault();

    if (
      event.target.id != null &&
      event.target.id != "NA" &&
      event.target.id != ""
    ) {
      this._searchProdusByCodExternAndAssignResultToGlobalValuesIfExists(
        event.target.id
      );

      var modal = this.shadowRoot.getElementById("myModalDenumire");
      modal.style.display = "none";
      this.shadowRoot.getElementById("denumireProdusInput").value = "";
    } else {
      alert("Produsul nu poate fi introdus deoarece nu are cod de bare!");
    }
  }

  _onMetodaPlataClick(event) {
    event.preventDefault();

    this.activeElement = this.shadowRoot.activeElement;
    this._openNumberKeypadModal();
  }

  _onListareClick(event) {
    event.preventDefault();
    const cancelledBonFiscalRequestDTO = {
      cui: this.shadowRoot.getElementById("CUIInput").value,
      incasareList: this.bonFiscal.incasareList,
      intrareBonFiscalList: read("intrareBonFiscalBonDeschis"),
      fiscal: true,
      cancelled: false,
      text: "",
      discountPercentage: this.bonFiscal.discountPercentage,
      discountValue: this.bonFiscal.discountValue,
      increasePercentage: this.bonFiscal.increasePercentage,
      increaseValue: this.bonFiscal.increaseValue,
      status: "ANULAT",
    };

    const bonFiscalRequestDTO = {
      cui: this.shadowRoot.getElementById("CUIInput").value,
      incasareList: this.bonFiscal.incasareList,
      intrareBonFiscalList: read("intrareBonFiscalBonDeschis"),
      fiscal: true,
      cancelled: false,
      text: "",
      discountPercentage: this.bonFiscal.discountPercentage,
      discountValue: this.bonFiscal.discountValue,
      increasePercentage: this.bonFiscal.increasePercentage,
      increaseValue: this.bonFiscal.increaseValue,
      status: "LISTAT",
    };

    putData(
      "http://localhost:8080/bonFiscal/" + this.bonFiscal.id,
      cancelledBonFiscalRequestDTO
    ).then((data) => {
      postData("http://localhost:8080/bonFiscal", bonFiscalRequestDTO).then(
        (data) => {
          this._resetareStorageBonFiscalNou();
          this._resetareCampuriBonFiscalNou();
          this._closeModalVanzare();
        }
      );
    });
  }

  _onInAsteptareClick(event) {
    event.preventDefault();
    const waitingBonFiscalRequestDTO = {
      cui: this.shadowRoot.getElementById("CUIInput").value,
      incasareList: this.bonFiscal.incasareList,
      intrareBonFiscalList: read("intrareBonFiscalBonDeschis"),
      fiscal: true,
      cancelled: false,
      text: "",
      discountPercentage: this.bonFiscal.discountPercentage,
      discountValue: this.bonFiscal.discountValue,
      increasePercentage: this.bonFiscal.increasePercentage,
      increaseValue: this.bonFiscal.increaseValue,
      status: "ANULAT",
    };

    const bonFiscalRequestDTO = {
      cui: this.shadowRoot.getElementById("CUIInput").value,
      incasareList: this.bonFiscal.incasareList,
      intrareBonFiscalList: read("intrareBonFiscalBonDeschis"),
      fiscal: true,
      cancelled: false,
      text: "",
      discountPercentage: this.bonFiscal.discountPercentage,
      discountValue: this.bonFiscal.discountValue,
      increasePercentage: this.bonFiscal.increasePercentage,
      increaseValue: this.bonFiscal.increaseValue,
      status: "IN_ASTEPTARE",
    };

    putData(
      "http://localhost:8080/bonFiscal/" + this.bonFiscal.id,
      waitingBonFiscalRequestDTO
    ).then((data) => {
      postData("http://localhost:8080/bonFiscal", bonFiscalRequestDTO).then(
        (data) => {
          this._resetareStorageBonFiscalNou();
          this._resetareCampuriBonFiscalNou();
          this._closeModalVanzare();
        }
      );
    });
  }

  _onSubtotalClick(event) {
    event.preventDefault();

    if (this._instrareBonFiscalListIsEmpty()) {
      alert("Nu ati introdus niciun articol in bonul fiscal curent!");
    } else {
      this.subtotalClicked = true;
      write(this.subtotalClicked, "subtotalClicked");
    }
  }

  _onAnuleazaClick(event) {
    event.preventDefault();

    event.preventDefault();
    const bonFiscalRequestDTO = {
      cui: this.shadowRoot.getElementById("CUIInput").value,
      incasareList: this.bonFiscal.incasareList,
      intrareBonFiscalList: read("intrareBonFiscalBonDeschis"),
      fiscal: true,
      cancelled: true,
      text: "",
      discountPercentage: this.bonFiscal.discountPercentage,
      discountValue: this.bonFiscal.discountValue,
      increasePercentage: this.bonFiscal.increasePercentage,
      increaseValue: this.bonFiscal.increaseValue,
      status: "ANULAT",
    };

    putData(
      "http://localhost:8080/bonFiscal/" + this.bonFiscal.id,
      bonFiscalRequestDTO
    ).then((data) => {
      this._resetareStorageBonFiscalNou();
      this._resetareCampuriBonFiscalNou();
      this._closeModalVanzare();
    });
  }

  _onTastaRapidaClick(event) {
    event.preventDefault();

    const numarTastaRapida = event.target.id.split("TR")[1];

    if (this._codExternAssignedToTastaRapida(numarTastaRapida)) {
      this._searchProdusByCodExternAndAssignResultToGlobalValuesIfExists(
        this._getCodExternByNumarTastaRapida(numarTastaRapida)
      );
    } else {
      alert(
        "Nu a fost atribuit niciun cod extern pentru aceasta tasta rapida. Pentru a atribui un cod extern, accesati meniul Administrare!"
      );
    }
  }

  _onDiscountMajorareClick(event) {
    event.preventDefault();

    this.activeElement = this.shadowRoot.activeElement;
    if (this._instrareBonFiscalListIsEmpty()) {
      alert("Nu aveti niciun articol introdus in bonul fiscal curent!");
    } else {
      this._openNumberKeypadModal();
    }
  }

  _codExternAssignedToTastaRapida(numarTastaRapida) {
    var codExternAssignedToTastaRapida = false;
    read("tasteRapide").forEach((tastaRapida) => {
      if (tastaRapida.numar == numarTastaRapida) {
        if (tastaRapida.codExtern != null) {
          codExternAssignedToTastaRapida = true;
        }
      }
    });

    return codExternAssignedToTastaRapida;
  }

  _getCodExternByNumarTastaRapida(numarTastaRapida) {
    var codExtern = 0;
    read("tasteRapide").forEach((tastaRapida) => {
      if (tastaRapida.numar == numarTastaRapida) {
        codExtern = tastaRapida.codExtern;
      }
    });
    return codExtern;
  }

  _buildIntrareBonFiscalRequestDTO(
    cantitate,
    id,
    codIntern,
    denumire,
    codExtern,
    pret,
    idGrupaTVA,
    idUM,
    discountPercentage,
    discountValue,
    increasePercentage,
    increaseValue,
    cancelled
  ) {
    const produs = {
      id: id,
      codIntern: codIntern,
      denumire: denumire,
      codExtern: codExtern,
      pret: pret,
      idGrupaTVA: idGrupaTVA,
      idUM: idUM,
    };

    const intrareBonFiscalRequestDTO = {
      cantitate: cantitate,
      produs: produs,
      discountPercentage: discountPercentage,
      discountValue: discountValue,
      increasePercentage: increasePercentage,
      increaseValue: increaseValue,
      cancelled: cancelled,
    };
    return intrareBonFiscalRequestDTO;
  }

  _valoareToIdGrupaTVA(valoareTVA) {
    var id = 0;
    const grupaTVA = read("grupaTVA");
    grupaTVA.forEach((element) => {
      if (element.valoare == valoareTVA) {
        id = element.id;
      }
    });
    return id;
  }

  _grupaTVAToValoare(grupaTVA) {
    var valoare = 0;
    const grupaTVAList = read("grupaTVA");
    grupaTVAList.forEach((element) => {
      if (element.id == grupaTVA) {
        valoare = element.valoare;
      }
    });
    return valoare;
  }

  _valoareToIdUnitateDeMasura(valoareUM) {
    var id = 0;
    const unitateDeMasura = read("unitateDeMasura");
    unitateDeMasura.forEach((element) => {
      if (element.denumire == valoareUM) {
        id = element.id;
      }
    });
    return id;
  }

  _idToDenumireUnitateDeMasura(idUM) {
    var denumire = "Buc";
    const unitateDeMasura = read("unitateDeMasura");
    unitateDeMasura.forEach((element) => {
      if (element.id == idUM) {
        denumire = element.denumire;
      }
    });
    return denumire;
  }

  _onInputChange(event) {
    event.preventDefault();
    const inputClassName = event.target.className;
  }

  _onNumberKeypadValueClick(event) {
    event.preventDefault();

    const defaultValueOfActiveElement = this.activeElement.value;

    switch (event.target.id.split("key")[1]) {
      case "ESC":
        var modal = this.shadowRoot.getElementById("modalNumberKeypad");
        modal.style.display = "none";
        this.activeElement.value = "";
        this.activeElement = {};
        break;
      case "Backspace":
        this.activeElement.value = defaultValueOfActiveElement.substring(
          0,
          defaultValueOfActiveElement.length - 1
        );
        break;
      case "Clear":
        this.activeElement.value = "";
        break;
      case "Return":
        if (this._inputIsNumeric(this.activeElement.value)) {
          this.activeElement.value = defaultValueOfActiveElement;
          var modal = this.shadowRoot.getElementById("modalNumberKeypad");
          modal.style.display = "none";
          this._actionRelatedToInputField(this.activeElement.name);
        } else {
          alert("Valoarea nu este numerica!");
        }
        break;
      default:
        this.activeElement.value =
          defaultValueOfActiveElement + event.target.id.split("key")[1];
    }

    this.shadowRoot.getElementById("numericValueInput").value =
      this.activeElement.value;
  }

  _onAlfanumericKeypadValueClick(event) {
    event.preventDefault();

    const defaultValueOfActiveElement = this.activeElement.value;

    switch (event.target.id.split("key")[1]) {
      case "ESC":
        var modal = this.shadowRoot.getElementById("modalAlphanumericKeypad");
        modal.style.display = "none";
        this.activeElement.value = "";
        this.activeElement = {};
        break;
      case "Backspace":
        this.activeElement.value = defaultValueOfActiveElement.substring(
          0,
          defaultValueOfActiveElement.length - 1
        );
        break;
      case "Clear":
        this.activeElement.value = "";
        break;
      case "Return":
        this.activeElement.value = defaultValueOfActiveElement;
        var modal = this.shadowRoot.getElementById("modalAlphanumericKeypad");
        modal.style.display = "none";
        this._actionRelatedToInputField(this.activeElement.name);

        break;
      case "Space":
        this.activeElement.value = defaultValueOfActiveElement + " ";
        break;
      default:
        this.activeElement.value =
          defaultValueOfActiveElement + event.target.id.split("key")[1];
    }
    this.shadowRoot.getElementById("alphanumericValueInput").value =
      this.activeElement.value;
  }

  _actionRelatedToInputField(inputFieldName) {
    switch (inputFieldName) {
      case "codExtern":
        const codExtern =
          this.shadowRoot.getElementById("codExternInput").value;
        this._searchProdusByCodExternAndAssignResultToGlobalValuesIfExists(
          codExtern
        );
        break;
      case "cantitate":
        this._addIntrareToBonFiscalIfProdusGasitIsNotNull();
        break;
      case "denumireProdus":
        const denumireProdus = this.shadowRoot.getElementById(
          "denumireProdusInput"
        ).value;
        this._searchProdusByDenumireAndOpenModal(denumireProdus);
        break;
      case "NUMERAR":
        this._buildMetodaPlataAndAppend(
          "NUMERAR",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "CARD":
        this._buildMetodaPlataAndAppend(
          "CARD",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "CREDIT":
        this._buildMetodaPlataAndAppend(
          "CREDIT",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "TICHET_MASA":
        this._buildMetodaPlataAndAppend(
          "TICHET_MASA",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "TICHET_VALORIC":
        this._buildMetodaPlataAndAppend(
          "TICHET_VALORIC",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "VOUCHER":
        this._buildMetodaPlataAndAppend(
          "VOUCHER",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "PLATA_MODERNA":
        this._buildMetodaPlataAndAppend(
          "PLATA_MODERNA",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "ALTA_METODA":
        this._buildMetodaPlataAndAppend(
          "ALTA_METODA",
          this.shadowRoot.getElementById("numericValueInput").value
        );
        break;
      case "discountPercentage":
        this._addDiscountIncrease(
          this.shadowRoot.getElementById("numericValueInput").value,
          "discountPercentage"
        );
        break;
      case "discountValue":
        this._addDiscountIncrease(
          this.shadowRoot.getElementById("numericValueInput").value,
          "discountValue"
        );
        break;
      case "increasePercentage":
        this._addDiscountIncrease(
          this.shadowRoot.getElementById("numericValueInput").value,
          "increasePercentage"
        );
        break;
      case "increaseValue":
        this._addDiscountIncrease(
          this.shadowRoot.getElementById("numericValueInput").value,
          "increaseValue"
        );
        break;
    }
  }

  _buildMetodaPlataAndAppend(instrument, valoare) {
    const incasareRequestDTO = {
      instrument: instrument,
      value: valoare,
    };

    this.incasareList.push(incasareRequestDTO);
    write(this.incasareList, "incasareListBonDeschis");
    this.incasareList = read("incasareListBonDeschis");
    this.bonFiscal.incasareList = this.incasareList;
  }

  _checkIfStorageValuesExistAndInitilizareIfNot() {
    if (read("unitateDeMasura") == null) {
      write([], "unitateDeMasura");
    }
    if (read("grupaTVA") == null) {
      write([], "grupaTVA");
    }
    if (read("discountPercentage") == null) {
      write(0, "discountPercentage");
    }
    if (read("discountValue") == null) {
      write(0, "discountValue");
    }
    if (read("increasePercentage") == null) {
      write(0, "increasePercentage");
    }
    if (read("increaseValue") == null) {
      write(0, "increaseValue");
    }
    if (read("subtotalClicked") == null) {
      write(false, "subtotalClicked");
    }
  }

  _inputIsNumeric(input) {
    return !isNaN(input);
  }

  _resetareStorageBonFiscalNou() {
    this.incasareList = [];
    write(this.incasareList, "incasareListBonDeschis");

    this.intrareBonFiscalList = [];
    write(this.intrareBonFiscalList, "intrareBonFiscalBonDeschis");

    this.subtotalClicked = false;
    write(this.subtotalClicked, "subtotalClicked");

    this._resetDiscountIncreaseValues();
  }

  _resetareCampuriBonFiscalNou() {
    this.shadowRoot.getElementById("codExternInput").value = "";
    this.shadowRoot.getElementById("cantitateInput").value = "";
    this.shadowRoot.getElementById("denumireProdusInput").value = "";
    this.shadowRoot.getElementById("CUIInput").value = "";
    this.shadowRoot.getElementById("denumireProdusGasita").value = "";
  }

  _resetDiscountIncreaseValues() {
    this.discountPercentage = 0;
    write(this.discountPercentage, "discountPercentage");

    this.discountValue = 0;
    write(this.discountValue, "discountValue");

    this.increasePercentage = 0;
    write(this.increasePercentage, "increasePercentage");

    this.increaseValue = 0;
    write(this.increaseValue, "increaseValue");
  }

  _addDiscountIncrease(value, type) {
    this._resetDiscountIncreaseValues();
    switch (type) {
      case "discountPercentage":
        this.discountPercentage = value;
        write(this.discountPercentage, "discountPercentage");
        break;
      case "discountValue":
        this.discountValue = value;
        write(this.discountValue, "discountValue");
        break;
      case "increasePercentage":
        this.increasePercentage = value;
        write(this.increasePercentage, "increasePercentage");
        break;
      case "increaseValue":
        this.increaseValue = value;
        write(this.increaseValue, "increaseValue");
        break;
    }
  }

  _instrareBonFiscalListIsEmpty() {
    return read("intrareBonFiscalBonDeschis").length == 0;
  }

  _displayButtonsInrelationToBonFiscalStatus() {
    switch (this.bonFiscal.status) {
      case "LISTAT":
        return html` <button
          @click=${this._onAnuleazaClick}
          class="anuleazaButton"
        >
          Anuleaza
        </button>`;
        break;
      case "IN_ASTEPTARE":
        return html` <button
            @click=${this._onAnuleazaClick}
            class="anuleazaButton"
          >
            Anuleaza
          </button>
          <button @click=${this._onInAsteptareClick} class="inAsteptareButton">
            In asteptare
          </button>
          <button
            @click=${this._onSubtotalClick}
            class=${read("subtotalClicked") == true
              ? "subtotalButton pressedButton"
              : "subtotalButton"}
          >
            Subtotal
          </button>
          <button @click=${this._onListareClick} class="listareButton">
            Listare
          </button>`;
        break;
      case "ANULAT":
        return html``;
        break;
    }
  }
}
window.customElements.define("bon-fiscal-app", BonFiscalApp);
