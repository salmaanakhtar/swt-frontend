import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.css']
})

export class TaskEditFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TaskEditFormComponent>,
    private fb: FormBuilder,
    private taskService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task } // Inject data passed from the parent component
  ) {
    // Initialize the form with data if available
    this.taskForm = this.fb.group({
      title: [data.task.title || '', Validators.required],
      description: [data.task.description || '', Validators.required],
      deadline: [data.task.deadline || null, Validators.required],
      status: [data.task.status || '', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.data.task.title || '', Validators.required],
      description: [this.data.task.description || '', Validators.required],
      deadline: [this.data.task.deadline || null, Validators.required],
      status: [this.data.task.status || '', Validators.required]
    });
  }



  onSave(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.data.task, // Preserve existing properties
        ...this.taskForm.value // Update with form values
      };

      this.taskService.updateTask(updatedTask.taskID, updatedTask).subscribe(
        () => {
          this.dialogRef.close(updatedTask);
        },
        error => {
          console.error('Error updating task:', error);
          // Handle error as needed
        }
      );
    }
  }
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }

}

