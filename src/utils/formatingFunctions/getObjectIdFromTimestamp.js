import { ObjectId } from 'bson';

export default function objectIdWithTimestamp(timestamp) {
  if (typeof timestamp !== 'number') {
    throw new Error('Timestamp must be a number');
  }
  const hexSeconds = Math.floor(timestamp / 1000).toString(16);
  const constructedObjectId = new ObjectId(`${hexSeconds}0000000000000000`);

  return constructedObjectId;
}
