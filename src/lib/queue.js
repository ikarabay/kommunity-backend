
import BullQueue from 'bull';

// Queue structure for general purposes
class Queue {
  constructor(
    queueName: string,
    processFn: (job: string, done: () => {}) => {},
  ) {
    this.queue = new BullQueue(queueName, process.env.REDIS_URL);
    this.queue.process(this.processQueueJob);
    this.processFn = processFn;
  }

  processQueueJob = (job: any, done: () => {}) => {
    this.processFn(job.data, done);
  }

  add = (data: any) => {
    return this.queue.add(data);
  }
}

export default Queue;
