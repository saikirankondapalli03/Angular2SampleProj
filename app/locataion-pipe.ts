/*import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({name:'location'})
@Injectable()
export class LocationPipe implements PipeTransform{
	

	transform(value: any, [component]): any {
        return value.filter((item) => item.component === component);
    }
	transform(value:string , args: any[]): any {
        return value.filter(item => for(let key in item){
        	if(typeof item[key] === 'string')
        })
        //return value.filter(item => item.id.indexOf(args[0]) !== -1);
    }

    transform(locationList: any[], args: any[]): any {
        return customers.filter(locationList => locationList.component.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
      }
}*/