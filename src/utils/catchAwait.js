export function catchAwait(promise) {
    return promise
      .then(data => {
        console.log(data);
        return [null, data];
      })
      .catch(err => [err]);
  }
