import { UpFile } from '../files/up-file';
import { SEntity } from '../core/s-entity';

/**
 * Department can be Faculty of CS or English Department ...etc
 */
export class Department extends SEntity {
	
	/**
	 * parent used for major / minor
	 */
	parent: Department;
	name: string;
	description: string;
	LogoImg: UpFile;

	constructor() {
		super();
	}
}