import { Component, OnChanges } from '@angular/core'
import { LocationGridService } from './location-grid.service'
import { Http, HTTP_PROVIDERS, JSONP_PROVIDERS, Response, Headers} from '@angular/http'
import { OnInit } from '@angular/core';
import { ILocationComponent } from './interfaces.location.component';


@Component({
	selector: 'location-grid',
	templateUrl:'app/location-grid.html',
	providers:[LocationGridService, HTTP_PROVIDERS]
})

export class LocationGrid implements OnInit{

	showInput = false;
	ascending = true;
	filtertext = null;
	location: any = [];
	toTrackLocation: any = [];
	locationList: any = [];
	pageSize = 10;
	currentPage = 0;
	start;
	end;
	message={
		"id":null
	};

	newLocation = {
		"type": null,
		"maskLen": null,
		"datatype": null,
		"delimiter": null,
		"maskDefault":null,
		"filter":null,
		"id":null,
		"edit":false,
		"userName":null
	}

	constructor(private locationGridService:LocationGridService) { };

    ngOnInit(){
    	this.loadComponent();
    }

    private loadComponent(){
        this.locationGridService
        	.getComponent()
    		.subscribe(res=>
    					{  
    						this.toTrackLocation = res.data.sort(function (obj1, obj2) {
    											
    											return obj1["type"].localeCompare(obj2["type"]);
											});
    						
    						for(let i in this.toTrackLocation){
    							this.toTrackLocation[i]["edit"]=false;
    						}
    						
    						this.location = this.toTrackLocation;
    						this.locationList = this.location.slice(this.currentPage*this.pageSize, (this.currentPage*this.pageSize)+this.pageSize);
    					}); 
    }

	onAdd(){

		let allowEdit = false;
		for(let key in this.locationList){
			if(!this.locationList[key].edit){
				allowEdit = true;
			}
			else{
				
				allowEdit = false;
				break;	
			}
		}
		if(allowEdit){
			this.showInput = true;
		}else{
			return;
		}
		this.newLocation.type = null;
		this.newLocation.maskLen = null;
		this.newLocation.datatype = null;
		this.newLocation.delimiter = null;
		
	}

	onDone(){
		
		this.locationGridService.createComponent(this.newLocation)
								.subscribe(res=>
									{
										this.newLocation = res.data
										this.newLocation["edit"] = false;
										this.locationList.push(this.newLocation);
										this.toTrackLocation.push(this.newLocation);
										this.message = res.message;
										this.showInput = false;
									});
		
	}
	onDoneCancel(){
		this.showInput = false;
		this.newLocation.type = null;
		this.newLocation.maskLen = null;
		this.newLocation.datatype = null;
		this.newLocation.delimiter = null;
	}

	onEdit(index){
		this.showInput = false;
		let allowEdit = false;
		for(let key in this.locationList){
			if(!this.locationList[key].edit){
				allowEdit = true;
			}
			else{
				
				allowEdit = false;
				break;	
			}
		}
		if(allowEdit){
			this.locationList[index].edit = true;
		}else{
			return;
		}
		//this.newLocation = this.locationList[index]; will case error
		this.newLocation.type = this.locationList[index].type;
		this.newLocation.datatype = this.locationList[index].datatype;
		this.newLocation.delimiter = this.locationList[index].delimiter;
		this.newLocation.maskLen = this.locationList[index].maskLen;
		this.newLocation.id = this.locationList[index].id;
		
			
	}

	onEditDone(index){
		this.showInput = false;
		
		console.log("locationList",this.locationList[index]);

		this.locationGridService.updateComponent(this.newLocation)
								.subscribe(res=>{
										this.message = res.message;
										console.log("res log", res);
										if(res.message.id == 200 && res.data){
											
											this.locationList[index] = res.data;
											this.toTrackLocation[index]= res.data;
											this.locationList[index]["edit"] = false;
											this.toTrackLocation[index]["edit"] = false;

										}
										
										
									});


	}

	onEditCancel(index){
		
		this.locationList[index].edit = false;
		this.newLocation.type = null;
		this.newLocation.datatype = null;
		this.newLocation.delimiter = null;
		this.newLocation.maskLen = null;

	}

	onDelete(index){
		this.locationGridService.deleteComponent(this.locationList[index].id)
								.subscribe(res=>
									{
										this.message = res.message;
										
										if(res.message.id == 200){
											this.locationList.splice(index, 1);
											this.toTrackLocation.splice(index, 1);
										}	
									});
		
	}

	searchLocation(search){
		this.pageSize = 10;
		this.currentPage = 0;
		if(!search){

    		this.location = this.toTrackLocation;

    	}else{

    		this.location = this.locationGridService.searchComponent(search, this.toTrackLocation);
    	}
    	
    	this.locationList = this.location.slice(this.currentPage*this.pageSize, (this.currentPage*this.pageSize)+this.pageSize);
    }

    sortLocation(key){
    	this.pageSize = 10;
		this.currentPage = 0;
    	this.ascending = !this.ascending;
  		this.location = this.locationGridService.sortComponent(this.location, this.ascending, key);
    	this.locationList = this.location.slice(this.currentPage*this.pageSize, (this.currentPage*this.pageSize)+this.pageSize);
   	
    }

	onPrev(){
		this.currentPage--;
		this.start = (this.currentPage*this.pageSize);
		this.end = this.start+this.pageSize;
		this.locationList = this.location.slice(this.start, this.end);	
	}

	onNext(){
		
		this.currentPage++;
		this.start = (this.currentPage*this.pageSize);
		this.end = this.start+this.pageSize;
		this.locationList = this.location.slice(this.start, this.end);
	}
}