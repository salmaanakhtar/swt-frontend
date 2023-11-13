import { Component} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskEditFormComponent } from '../task-edit-form/task-edit-form.component';
import {MatSnackBar} from "@angular/material/snack-bar";

interface Task {
  taskID: number;
  userID: number;
  title: string;
  description: string;
  deadline: Date | null;
  status: string;
}

interface Subtask {
  subtaskID: number;
  taskID: number;
  title: string;
  description: string;
  deadline: Date | null;
  status: string;
  // Add other fields as needed
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  displayedColumns: string[] = ['title', 'description', 'deadline', 'status', 'actions'];
  tasks: Task[] = [];
  private userID: string | null = localStorage.getItem('userID');
  private newTask: "" | undefined;

  constructor(private taskService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    const userID = localStorage.getItem('userID');

    if (userID) {
      this.taskService.getTasksByUserID(parseInt(userID))
        .subscribe(tasks => {
          this.tasks = tasks.map(task => ({ ...task}));
        });
    }
  }

  openTaskForm(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if (newTask) {
        if (typeof this.userID === "string") {
          this.taskService.getTasksByUserID(parseInt(this.userID))
            .subscribe(tasks => {
              this.tasks = tasks.map(task => ({ ...task, expanded: false, subtasks: [] }));
            });
        }
        console.log('New Task:', newTask);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Not Started':
        return 'red'; // Set the color for 'Not Started' status
      case 'In Progress':
        return 'yellow'; // Set the color for 'In Progress' status
      case 'Done':
        return 'lightgreen'; // Set the color for 'Done' status
      default:
        return 'gray'; // Set a default color for unknown statuses
    }
  }

  openTaskEditForm(taskData: Task): void {
    const dialogRef = this.dialog.open(TaskEditFormComponent, {
      width: '400px', // Set the width of the dialog
      data: { task: taskData }
    });

    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask) {
        if (typeof this.userID === "string") {
          this.taskService.getTasksByUserID(parseInt(this.userID))
            .subscribe(tasks => {
              this.tasks = tasks.map(task => ({ ...task, expanded: false, subtasks: [] }));
            });
        }
        console.log('New Task:', this.newTask);
      }
    });
  }

  deleteTask(task: Task): void {
    // Confirm deletion with the user
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      // Delete the task on the server using the taskService
      this.taskService.deleteTask(task.taskID)
        .subscribe(response => {
          // Handle the response as needed
          this.snackBar.open('Task deleted successfully!', 'Close', {
            duration: 2000
          });
          // Remove the task from the local tasks array
          this.tasks = this.tasks.filter(t => t.taskID !== task.taskID);
        }, error => {
          // Handle error as needed
          console.error('Error deleting task:', error);
          this.snackBar.open('Error deleting task. Please try again.', 'Close', {
            duration: 2000
          });
        });
    }
  }
}
