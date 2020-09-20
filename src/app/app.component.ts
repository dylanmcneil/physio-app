import { Component } from '@angular/core';

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

  startPhysio(): void {
    this.getReady();
  }

  getReady(): void{
    console.log('hi');
    this.onGetReady = true;
    this.displayText = 'Time until start';
    this.timeLeft = 3;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0){
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
    this.stretching = true;
    this.displayText = 'Current stretch duration left';
    this.timeLeft = 1;
    if (this.numberOfExercisesCompleted < 15){
      this.interval = setInterval(() => {
        if (this.timeLeft > 0){
          this.timeLeft--;
        } else{
          clearInterval(this.interval);
          this.oneRest();
        }
      }, 1000);
    } else{
      this.complete = true;
      clearInterval(this.totalInterval);
    }
  }

  pausePhysio(): void {
    clearInterval(this.interval);
  }

  private oneRest(): void {
    this.stretching = false;
    this.displayText = 'Rest duration left';
    this.timeLeft = 1;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0){
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
}
