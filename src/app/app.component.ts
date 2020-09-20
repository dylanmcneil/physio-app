import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'physio-app';
  started = false;
  timeLeft = 5;
  interval;
  numberOfExercisesCompleted = 0;
  displayText = '';
  complete = false;
  totalTimeElapsed = 0;
  totalInterval;

  startPhysio(): void {
    this.started = true;
    this.startTotalTimeElapsedTimer();
    this.oneExercise();
  }

  oneExercise(): void {
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
    this.totalInterval = setInterval(() => {
      this.totalTimeElapsed++;
    }, 1000);
  }
}
