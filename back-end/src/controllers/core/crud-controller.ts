import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../../config';

import { SEntity } from './../../models/core/s-entity';
import { User } from '../../models/user/user';
import { UserRole } from '../../models/user/user-role';
import { hasPermission } from '../../models/user/permission';
import { HTTPClientErr } from './http-stats';

export class CRUDController {

	static MODEL = SEntity;

	private static CRUDrespon(res, accepted = [], rejected = [], notValid = [], type?) {
		type = type ? type : 'json';

		if (rejected.length != 0) {
			res.json({
				error: {
					code: HTTPClientErr.Forbidden,
					message: "don't have enough permissions"
				}
			});
		} else if (notValid.length != 0) {
			res.json({
				error: {
					code: HTTPClientErr.UnprocessableEntity,
					message: "didn't pass the validation"
				}
			});
		} else {

			switch (type) {
				case 'xls':
				case 'xlsx':
					res.xls('data.xlsx', accepted);
					break;
				case 'json':
				default:
					res.json({ data: accepted });
					break;
			}

		}
	}

	public static async Create(req: Request, res: Response, next: NextFunction) {
		var accepted = [], rejected = [], notValid = [], data = await this.MODEL.ParceData(req.body);

		for (let i in data) {
			if (!data[i].hasPermission(req.user, req.userRole).create) { data.push(data[i]); }
			else if (!await data[i].isValid()) { notValid.push(data[i]); }
			else { accepted.push(data[i]); }
		}

		if (notValid.length == 0 && rejected.length == 0) {
			this.MODEL.Create(data);
		}

		this.CRUDrespon(res, accepted, rejected, notValid);
		return next();
	}

	public static async Read(req: Request, res: Response, next: NextFunction) {
		let limit = req.query.limit,
			offset = req.query.offset,
			feilds = (req.params.key && req.params.value) ? { [req.params.key]: req.params.value } : null;

		var accepted = [], rejected = [], data = await this.MODEL.Read(feilds, null, limit, offset);

		for (var i in data) {
			data[i].hasPermission(req.user, req.userRole).update ? accepted.push(data[i]) : rejected.push(data[i]);
		}

		this.CRUDrespon(res, accepted, rejected, [], req.params.type);
		return next();
	}

	public static async Update(req: Request, res: Response, next: NextFunction) {
		var accepted = [], rejected = [], notValid = [], data = await this.MODEL.ParceData(req.body);

		for (let i in data) {
			if (!data[i].hasPermission(req.user, req.userRole).create) { data.push(data[i]); }
			else if (!await data[i].isValid()) { notValid.push(data[i]); }
			else { accepted.push(data[i]); }
		}

		if (notValid.length == 0 && rejected.length == 0) {
			this.MODEL.Update(accepted);
		}

		this.CRUDrespon(res, accepted, rejected, notValid);
		return next();
	}

	public static async Delete(req: Request, res: Response, next: NextFunction) {
		var accepted = [], rejected = [], data = this.MODEL.Read({ id: req.params.ids.split(",") });

		for (let i in data) {
			data[i].hasPermission(req.user, req.userRole).delete ? accepted.push(data[i]) : rejected.push(data[i]);
		}

		if (rejected.length == 0) {
			this.MODEL.Delete(accepted);
		}

		this.CRUDrespon(res, accepted, rejected);
		return next();
	}

}