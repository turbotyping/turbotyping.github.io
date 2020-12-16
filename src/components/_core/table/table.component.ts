import './table.scss';
import { BaseHtmlComponent } from '../base-component';

export class TableColumn {
  label: string;
  fieldName: string;
}

export class TableHtmlComponentInput<T> {
  columns: TableColumn[];
  rows: T[];
}

export class TableHtmlComponent<T> extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private input: TableHtmlComponentInput<T>;

  constructor(columns: TableColumn[] = [], rows: T[] = []) {
    super();
    this.input = {
      columns,
      rows,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
  }

  toHtml(): string {
    return /* html */ `
      <table id="${this.containerId}" style="width:100%">
      </table>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.updateInnerHTML();
  }

  reset(columns: TableColumn[], rows: T[]) {
    this.input = {
      columns,
      rows,
    };
    this.updateInnerHTML();
  }

  private updateInnerHTML() {
    if (this.input.rows?.length > 0) {
      this.container.innerHTML = /* html */ `
        <tr>
          ${this.input.columns.map((c) => `<th>${c.label}</th>`).join('')}
        </tr>
        ${this.input.rows
          .map((r) => {
            return `
              <tr>
                ${this.input.columns
                  .map((c) => {
                    return `<td>${r[`${c.fieldName}`]}</td>`;
                  })
                  .join('')}
              </tr>
          `;
          })
          .join('')}
      `;
    }
  }
}
