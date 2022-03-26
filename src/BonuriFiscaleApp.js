import { LitElement, html, css } from "lit-element";

import {
  getData,
  postData,
  putData,
  deleteData,
  verificaAtributExistentProduse,
} from "./ServerOperations";
import { read, write, removeItem, removeAll } from "./Storage";
import "./BonFiscalApp";

export class BonuriFiscaleApp extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: "Helvetica Neue";
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

      .stergereNomenclator {
        background-color: #d9534f;
        width: 15rem;
      }

      .consultareNomenclator {
        background-color: #5bc0de;
        width: 15rem;
      }

      .adaugareProdusNou {
        width: 15rem;
      }

      .actualizareButton {
        width: 20rem;
      }

      label,
      select,
      input,
      textarea,
      option {
        display: inline-block;
        text-align: left;
        width: 8.75rem;
        margin: 0.25rem;
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
        width: 40%;
      }

      .right {
        width: 40%;
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
        width: 95%;
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

      fieldset {
        border-radius: 0.5rem;
        margin: 2rem;
        padding: 1.5rem;
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
      }

      @media only screen and (max-width: 750px) and (max-height: 1334px) {
      }
    `;
  }

  static get properties() {
    return {
      bonuriFiscaleToDisplay: Array,
      filtreazaDupaValue: String,
      bonFiscalToView: Object,
    };
  }

  constructor() {
    super();
    this.filtreazaDupaValue = "data";
    this._checkIfStorageValuesExistAndInitilizareIfNot();
    this._showDefaultBonuriFiscale();
  }

  render() {
    return html`
      <fieldset>
        <legend>Filtru</legend>
        <label for="denumireFiltruInput">Filtreaza dupa: </label>
        <select
          @change=${this._onDenumireFiltruInputChange}
          id="denumireFiltruInput"
        >
          <option selected value="data">Data</option>
          <option value="codFiscal">Cod Fiscal</option>
          <option value="status">Status</option>
        </select>
        <button @click=${this._onSearchClick} class="searchButton"></button>
        <button @click=${this._onClearClick} class="clearButton"></button>
        <br />
        <label for="valoareFiltruInput">Valoare:</label>
        ${this._getFieldAccordingToDenumireFiltruInput()}
      </fieldset>
      <fieldset>
        <legend>Lista bonuri fiscale</legend>
        <div class="tableFixHead">
          <table>
            <thead>
              <th>Nr. crt.</th>
              <th>Data</th>
              <th>Cod Fiscal</th>
              <th>Valoare</th>
              <th>Valoare d/m</th>
              <th>Valoare TVA</th>
              <th>Status</th>
              <th>Vizualizare</th>
            </thead>
            <tbody>
              ${read("bonuriFiscaleToDisplay")
                .reverse()
                .map(
                  (dataRow) => html`<tr>
                    <td>${dataRow.id}</td>
                    <td>${dataRow.date}</td>
                    <td>${dataRow.cui != "" ? dataRow.cui : "-"}</td>
                    <td>${parseFloat(dataRow.totalDupaDiscount).toPrecision(
                      3
                    )}</td>
                    <td>${parseFloat(
                      dataRow.total - dataRow.totalDupaDiscount
                    ).toPrecision(3)}</td>
                    <td>${parseFloat(dataRow.totalTVA).toPrecision(3)}</td>
                    <td>${dataRow.status}</td>
                    <td><button id=${dataRow.id} class="searchButton" @click=${
                    this._onViewClick
                  }></td>
                  </tr>`
                )}
            </tbody>
          </table>
        </div>
      </fieldset>
      <div id="modalVanzare" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span @click=${this._closeModalVanzare} id="closeButton" class="close"
            >&times;</span
          >
          <bon-fiscal-app
            @close-modalVanzare=${this._closeModalVanzare}
            .bonFiscal=${this.bonFiscalToView}
          ></bon-fiscal-app>
        </div>
      </div>
    `;
  }

  _getFieldAccordingToDenumireFiltruInput() {
    var htmlInput = "";
    switch (this.filtreazaDupaValue) {
      case "data":
        htmlInput = html`<input
            id="valoareFiltruInput"
            @change=${this._onValoareFiltruInputChange}
            type="date"
          /><input
            id="valoareFiltruInputOptional"
            @change=${this._onValoareFiltruInputChange}
            type="date"
          />`;
        break;
      case "codFiscal":
        htmlInput = html`<input
          id="valoareFiltruInput"
          @change=${this._onValoareFiltruInputChange}
          type="text"
        />`;
        break;
      case "status":
        htmlInput = html`<select
          id="valoareFiltruInput"
          @change=${this._onValoareFiltruInputChange}
        >
          <option value="LISTAT">Listat</option>
          <option value="ANULAT">Anulat</option>
          <option value="IN_ASTEPTARE">In asteptare</option>
        </select>`;
        break;
    }
    return htmlInput;
  }

  _onDenumireFiltruInputChange(event) {
    event.preventDefault();
    this.filtreazaDupaValue = this.shadowRoot.getElementById(
      "denumireFiltruInput"
    ).value;
  }

  _onSearchClick(event) {
    event.preventDefault();

    const valoareFiltru =
      this.shadowRoot.getElementById("valoareFiltruInput").value;

    var valoareFiltruOptional = 0;

    if (this.shadowRoot.getElementById("valoareFiltruInputOptional") != null) {
      valoareFiltruOptional = this.shadowRoot.getElementById(
        "valoareFiltruInputOptional"
      ).value;
    }
    this._updateDisplayedBonuriFiscale(
      this.filtreazaDupaValue,
      valoareFiltru,
      valoareFiltruOptional
    );
  }

  _onClearClick(event) {
    event.preventDefault();

    this._clearInputValues();
    this._resetFilterToDefault();
    this._showDefaultBonuriFiscale();
  }

  _onViewClick(event) {
    event.preventDefault();
    this.bonFiscalToView = this._getBonFiscalToViewById(event.target.id);
    console.log(this.bonFiscalToView);

    this._openModalVanzare();
  }

  _closeModalVanzare(event) {
    event.preventDefault();
    this._closeModalVanzare();
  }

  _closeModalVanzare() {
    var modal = this.shadowRoot.getElementById("modalVanzare");
    modal.style.display = "none";
  }

  _openModalVanzare() {
    const modal = this.shadowRoot.getElementById("modalVanzare");
    modal.style.display = "block";
  }

  _areBothDateFieldsCompleted(event) {
    var areBothFieldsCompleted = false;
    const startDateField =
      this.shadowRoot.getElementById("valoareFiltruInput").value;

    var endDateField = "";

    if (this.shadowRoot.getElementById("valoareFiltruInputOptional") != null) {
      endDateField = this.shadowRoot.getElementById(
        "valoareFiltruInputOptional"
      ).value;
    }

    if (startDateField != "" && endDateField != "") {
      areBothFieldsCompleted = true;
    } else {
      areBothFieldsCompleted = false;
    }
    return areBothFieldsCompleted;
  }

  _showDefaultBonuriFiscale() {
    var date = new Date(Date.now());
    var stringDate = date.toISOString().split("T")[0];

    getData(
      "http://localhost:8080/bonFiscal/date?startDate=" +
        stringDate +
        "&endDate=" +
        stringDate,
      {}
    ).then((data) => {
      this.bonuriFiscaleToDisplay = data;
      write(this.bonuriFiscaleToDisplay, "bonuriFiscaleToDisplay");
    });
  }

  _updateDisplayedBonuriFiscale(criteria, value, optionalValue) {
    if (this._areBothDateFieldsCompleted() && criteria == "data") {
      getData(
        "http://localhost:8080/bonFiscal/date?startDate=" +
          value +
          "&endDate=" +
          optionalValue,
        {}
      ).then((data) => {
        this.bonuriFiscaleToDisplay = data;
        write(this.bonuriFiscaleToDisplay, "bonuriFiscaleToDisplay");
      });
    } else {
      switch (criteria) {
        case "codFiscal":
          getData(
            "http://localhost:8080/bonFiscal/codFiscal?codFiscal=" + value,
            {}
          ).then((data) => {
            this.bonuriFiscaleToDisplay = data;
            write(this.bonuriFiscaleToDisplay, "bonuriFiscaleToDisplay");
          });
          break;

        case "status":
          getData(
            "http://localhost:8080/bonFiscal/status?status=" + value,
            {}
          ).then((data) => {
            this.bonuriFiscaleToDisplay = data;
            write(this.bonuriFiscaleToDisplay, "bonuriFiscaleToDisplay");
          });
          break;
      }
    }
  }

  _clearInputValues() {
    this.shadowRoot.getElementById("valoareFiltruInput").value = "";
    if (this.shadowRoot.getElementById("valoareFiltruInputOptional") != null) {
      var valoareFiltruOptional = this.shadowRoot.getElementById(
        "valoareFiltruInputOptional"
      ).value;
      valoareFiltruOptional = "";
    }
  }

  _resetFilterToDefault() {
    this.shadowRoot.getElementById("denumireFiltruInput").value = "data";
    this.filtreazaDupaValue = this.shadowRoot.getElementById(
      "denumireFiltruInput"
    ).value;
    this._setDefaultDateFilterValues();
  }

  _setDefaultDateFilterValues() {
    var date = new Date(Date.now());
    var stringDate = date.toISOString().split("T")[0];
    this.shadowRoot.getElementById("valoareFiltruInput").value = stringDate;

    if (this.shadowRoot.getElementById("valoareFiltruInputOptional") != null) {
      this.shadowRoot.getElementById("valoareFiltruInputOptional").value =
        stringDate;
    }
  }

  _getBonFiscalToViewById(id) {
    var bonFiscalToView = {};
    read("bonuriFiscaleToDisplay").forEach((bonFiscal) => {
      if (bonFiscal.id == id) {
        bonFiscalToView = bonFiscal;
      }
    });
    return bonFiscalToView;
  }

  _checkIfStorageValuesExistAndInitilizareIfNot() {
    if (read("bonuriFiscaleToDisplay") == null) {
      write([], "bonuriFiscaleToDisplay");
    }
  }

  _getValoareBonFiscal(bonFiscal) {
    var total = 0;
    bonFiscal.intrareBonFiscalList.forEach((line) => {
      total += line.produs.pret * line.cantitate;
    });

    return (
      total +
      parseFloat(this._getDiscountIncreaseBonFiscal(bonFiscal)) -
      parseFloat(this._getTotalArticoleStornateBonFiscal(bonFiscal))
    ).toPrecision(3);
  }

  _getTVABonFiscal(bonFiscal) {
    var totalTVA = 0;
    bonFiscal.intrareBonFiscalList.forEach((line) => {
      totalTVA +=
        ((line.produs.pret * line.produs.valoareTVA) / 100) * line.cantitate;
    });

    return parseFloat(totalTVA).toPrecision(3);
  }

  _getDiscountIncreaseBonFiscal(bonFiscal) {
    var discountIncreaseValue = 0;

    if (bonFiscal.discountPercentage != 0) {
      discountIncreaseValue =
        ((this._getTotalBeforeDiscountIncrease(bonFiscal) *
          bonFiscal.discountPercentage) /
          100) *
        -1;
    }
    if (bonFiscal.discountValue != 0) {
      discountIncreaseValue = bonFiscal.discountValue * -1;
    }
    if (bonFiscal.increasePercentage != 0) {
      discountIncreaseValue =
        (this._getTotalBeforeDiscountIncrease(bonFiscal) *
          bonFiscal.increasePercentage) /
        100;
    }
    if (bonFiscal.increaseValue != 0) {
      discountIncreaseValue = bonFiscal.increaseValue;
    }
    return parseFloat(discountIncreaseValue).toPrecision(3);
  }

  _getTotalArticoleStornateBonFiscal(bonFiscal) {
    var total = 0;
    bonFiscal.intrareBonFiscalList.forEach((line) => {
      if (line.cancelled == true) {
        total += line.produs.pret * line.cantitate;
      }
    });
    return total.toPrecision(3);
  }

  _getTotalBeforeDiscountIncrease(bonFiscal) {
    var total = 0;
    bonFiscal.intrareBonFiscalList.forEach((line) => {
      total += line.produs.pret * line.cantitate;
    });

    return (
      total - parseFloat(this._getTotalArticoleStornateBonFiscal(bonFiscal))
    ).toPrecision(3);
  }
}
window.customElements.define("bonuri-fiscale-app", BonuriFiscaleApp);
