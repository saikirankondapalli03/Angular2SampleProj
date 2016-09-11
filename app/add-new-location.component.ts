import { Component } from '@angular/core';

@Component({
	selector: 'add-new-location',
	template:`
		<div class="container-fluid">
			<div class="row ">
				<div class="col-sm-12 col-md-12 col-lg-12 P0">
					<div [hidden] = "showInput" class="fnt-plus" style="margin-top:20px;">
						<span (click) = "onAdd()" class="glyphicon glyphicon-plus" ></span>
					</div>
					<table [hidden] = "!showInput" class="table table-bordered">
						<thead>
							<tr>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input #component/></td>
								<td><input #length/></td>
								<td><input #datatype/></td>
								<td><input #delimiter/></td>
								<td class="align-cen"><button class="btn btn-primary" (click) = "onDone()"> Done</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	`
})

export class AddNewLocation{
	showInput = false;

	onAdd(){
		this.showInput = true;
	}

	onDone(){
		this.showInput = false;
	}
}