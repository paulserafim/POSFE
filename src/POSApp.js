import { LitElement, html, css } from "lit-element";

import { getData, postData, putData, deleteData } from "./ServerOperations";
import { read, write, removeItem, removeAll } from "./Storage";
import "./VanzareApp";
import "./AdminApp";
import "./BonuriFiscaleApp";

export class POSApp extends LitElement {
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

      .column {
        float: left;
      }

      .left {
        width: 35%;
      }
      .right {
        width: 15%;
      }

      .middle {
        width: 50%;
      }
    `;
  }

  static get properties() {
    return { page: { String } };
  }

  constructor() {
    super();
    this.page = window.location.hash.substring(1);
    window.onhashchange = this._onHashChange.bind(this);
  }

  render() {
    return html` <div class="topnav" id="navbar">
        <a href="#vanzare">Vanzare</a>
        <a href="#bonuriFiscale">Bonuri Fiscale</a>
        <a href="#administrare">Administrare</a>
      </div>
      ${this._pageTemplate}`;
  }

  get _pageTemplate() {
    if (!this.page) {
      return html` <vanzare-app></vanzare-app>`;
    }
    if (this.page === "vanzare") {
      return html` <vanzare-app></vanzare-app>`;
    }
    if (this.page === "bonuriFiscale") {
      return html` <bonuri-fiscale-app></bonuri-fiscale-app>`;
    }
    if (this.page === "administrare") {
      return html` <admin-app></admin-app>`;
    }
  }

  _onChangeMenu(event) {
    window.location.hash = event.target.value;
  }

  _onHashChange(event) {
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }
}
