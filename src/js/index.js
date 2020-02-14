import User from './user'
import fnAsync from './some-async'
import '@styles/content'

const user = new User('Dmitrii', 23);

console.log(user.toString());

fnAsync();