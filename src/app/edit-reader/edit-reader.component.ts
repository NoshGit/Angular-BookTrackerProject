import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from "app/models/reader";
import { BadgeService } from 'app/services/badge.service';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers:[BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  readerBadge: string;
  constructor(private route: ActivatedRoute, private dataService: DataService, private badge: BadgeService) { }

  ngOnInit() {
    let readerID: number = parseInt(this.route.snapshot.params['id']);
    this.selectedReader = this.dataService.getReaderById(readerID);
    this.readerBadge = this.badge.setReadersBadge(this.selectedReader.totalMinutesRead);
  }

  saveChanges() {
    console.warn('Save reader not yet implemented.');
  }
}
