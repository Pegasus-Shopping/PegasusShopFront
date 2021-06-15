module.exports = {
  left: (thumb, maxLen) => {
    // input: thumb (index number), maxLen (array length - 1)
    // output: next index number
    // purpose: provide max index if index is 0
    if (thumb === 0) {
      return maxLen;
    }
    return thumb - 1;
  },
  right: (thumb, maxLen) => {
    // input: nothing
    // output: next index number
    // purpose: provide 0 index if index is max
    if (thumb === maxLen) {
      return 0;
    }
    return thumb + 1;
  },
};
