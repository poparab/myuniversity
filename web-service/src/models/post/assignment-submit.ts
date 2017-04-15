import { UpFile } from '../files/up-file';
import { SEntity } from '../core/s-entity';
import { User } from '../user/user';
import { Assignment } from './assignment';

/**
 * a solution for an assignment submitted by a student
 */
export class AssignmentSubmit extends SEntity {

	studentID: number;
	assignmetID: number;
	grade: number;
	studentNotes: string;
	files: UpFile[];

	public fetchStudent(): User {
		return null;
	}

	public fetchAssignmet(): Assignment {
		return null;
	}

	constructor() {
		super();
		this.studentID = 0;
		this.assignmetID = 0;
		this.grade = 0;
	}
}