import {Component} from '@angular/core';
import {State} from './enum/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // ng serve --host 192.168.0.17
  title = 'physio-app';
  started = false;
  timeLeft = 5;
  interval;
  numberOfExercisesCompleted = 0;
  displayText = '';
  complete = false;
  totalTimeElapsed = 0;
  totalTimeElapsedString = '';
  totalInterval;
  stretching = false;
  onGetReady = false;
  finishedByTime: string;
  private readonly STRETCH_TIME = 15;
  private readonly REST_TIME = 5;
  private readonly REPETITIONS = 15;
  private readonly GET_READY_TIME = 3;
  state: State;

  constructor() {
    this.state = State.NOT_STARTED;
  }

  startPhysio(): void {
    this.getReady();
    this.findFinishedByTime();
    this.finishedByTime = this.findFinishedByTime();
  }

  getReady(): void{
    this.state = State.GETTING_READY;
    this.onGetReady = true;
    this.displayText = 'Time until start';
    this.timeLeft = this.GET_READY_TIME;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1){
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.onGetReady = false;
        this.started = true;
        this.startTotalTimeElapsedTimer();
        this.oneExercise();
      }
    }, 1000);
  }

  oneExercise(): void {
    this.state = State.STRETCHING;
    this.stretching = true;
    this.displayText = 'Current stretch duration left';
    this.timeLeft = this.STRETCH_TIME;
    if (this.numberOfExercisesCompleted < this.REPETITIONS){
      this.interval = setInterval(() => {
        if (this.timeLeft > 1){
          this.timeLeft--;
        } else{
          clearInterval(this.interval);
          this.oneRest();
        }
      }, 1000);
    } else{
      this.state = State.COMPLETE;
      this.complete = true;
      clearInterval(this.totalInterval);
    }
  }

  pausePhysio(): void {
    this.state = State.PAUSED;
    clearInterval(this.interval);
  }

  isStartButtonDisabled(): boolean {
    return !(this.state === State.NOT_STARTED || this.state === State.PAUSED || this.state === State.COMPLETE);
  }

  private oneRest(): void {
    this.state = State.RESTING;
    this.stretching = false;
    this.displayText = 'Rest duration left';
    this.timeLeft = this.REST_TIME;
    this.interval = setInterval(() => {
      if (this.timeLeft > 1){
        this.timeLeft--;
      } else{
        this.numberOfExercisesCompleted++;
        clearInterval(this.interval);
        this.oneExercise();
      }
    }, 1000);
  }

  private startTotalTimeElapsedTimer(): void {
    this.totalTimeElapsedString = this.getDateString();

    this.totalInterval = setInterval(() => {
      this.totalTimeElapsed++;
      this.totalTimeElapsedString = this.getDateString();
    }, 1000);
  }

  private getDateString(): string {
    const date = new Date(0);
    date.setSeconds(this.totalTimeElapsed);
    return date.toISOString().substr(11, 8);
  }

  private findFinishedByTime(): string {
    const date = new Date();
    date.setSeconds(date.getSeconds() + ((this.STRETCH_TIME + this.REST_TIME) * this.REPETITIONS) + this.GET_READY_TIME);
    return date.toTimeString().substr(0, 8);
  }

  isPauseButtonDisabled(): boolean {
    return this.state === State.PAUSED || this.state === State.NOT_STARTED;
  }
}
