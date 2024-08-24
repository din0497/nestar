import { ObjectId } from 'bson';

export const shapeIntoMongoObjId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
