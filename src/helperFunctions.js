function sleep(ms) {
  console.log(`Hold on..`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncForEach(array, terminus, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
  console.log(terminus);
}

export { sleep, asyncForEach };
