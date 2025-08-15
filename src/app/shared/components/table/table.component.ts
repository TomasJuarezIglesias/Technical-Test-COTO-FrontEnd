import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableColumn } from '../../interface/table-column.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule
  ],
  styleUrl: './table.component.css',
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
