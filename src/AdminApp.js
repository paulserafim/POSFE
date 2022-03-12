import { LitElement, html, css } from "lit-element";

import {
  getData,
  postData,
  putData,
  deleteData,
  verificaAtributExistentProduse,
} from "./ServerOperations";
import { read, write, removeItem, removeAll } from "./Storage";

export class AdminApp extends LitElement {
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

      .infoButton {
        background-color: #5bc0de;
        background-repeat: no-repeat;
        background-image: url("src/Media/info.svg");
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
        padding-top: 6rem; /* Location of the box */
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

      trash.svg fieldset {
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
      nomenclatorArticole: Array,
      unitateDeMasura: Array,
      grupaTVA: Array,
      constante: Array,
      directorImportWinMentor: String,
      idDirectorImportWinMentor: Number,
      denumireTastaSelectata: String,
      denumireProdusTastaSelectata: String,
      codExternTastaSelectata: String,
      tasteRapide: Array,
    };
  }

  constructor() {
    super();
    getData("http://localhost:8080/produs/alphabet/A", {}).then((data) => {
      write(data, "nomenclatorArticole");
      this.nomenclatorArticole = read("nomenclatorArticole");
    });
    getData("http://localhost:8080/unitateDeMasura/all", {}).then((data) => {
      write(data, "unitateDeMasura");
      this.unitateDeMasura = read("unitateDeMasura");
    });
    getData("http://localhost:8080/grupaTVA/all", {}).then((data) => {
      write(data, "grupaTVA");
      this.grupaTVA = read("grupaTVA");
    });
    getData("http://localhost:8080/constanta/all", {}).then((data) => {
      write(data, "constante");
      this.constante = read("constante");
      this.constante.forEach((constanta) => {
        if (constanta.denumire == "directorImportWinMentor") {
          this.directorImportWinMentor = constanta.valoareText;
          this.idDirectorImportWinMentor = constanta.id;
        }
      });
    });

    this._actualizareValoriCampuriTasteRapide();
  }

