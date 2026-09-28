import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-async-demo',
  standalone: true,
  templateUrl: './async-demo.component.html',
  styleUrl: './async-demo.component.css'
})
export class AsyncDemoComponent implements OnDestroy {
  promiseResult = 'The Promise has not started.';
  observableValues: number[] = [];
  observableStatus = 'The Observable has not been subscribed to.';
  private observableSubscription?: Subscription;

  private readonly numberStream = new Observable<number>((subscriber) => {
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
  }
}
