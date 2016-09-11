import { Injectable } from '@angular/core'
import { Http,  Response ,Headers } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable} from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
//import 'rxjs/add/operator/catch';
import { ILocationComponent } from './interfaces.location.component';

@Injectable()
export class LocationGridService{
	
	private location_component_url: string = 'http://vcia4122:8080/location_services/1.1/location/component';
	public headers;
	constructor(private _http: Http){
								 
/*		this.locationList = [

			{
				"component": "bay12",
				"length": "4",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "AREA83",
				"length": "3",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "X59CORDDLCOM22ES1211",
				"length": "9",
				"data_type": "Alphanumeric",
				"delimiter": "-",
				"edit":false
			},
			{
				"component": "ZONE8",
				"length": "11",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "BAY8",
				"length": "6",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "LEVEL8",
				"length": "7",
				"data_type": "Numeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "BAY12",
				"length": "5",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "AISLE8",
				"length": "1",
				"data_type": "Alphanumeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "POSITION1",
				"length": "8",
				"data_type": "Numeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "AREA1",
				"length": "2",
				"data_type": "Numeric",
				"delimiter": "^",
				"edit":false
			},
			{
				"component": "ZONE1",
				"length": "10",
				"data_type": "Numeric",
				"delimiter": "^",
				"edit":false
			}
			
		];*/
	}
	getComponent() {

		return this._http.get(this.location_component_url)
						 .map(res =>res.json());
	}
	createComponent(data){
		delete data.edit;
    	delete data.maskDefault;
    	delete data.filter;
    	delete data.userName;
    	delete data.id;
        this.headers = new Headers();
       	this.headers.append('Content-Type', 'application/json');
       	console.log("here update",JSON.stringify(data));

        //var data="{\"id\":190345,\"type\":\"PPBH026\",\"maskLen\":4,\"delimiter\":\"^\",\"datatype\":\"ALPHANUMERIC\"}" ;

        return this._http.post(this.location_component_url, JSON.stringify(data), {headers:this.headers})
        			.map(res => res.json());
    }
	updateComponent(data)
    {
    	delete data.edit;
    	delete data.maskDefault;
    	delete data.filter;
    	delete data.userName;
       	this.headers = new Headers();
       	this.headers.append('Content-Type', 'application/json');
       	console.log("here update",JSON.stringify(data));
        //var data="{\"id\":190345,\"type\":\"PPBH026\",\"maskLen\":4,\"delimiter\":\"&\",\"datatype\":\"ALPHANUMERIC\"}" ;

       	return this._http.put(this.location_component_url, JSON.stringify(data), {headers:this.headers})
       					.map((res) => res.json());
    }
    deleteComponent(data)
    {
    	
       	return this._http.delete(this.location_component_url+"/"+data)
        						.map((res) => res.json());
    }

	sortComponent(locationList, ascending, key){
		let result = [];
		if(typeof locationList === 'undefined'){
			return;
		}

		result = locationList.sort(function (obj1, obj2) {
    		return obj1[key].localeCompare(obj2[key]);
		});

		if(!ascending){
			result = locationList.reverse();
		}
		return result;
	}

	searchComponent(search, locationList){
		let result = [];
		
		if(typeof locationList === 'undefined'){
			return;
		}			
		
		for(let i in locationList){
			if(locationList[i].type.toLowerCase().indexOf(search.toLowerCase()) !== -1){
				result.push(locationList[i]);
			}
		}
		
		return result;
	}
}