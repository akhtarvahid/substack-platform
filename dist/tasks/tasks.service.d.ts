import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksRepository } from './tasks.repository';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: string, user: User): Promise<Task>;
    deleteTask(id: string, user: User): Promise<void>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task>;
}
