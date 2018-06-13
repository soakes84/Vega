import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'vehicle-list.html'
})

export class VehicleListComponent implements OnInit {
    queryResult: any = {};
    makes: KeyValuePair[];
    query: any = {
        pageSize = 3
    };
    columns = [
        {title: 'Id', key:}
        {title: 'Contact Name', key: 'contactName', isSortable: true}        
        {title: 'Make', key: 'make', isSortable: false}        
        {title: 'Model', key: 'model', isSortable: false}        
    ]

    constructor(private vehicleService: VehicleService) { }

    ngOnInit() {
        this.vehicleService.getMakes()
            .subscribe(makes => this.makes = makes);
            
        this.populateVehicles();
    }

    private populateVehicles() {
        this.vehicleService.getVehicles(this.filter)
        .subscribe(result => this.queryResult = result);
    }

    onFilterChange() {
      this.populateVehicles();
    }

    resetFilter() {
        this.filter = {};
        this.onFilterChange();
    }

    sortBy(columnName) {
        if (this.query.sortBy === columnName) 
        {
            this.query.isSortAscending = !this.query.isSortAscending;
        } 
        else 
        {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }

    onPageChange(page) {
        this.query.page = page;
        this.populateVehicles();
    }
}