  render() {
    return html`
      <div class="column left">
        <fieldset>
          <legend>Importa fisiere din WinMentor</legend>
          <label for="directorFisiereImport">Director fisiere:</label>
          <input
            id="directorFisiereImport"
            type="text"
            value=${this.directorImportWinMentor}
          /><button @click=${this._onInfoClick} class="infoButton"></button
          ><br />
          <button
            @click=${this._onActualizeazaCaleImport}
            class="actualizareButton"
          >
            Actualizeaza cale import
          </button>
          <br />
          <button
            @click=${this._onActualizeazaNomenclatorProduse}
            class="actualizareButton"
          >
            Actualizeaza nomenclatoare</button
          ><br />
        </fieldset>
        <fieldset>
          <legend>Configurare taste rapide</legend>
          <label for="selectorTastaRapida">Tasta rapida:</label>
          <select
            @change=${this._onSelectorTastaRapidaChange}
            id="selectorTastaRapida"
          >
            ${
              this.tasteRapide != null
                ? html`${this.tasteRapide.map(
                    (tastaRapida) =>
                      html`<option value=${tastaRapida.numar}>
                        ${tastaRapida.numar}
                      </option>`
                  )}`
                : html``
            }
          </select>
          <br />
          <label for="denumireTasta">Denumire tasta:</label>
          <input
            value=${this.denumireTastaSelectata}
            id="denumireTasta"
            type="text"
          /><br />
          <label for="codExternInput">Cod extern:</label>
          <input
            value=${this.codExternTastaSelectata}
            id="codExternInput"
            type="text"
          /><br />
          <button @click=${this._onActualizeazaTasteRapide}>
            Actualizeaza
          </button>
        </fieldset>
        <fieldset>
          <legend>Editare nomenclator articole</legend>
          <button
            @click=${this._onConsultareNomenclatorClick}
            class="consultareNomenclator"
          >
            Consultare nomenclator</button
          ><br />
          <button
            @click=${this._onGolireNomenclatorClick}
            class="stergereNomenclator"
          >
            Golire nomenclator
          </button>
        </fieldset>

        <div id="myModalNomenclator" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
            <span
              @click=${this._closeModalNomenclator}
              id="closeButton"
              class="close"
              >&times;</span
            >
            <h2>Nomenclator articole</h2>
            <label for="denumireProdusInputModal">Denumire:</label>
            <input
              @change=${this._onDenumireProdusChange}
              id="denumireProdusInputModal"
              type="text"
            />
            <button @click=${this._onClickResetare}>Resetare</button><br />
            <label for="ordonare">Ordonare:</label>
            <select id="selectCharacter" @change=${this._onChangeCharacter}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="N">N</option>
              <option value="O">O</option>
              <option value="P">P</option>
              <option value="Q">Q</option>
              <option value="R">R</option>
              <option value="S">S</option>
              <option value="T">T</option>
              <option value="U">U</option>
              <option value="V">V</option>
              <option value="X">X</option>
              <option value="Y">Y</option>
              <option value="Z">Z</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="0">0</option>
              <option value="*">*</option>
            </select>
            <div class="tableFixHead">
              <table>
                <thead>
                  <th>Denumire</th>
                  <th>Cod Extern</th>
                  <th>Cod Intern</th>
                  <th>Pret</th>
                  <th>Procent TVA</th>
                  <th>Unitate de masura</th>
                  <th>Salveaza</th>
                  <th>Sterge</th>
                </thead>
                <tbody>
                  ${
                    this.nomenclatorArticole != null
                      ? html` ${this.nomenclatorArticole.map(
                          (dataRow) => html`<tr>
                            <td>
                              <input type="text" value=${dataRow.denumire} />
                            </td>
                            <td>
                              <input type="text" value=${dataRow.codExtern} />
                            </td>
                            <td>
                              <input type="text" value=${dataRow.codIntern} />
                            </td>
                            <td>
                              <input
                                class="inputNumber"
                                type="number"
                                step="0.01"
                                value=${dataRow.pret != null
                                  ? dataRow.pret.toPrecision(4)
                                  : "-"}
                              />
                            </td>
                            <td>
                              <select id="procentTVAInput">
                                ${this.grupaTVA.map((element) =>
                                  dataRow.valoareTVA == element.valoare
                                    ? html` <option
                                        selected
                                        value=${element.id}
                                      >
                                        ${element.valoare}
                                      </option>`
                                    : html`<option value=${element.id}>
                                        ${element.valoare}
                                      </option>`
                                )}
                              </select>
                            </td>
                            <td>
                              <select id="unitateDeMasuraInput">
                                ${this.unitateDeMasura.map((element) =>
                                  dataRow.unitateDeMasura == element.denumire
                                    ? html` <option
                                        selected
                                        value=${element.id}
                                      >
                                        ${element.denumire}
                                      </option>`
                                    : html`<option value=${element.id}>
                                        ${element.denumire}
                                      </option>`
                                )}
                              </select>
                            </td>
                            <td>
                              <button
                                @click=${this._onSalveazaClick}
                                class="Salvare"
                                id=${dataRow.id}
                                type="button"
                              ></button>
                            </td>
                            <td>
                              <button
                                @click=${this._onStergeClick}
                                class="Sterge"
                                id=${"S" + dataRow.id}
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

        <div id="adaugareProdusNouModal" class="modal">
          <div class="modal-content">
            <span
              @click=${this._closeAdaugareProdusModal}
              id="closeAdaugareProdusButton"
              class="close"
              >&times;</span
            >

            <h2>Adaugare produs nou</h2>

            <form @submit=${this._onSubmitProdusNou}>
              <label for="denumireProdusInput">Denumire produs:</label>
              <input
                name="denumire"
                id="denumireProdusInput"
                type="text"
              /><br />
              <label for="codExternInput"> Cod extern:</label>
              <input name="codExtern" id="codExternInput" type="text" /><br />
              <label for="codInternInput"> Cod intern:</label>
              <input name="codIntern" id="codInternInput" type="text" /><br />
              <label for="pretVanzareInput"> Pret:</label>
              <input name="pret" id="pretVanzareInput" type="number" /><br />
              <label for="procentTVAInputProdusNou"> Procent TVA:</label>
              <select name="idGrupaTVA" id="procentTVAInputProdusNou">
                ${this.grupaTVA.map(
                  (element) =>
                    html`<option value=${element.id}>
                      ${element.valoare}
                    </option>`
                )}</select
              ><br />
              <label for="unitateDeMasuraInputProdusNou"
                >Unitate de masura:</label
              >
              <select name="idUM" id="unitateDeMasuraInputProdusNou">
                ${this.unitateDeMasura.map(
                  (element) =>
                    html`<option value=${element.id}>
                      ${element.denumire}
                    </option>`
                )}</select
              ><br />
              <button type="submit">Adauga</button>
            </form>
          </div>
        </div>
      </div>
      <div class="column right">
        <fieldset>
        <legend>Constante</legend>
          <form @submit=${this._onSubmitConstanta}>
          <label for="denumireConstanta">Denumire constanta: </label>
          <input name="denumire" type="text" /><br />
          <label for="valoareNumericaIntreaga">Valoare numerica intreaga: </label>
          <input name="valoareNumericaIntreaga" type="number" /><br />
          <label for="valoareNumerica">Valoare numerica: </label>
          <input name="valoareNumerica" type="number" step="0.01" /><br />
          <label for="valoareText">Valoare text: </label>
          <input name="valoareText" type="text" /><br />
          <button class="salveaza">Salveaza</button>
        </fieldset>
        </form>
      </div>
    `;
  }

  _closeModalNomenclator(event) {
    event.preventDefault();
    var modal = this.shadowRoot.getElementById("myModalNomenclator");
    modal.style.display = "none";
  }

  _closeAdaugareProdusModal(event) {
    event.preventDefault();

    var adaugareProdusNouModal = this.shadowRoot.getElementById(
      "adaugareProdusNouModal"
    );
    adaugareProdusNouModal.style.display = "none";
  }

  _onConsultareNomenclatorClick(event) {
    event.preventDefault();
    const modal = this.shadowRoot.getElementById("myModalNomenclator");

    modal.style.display = "block";
  }

  _onAdaugareProdusNouClick(event) {
    event.preventDefault();

    const adaugareProdusNouModal = this.shadowRoot.getElementById(
      "adaugareProdusNouModal"
    );
    adaugareProdusNouModal.style.display = "block";
  }

  _onSelectorTastaRapidaChange(event) {
    event.preventDefault();

    this._actualizareValoriCampuriTasteRapide();
  }

  _onChangeCharacter(event) {
    event.preventDefault();

    getData(
      "http://localhost:8080/produs/alphabet/" + event.target.value,
      {}
    ).then((data) => {
      write(data, "nomenclatorArticole");
      this.nomenclatorArticole = read("nomenclatorArticole");
    });
  }

  _onDenumireProdusChange(event) {
    event.preventDefault();
    const keyword = this.shadowRoot.getElementById(
      "denumireProdusInputModal"
    ).value;
    getData(
      "http://localhost:8080/produs/denumire?denumire=" + keyword,
      {}
    ).then((data) => {
      write(data, "nomenclatorArticole");
      this.nomenclatorArticole = read("nomenclatorArticole");
    });
  }

  _onClickResetare(event) {
    event.preventDefault();
    const ordonareInput = this.shadowRoot.getElementById("selectCharacter");
    const denumireProdusInput = this.shadowRoot.getElementById(
      "denumireProdusInputModal"
    );
    ordonareInput.value = "A";
    denumireProdusInput.value = "";

    getData("http://localhost:8080/produs/alphabet/A", {}).then((data) => {
      write(data, "nomenclatorArticole");
      this.nomenclatorArticole = read("nomenclatorArticole");
    });
  }

  _onInfoClick(event) {
    event.preventDefault();
    alert(
      "Introduceti calea directorului de import a fisierelor NART.DB, NART1.DB, NUM.DB, NTVA.DB. Dupa ce ati introdus calea de import, copiati fisiere in directorul specificat si dati click pe buton Actualizeaza nomenclator produse."
    );
  }

  _onActualizeazaCaleImport(event) {
    event.preventDefault();

    const constantaRequestDTO = {
      denumire: "directorImportWinMentor",
      valoareText: this.shadowRoot.getElementById("directorFisiereImport")
        .value,
    };
    if (this.directorImportWinMentor == null) {
      postData("http://localhost:8080/constanta/", constantaRequestDTO).then(
        (data) => {
          alert(data.mesaj);
        }
      );
    } else {
      putData(
        "http://localhost:8080/constanta/" + this.idDirectorImportWinMentor,
        constantaRequestDTO
      ).then((data) => {
        alert(data.mesaj);
      });
    }
  }

  _onActualizeazaTasteRapide(event) {
    event.preventDefault();

    const tastaRapidaRequestDTO = {
      denumire: this.shadowRoot.getElementById("denumireTasta").value,
      codExtern: this.shadowRoot.getElementById("codExternInput").value,
      numar: this.shadowRoot.getElementById("selectorTastaRapida").value,
    };

    if (tastaRapidaRequestDTO != null) {
      putData(
        "http://localhost:8080/tastaRapida/" + tastaRapidaRequestDTO.numar,
        tastaRapidaRequestDTO
      ).then((data) => {
        alert(data.mesaj);
        this._actualizareValoriCampuriTasteRapide();
      });
    }
  }

  _onSalveazaClick(event) {
    event.preventDefault();
    const id = event.target.id;
    const denumire =
      event.target.parentElement.parentElement.children[0].children[0].value;
    const codExtern =
      event.target.parentElement.parentElement.children[1].children[0].value;
    const codIntern =
      event.target.parentElement.parentElement.children[2].children[0].value;
    const pret =
      event.target.parentElement.parentElement.children[3].children[0].value;
    const grupaTVA =
      event.target.parentElement.parentElement.children[4].children[0].value;
    const unitateDeMasura =
      event.target.parentElement.parentElement.children[5].children[0].value;

    const produsRequestDTO = {
      id: id,
      denumire: denumire,
      codIntern: codIntern,
      codExtern: codExtern,
      pret: pret,
      idGrupaTVA: grupaTVA,
      idUM: unitateDeMasura,
    };

    putData("http://localhost:8080/produs/" + id, produsRequestDTO).then(
      (data) => {
        alert(data.mesaj);
      }
    );
  }

  _onStergeClick(event) {
    event.preventDefault();
    const id = event.target.id.split("S")[1];

    if (confirm("Produsul va fi sters din baza de date. Continuati?") == true) {
      deleteData("http://localhost:8080/produs/" + id).then((data) => {
        const caracterExistentCampOrdonare =
          this.shadowRoot.getElementById("selectCharacter").value;
        this._actualizarePaginaNomenclatorInFunctieDeCaracter(
          caracterExistentCampOrdonare
        );
        alert("Produsul a fost sters!");
      });
    }
  }

  _onActualizeazaNomenclatorProduse(event) {
    event.preventDefault();

    if (
      confirm(
        "Procedura de actualozare date va fi initializata! Aceasta procedura ar putea dura cateva minute. Asteptati mesajul de confirmare a actualizarii. Doriti sa continuati?"
      ) == true
    ) {
      postData("http://localhost:8080/update/produse").then((data) => {
        alert("Procedura de actualizare date s-a sfarsit!");
      });
    }
  }

  _onGolireNomenclatorClick(event) {
    event.preventDefault();

    getData("http://localhost:8080/produs/size", {}).then((data) => {
      if (
        confirm(
          data.size +
            " produse urmeaza a fi sterse din baza de date: " +
            data.name +
            "! Sigur continuati procedura?"
        ) == true
      ) {
        deleteData("http://localhost:8080/produs/all", {}).then((data) => {
          alert("Nomenclatorul a fost golit!");
          getData("http://localhost:8080/produs/alphabet/A", {}).then(
            (data) => {
              write(data, "nomenclatorArticole");
              this.nomenclatorArticole = read("nomenclatorArticole");
            }
          );
        });
      }
    });
  }

  _onSubmitProdusNou(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const produsNou = Object.fromEntries(data);

    verificaAtributExistentProduse("codExtern", produsNou.codExtern).then(
      (data) => {
        var existsByCodExtern = data.value;
        if (existsByCodExtern == true) {
          if (
            confirm(
              "Codul extern: " +
                produsNou.codExtern +
                " exista deja in nomenclatorul de articole. Doriti sa suprascrieti produsul?"
            ) == true
          ) {
            getData(
              "http://localhost:8080/produs/codExtern?codExtern=" +
                produsNou.codExtern,
              {}
            ).then((data) => {
              const produsRequestDTO = {
                id: data[0].id,
                denumire: produsNou.denumire,
                codIntern: produsNou.codIntern,
                codExtern: produsNou.codExtern,
                pret: produsNou.pret,
                idGrupaTVA: produsNou.idGrupaTVA,
                idUM: produsNou.idUM,
              };
              putData(
                "http://localhost:8080/produs/" + produsRequestDTO.id,
                produsRequestDTO
              ).then((data) => {
                alert(data.mesaj);
              });
            });
          }
        } else {
          verificaAtributExistentProduse("codIntern", produsNou.codIntern).then(
            (data) => {
              var existsByCodIntern = data.value;
              if (existsByCodIntern == true) {
                if (
                  confirm(
                    "Codul intern: " +
                      produsNou.codIntern +
                      " exista deja in nomenclatorul de articole. Doriti sa suprascrieti produsul?"
                  ) == true
                ) {
                  getData(
                    "http://localhost:8080/produs/codIntern?codIntern=" +
                      produsNou.codIntern,
                    {}
                  ).then((data) => {
                    const produsRequestDTO = {
                      id: data.id,
                      denumire: produsNou.denumire,
                      codIntern: produsNou.codIntern,
                      codExtern: produsNou.codExtern,
                      pret: produsNou.pret,
                      idGrupaTVA: produsNou.idGrupaTVA,
                      idUM: produsNou.idUM,
                    };
                    putData(
                      "http://localhost:8080/produs/" + produsRequestDTO.id,
                      produsRequestDTO
                    ).then((data) => {
                      alert(data.mesaj);
                    });
                  });
                }
              } else {
                const produsRequestDTO = {
                  denumire: produsNou.denumire,
                  codIntern: produsNou.codIntern,
                  codExtern: produsNou.codExtern,
                  pret: produsNou.pret,
                  idGrupaTVA: produsNou.idGrupaTVA,
                  idUM: produsNou.idUM,
                };
                postData(
                  "http://localhost:8080/produs/",
                  produsRequestDTO
                ).then((data) => {
                  alert(data.mesaj);
                  form.reset();
                });
              }
            }
          );
        }
      }
    );
  }

  _onSubmitConstanta(event) {
    event.preventDefault();

    const form = event.target;
    const data = new FormData(form);
    const constantaNoua = Object.fromEntries(data);

    postData("http://localhost:8080/constanta/", constantaNoua).then((data) => {
      alert(data.mesaj);
    });

    form.reset();
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
      this.tasteRapide = read("tasteRapide");
      read("tasteRapide").forEach((tastaRapida) => {
        if (
          this.shadowRoot.getElementById("selectorTastaRapida").value ==
          tastaRapida.numar
        ) {
          this.denumireTastaSelectata = tastaRapida.denumire;
          this.codExternTastaSelectata = tastaRapida.codExtern;
        }
      });
    });
  }

  _actualizarePaginaNomenclatorInFunctieDeCaracter(caracter) {
    const ordonareInput = this.shadowRoot.getElementById("selectCharacter");
    const denumireProdusInput = this.shadowRoot.getElementById(
      "denumireProdusInputModal"
    );
    ordonareInput.value = caracter;
    denumireProdusInput.value = "";

    getData("http://localhost:8080/produs/alphabet/" + caracter, {}).then(
      (data) => {
        write(data, "nomenclatorArticole");
        this.nomenclatorArticole = read("nomenclatorArticole");
      }
    );
  }
}
window.customElements.define("admin-app", AdminApp);
