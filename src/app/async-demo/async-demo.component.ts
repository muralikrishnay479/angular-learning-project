import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, map, filter, of } from 'rxjs';

@Component({
  selector: 'app-async-demo',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './async-demo.component.html',
  styleUrl: './async-demo.component.css'
})
export class AsyncDemoComponent implements OnDestroy {
  promiseResult = 'The Promise has not started.';
  observableValues: number[] = [];
  observableStatus = 'The Observable has not been subscribed to.';
  private observableSubscription?: Subscription;
  private manualLearningSubscription?: Subscription;
  manualLearningValue = 'Manual subscription has not received a value yet.';

  readonly learningData$ = of('Angular can display Observable data with the async pipe.');

  private readonly rawNumberStream = new Observable<number>((subscriber) => {
    let value = 1;
    const timer = setInterval(() => {
      subscriber.next(value++);

      if (value > 5) {
        subscriber.complete();
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  });

  private readonly numberStream = this.rawNumberStream.pipe(
    map((value) => value * 10),
  filter((value) => value >= 30)
  );

  constructor() {
    this.manualLearningSubscription = this.learningData$.subscribe((value) => {
      this.manualLearningValue = value;
    });
  }

  runPromise(): void {
    this.promiseResult = 'Promise is pending...';

    new Promise<string>((resolve) => {
      setTimeout(() => resolve('Promise completed with one result.'), 1000);
    }).then((result) => {
      this.promiseResult = result;
    });
  }

  startObservable(): void {
    this.stopObservable();
    this.observableValues = [];
    this.observableStatus = 'Observable subscribed; waiting for values...';

    this.observableSubscription = this.numberStream.subscribe({
      next: (value) => this.observableValues = [...this.observableValues, value],
      complete: () => this.observableStatus = 'Observable completed.'
    });
  }

  stopObservable(): void {
    this.observableSubscription?.unsubscribe();
    this.observableSubscription = undefined;

    if (this.observableStatus.includes('waiting')) {
      this.observableStatus = 'Observable unsubscribed.';
    }
  }

  ngOnDestroy(): void {
    this.stopObservable();
    this.manualLearningSubscription?.unsubscribe();
  }
}
