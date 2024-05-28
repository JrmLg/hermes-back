import { ObjectId } from 'bson';

export default function getDateFromMongoObject(mongoObject) {
  return new ObjectId(mongoObject.id).getTimestamp();
}
