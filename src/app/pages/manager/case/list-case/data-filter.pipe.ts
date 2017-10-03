import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilterCase',
})
export class DataFilterCasePipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.dESCRIPTIONS.indexOf(query) > -1);
        }
        return array;
    }
}
