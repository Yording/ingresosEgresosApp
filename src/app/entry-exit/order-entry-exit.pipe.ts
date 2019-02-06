import { Pipe, PipeTransform } from '@angular/core';
import { EntryExit } from './entry-exit.model';

@Pipe({
  name: 'orderEntryExit'
})
export class OrderEntryExitPipe implements PipeTransform {

  transform(items: EntryExit[]): EntryExit[] {
    return items.sort((a,b) => {
      if(a.type == 'Ingreso'){
        return -1
      }
      else{
        return 1
      }
    })
  }

}
