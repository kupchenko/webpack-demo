import User from './user'
import fnAsync from './some-async'
import '@styles/content'

let unusedVar;
const user = new User('Dmitrii', 23);

console.log(user.toString());

fnAsync();