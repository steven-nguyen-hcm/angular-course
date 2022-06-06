import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const [sortField, type = 'asc'] = args;
    return value.sort((a, b) => {
      const compareValue = a[sortField] > b[sortField] ? 1 : -1;
      if (type === 'asc') {
        return compareValue;
      }
      return -compareValue;
    })
  }
}