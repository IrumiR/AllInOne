import Sequence from '../models/Sequence.js';

export const getNextSequenceValue = async (seqName) => {
  const sequence = await Sequence.findOneAndUpdate(
    { seqName },
    { $inc: { seqValue: 1 } },
    { new: true, upsert: true }
  );
  return sequence.seqValue;
};
