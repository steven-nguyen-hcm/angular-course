import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: any) {
    let result = '';
    for(const letter of value) {
      result = letter + result;
    }
    return result;
  }
}