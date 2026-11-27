var findKthPositive = function (arr, k) {
    for (const num of arr) {
        if (num <= k) k++;  
        else break;
      }
      return k;
};

console.log(findKthPositive([2,3,4,7,11], 5));

    /* let nums = [];
  let i = 1;
  while (nums.length < k) {
    if (!arr.includes(i)) {
      nums.push(i);
    }
    i += 1;
  }
  console.log(nums);
  return nums.at(-1); */