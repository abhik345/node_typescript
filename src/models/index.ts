import User from "./user.model";
import Post from "./post.model";


const initModels = async () => {
  await User.sync({ alter: true }); 
  await Post.sync({ alter: true }); 
};

export { User, Post, initModels };
