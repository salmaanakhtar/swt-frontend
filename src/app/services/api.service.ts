import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private taskListSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`https://swt-backend-5ab3517bf547.herokuapp.com/login`, { email, password });
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`https://swt-backend-5ab3517bf547.herokuapp.com/signup`, user);
  }

  getTasksByUserID(userID: number): Observable<Task[]> {
    const url = `https://swt-backend-5ab3517bf547.herokuapp.com/tasks/${userID}`;
    return this.http.get<Task[]>(url);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`https://swt-backend-5ab3517bf547.herokuapp.com/tasks`, task);
  }

  updateTask(taskID: number, updatedTask: Task): Observable<any> {
    const url = `https://swt-backend-5ab3517bf547.herokuapp.com/tasks/${taskID}`;
    return this.http.put(url, updatedTask);
  }

  deleteTask(taskID: number): Observable<any> {
    const url = `https://swt-backend-5ab3517bf547.herokuapp.com/tasks/${taskID}`;
    return this.http.delete(url);
  }
}
