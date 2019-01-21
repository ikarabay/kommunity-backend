
import BullQueue from 'bull';

// Queue structure for general purposes
class Queue {
  queue = null;
  processFn = null;

  constructor(
    queueName: string,
    processFn: (job: any, done: () => {}) => {},
  ) {
    this.queue = new BullQueue(queueName, process.env.REDIS_URL);
    this.queue.process(this.processQueueJob);
    this.processFn = processFn;
  }

  processQueueJob = (job: any, done: () => {}) => {
    if (this.processFn) {
      this.processFn(job.data, done);
    }
  }

  add = (data: any) => {
    if (this.queue) {
      this.queue.add(data);
    }
  }
}

export default Queue;
