// import { Injectable } from '@nestjs/common';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';
// import { Task } from 'src/tasks/task.entity';

// @Injectable()
// export class ElasticsearchConfigService {
//   constructor(private readonly elasticsearchService: ElasticsearchService) {}
//   private index = 'tasks_index';
//   async indexTask(task: Task) {
//     return this.elasticsearchService.index({
//       index: this.index,
//       body: {
//         id: task.id,
//         title: task.title,
//         description: task.description,
//         status: task.status,
//         user: task.user
//       }
//     })
//   }
 
//   async search(text: string) {
//     const body = await this.elasticsearchService.search<Task>({
//       index: this.index,
//       body: {
//         query: {
//           multi_match: {
//             query: text,
//             fields: ['title', 'description', 'status']
//           }
//         }
//       }
//     })
//     console.log('INDEXED: ', JSON.stringify(body))
//     const hits = body.hits.hits;
//     return hits.map((item) => item._source);
//   }
// }
