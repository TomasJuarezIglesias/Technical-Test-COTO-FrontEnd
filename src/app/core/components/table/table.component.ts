import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../interfaces/table-column.interface';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule
  ],
  styleUrl: './table.component.scss',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {

  public columns = input<TableColumn[]>([]);
  public data = input<any>();

  get displayedColumns() {
    return this.columns().map(c => c.key);
  }
}
