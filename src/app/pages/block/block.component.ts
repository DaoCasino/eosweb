import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'block-page',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockPageComponent implements OnInit, OnDestroy{
  blockId;
  block;
  mainData;
  moment = moment;
  time;

  constructor(private route: ActivatedRoute, protected http: HttpClient){}

  getBlockData(blockId){
  		this.http.get(`/api/v1/get_block/${blockId}`)
  				 .subscribe(
                      (res: any) => {
                          this.mainData = res;
                          this.time = this.moment(this.mainData.timestamp).format('MMMM Do YYYY, h:mm:ss a');
                      },
                      (error) => {
                          console.error(error);
                      });
  };

  ngOnInit() {
    this.block = this.route.params.subscribe(params => {
       this.blockId = params['id'];
       this.getBlockData(this.blockId);
    });
  }

  ngOnDestroy() {
    this.block.unsubscribe(); 
  }	
}