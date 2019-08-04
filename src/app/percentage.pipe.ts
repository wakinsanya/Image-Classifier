import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return (value as number).toFixed(2).concat('%');
  }

}
