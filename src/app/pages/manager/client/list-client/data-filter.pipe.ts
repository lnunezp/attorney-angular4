import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilterClient',
})
export class DataFilterClientPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.rUT.indexOf(query) > -1);
        }
        return array;
    }
}
