import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ApiService} from "../../services/api.service";

interface Task {
  taskID: number;
  userID: number;
  title: string;
  description: string;
  deadline: Date | null;
  status: string;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {taskID: 0, userID: 0, title: '', description: '', deadline: null, status: 'Not Started'};

  constructor(private dialogRef: MatDialogRef<TaskFormComponent>, private taskService: ApiService) {
  }

  ngOnInit(): void {

    const userID = parseInt(localStorage.getItem('userID') || '0', 10);
    this.task.userID = userID;

  }

  onSubmit(): void {
    const userID = parseInt(localStorage.getItem('userID') || '0', 10);
    this.taskService.createTask(this.task).subscribe(
      newTask => {
        console.log('New Task created:', newTask);
        // Optionally, update your local tasks array or perform other actions
        this.dialogRef.close(newTask);
      }
    );
  }
}
