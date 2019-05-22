import { Component, OnInit } from '@angular/core';
import{ShiftService} from '../shifts/shift.service';
import {TaskService} from '../tasks/task.service';
import {Orga} from 'src/models/orga';
import {Task} from 'src/models/task';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {

  orgas: Orga[];
  tasks: Task[];

  constructor(private shiftService: ShiftService, private taskService:TaskService) { }

  launch() {
    let inputJSON = {
    "listeCompetences": [
      "responsable",
      "mission1"
    ],
    "listeEmployes": [
      {
        "ID": "1",
        "competences": [
          "responsable",
          "mission1"
        ],
        "creneaux": [
          "0"
        ]
      },
      {
        "ID": "2",
        "competences": [
          "mission1"
        ],
        "creneaux": [
          "0"
        ]
      }
    ],
    "listeDeTaches": [
      {
        "ID": "111",
        "duree": "60",
        "competencesRequises": [
          "responsable"
        ],
        "priority": "MINOR"
      },
      {
        "ID": "222",
        "duree": "400",
        "competencesRequises": [
          "mission1"
        ],
        "priority": "MAJOR"
      },
      {
        "ID": "333",
        "duree": "500",
        "competencesRequises": [
          "mission1"
        ],
        "priority": "MINOR"
      },
      {
        "ID": "444",
        "duree": "60",
        "competencesRequises": [
          "mission1"
        ],
        "priority": "CRITICAL"
      },
      {
        "ID": "555",
        "duree": "60",
        "competencesRequises": [
          "mission1"
        ],
        "priority": "MAJOR"
      }
    ]
  };
  }

  /*getAllOrgas () {
    this.shiftService.getAllOrgas()
    .subscribe(res => {
      this.orgas = res.orgas;
    });
  }

  getAllTasks(){
    this.TaskService.getAllTasks()
    .subscribe(res => {
      this.tasks = res.tasks;
    });
  }*/

  ngOnInit() {
    //this.getAllOrgas();
  }

}
