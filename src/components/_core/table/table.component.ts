import './table.scss';
import { BaseHtmlComponent } from '../base-component';

export class TableColumn {
  label: string;
  fieldName: string;
}

export enum TableAction {
  DELETE_ROW,
}

export class TableHtmlComponentInput<T> {
  columns: TableColumn[];
  rows: T[];
  emptyTableMessage: string;
}

export class TableHtmlComponent<T> extends BaseHtmlComponent {
  private containerId: string;
  private container: HTMLElement;
  private input: TableHtmlComponentInput<T>;
  private callbacks: Map<TableAction, ((value: T) => void)[]> = new Map<TableAction, ((value: T) => void)[]>();

  constructor(emptyTableMessage: string, columns: TableColumn[] = [], rows: T[] = []) {
    super();
    this.input = {
      columns,
      rows,
      emptyTableMessage,
    };
  }

  preInsertHtml(): void {
    this.containerId = this.generateId();
  }

  toHtml(): string {
    return /* html */ `
      <div id="${this.containerId}" class="table">
      </div>
    `;
  }

  postInsertHtml(): void {
    this.container = document.getElementById(this.containerId);
    this.updateInnerHTML();
    this.container.addEventListener('click', this.handleContainerClickEvent.bind(this));
  }

  reset(columns: TableColumn[], rows: T[]) {
    this.input = {
      columns,
      rows,
      emptyTableMessage: this.input.emptyTableMessage,
    };
    this.updateInnerHTML();
  }

  addActionListener(action: TableAction, callback: (value: T) => void) {
    let callbacks = this.callbacks.get(action);
    if (!callbacks) callbacks = [];
    callbacks.push(callback);
    this.callbacks.set(action, callbacks);
  }

  private handleContainerClickEvent(event) {
    event.stopPropagation();
    const element = event.target.closest('span');
    if (element && element.dataset.action === 'DELETE') {
      const row = JSON.parse(element.dataset.rowjson);
      (this.callbacks.get(TableAction.DELETE_ROW) || []).forEach((callback) => callback(row));
    }
  }

  private updateInnerHTML() {
    if (this.input.rows?.length == 0) {
      const html = /* html */ `
        <div class="table-header">
          ${this.input.columns.map((c) => `<span class="table-data">${c.label}</span>`).join('')}
        </div>
        <p class="empty-table">${this.input.emptyTableMessage}</p>
      `;
      this.container.innerHTML = html;
      return;
    }
    const html = /* html */ `
      <div class="table-header">
        ${this.input.columns.map((c) => `<span class="table-data">${c.label}</span>`).join('')}
      </div>
      ${this.input.rows
        .map((r) => {
          let json = JSON.stringify(r);
          return `
            <div class="table-row" style="grid-template-columns: repeat(${this.input.columns.length}, 1fr)">
              ${this.input.columns
                .map((c) => {
                  return `<span class="table-data">${r[`${c.fieldName}`]}</span>`;
                })
                .join('')}

              <span class="table-row-actions">
                ${
                  (this.callbacks.get(TableAction.DELETE_ROW) || []).length > 0
                    ? `<span data-action="DELETE" data-rowjson='${json}'><span title="Delete" class="delete iconify" data-icon="eva:close-outline" data-inline="false"></span></span>`
                    : ''
                }
              </span>
            </div>
        `;
        })
        .join('')}
    `;
    this.container.innerHTML = html;
  }
}
